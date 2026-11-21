import {
	Notice,
	normalizePath,
	Plugin,
	requestUrl,
	TFile,
	WorkspaceLeaf,
} from "obsidian";
import {
	CampaignImportSettings,
	DdbApiResponse, DdbCharacter,
	DEFAULT_SETTINGS,
	DnDBeyondImporterSettings,
	PartyInventory
} from "./src/types";
import DnDBeyondSettingTab from "./src/settings-tab";
import ImportModal from "./src/import-modal";
import MarkdownBuilder from "./src/markdown.builder";
import 'src/array-extensions';
import TemplateManager from "./src/TemplateManager";
import Utilities from "./src/utilities";

declare global {
	interface Array<T> {
		sum(predicate?: (value: T) => number | undefined): number;
		deduplicate(predicate: (value: T) => unknown): T[];
		distinct(): T[];
	}
}

function extractCharacterId(url: string): string | null {
	const match = url.match(/\/characters\/(\d+)/);
	if (match) return match[1];
	if (/^\d+$/.test(url.trim())) return url.trim();
	return null;
}

export default class DnDBeyondImporterPlugin extends Plugin {
	pluginSettings: Partial<DnDBeyondImporterSettings> = {
		importWhenOpening: true,
		importOnStartup: true,
		includeDescriptions: true
	}
	activeFilePath: string | null = null;
	
	async onload() {
	
		await this.loadSettings();
		
		this.app.workspace.onLayoutReady(async () => {
			this.app.workspace.on('active-leaf-change', async(leaf: WorkspaceLeaf | null) => {
				
                if (leaf) {
                    const activeFile = this.app.workspace.getActiveFile();
					if(activeFile?.path == this.activeFilePath) {
						return;
					}

					this.activeFilePath = activeFile?.path ?? null;

						if (activeFile instanceof TFile) {
							const fileCache = this.app.metadataCache.getFileCache(activeFile);
						
							const frontmatter = fileCache?.frontmatter;
							
							if (!Utilities.shouldImport("importWhenOpening", frontmatter, this.pluginSettings)) {
								return;
							}
							
							this.importCharacter(frontmatter["dndbeyond_id"].toString());
							
						}
					}
            	})
			
			for (const file of this.app.vault.getMarkdownFiles()) {
				const fm: Record<string, unknown> | undefined = this.app.metadataCache.getFileCache(file)?.frontmatter;

				if (!Utilities.shouldImport("importWhenOpening", fm, this.pluginSettings)) {
					continue;
				}
				await this.importCharacter(fm?.["dndbeyond_id"].toString());
			}
		});

		this.addSettingTab(new DnDBeyondSettingTab(this.app, this));

		this.addRibbonIcon("user-plus", "Import D&D Beyond character", () => {
			new ImportModal(this.app, this).open();
		});

		this.addCommand({
			id: "import-dndbeyond-character",
			name: "Import D&D Beyond character",
			callback: () => {
				new ImportModal(this.app, this).open();
			},
		});

		this.addCommand({
			id: "refresh-dndbeyond-characters",
			name: "Sync D&D Beyond characters",
			callback: () => {
				for (const file of this.app.vault.getMarkdownFiles()) {
					const fm: Record<string, unknown> | undefined =
						this.app.metadataCache.getFileCache(file)?.frontmatter;
					if (!fm?.["dndbeyond_id"]) continue;
					this.importCharacter(fm?.["dndbeyond_id"].toString());
				}
			}
		});
		
		this.registerMarkdownCodeBlockProcessor("dnd-sheet-launcher-atlas", (source: string, el: HTMLElement) => {
			const params: Record<string, string> = {};
			for (const line of source.split("\n")) {
				const parts = line.split(":");
				const k = parts[0] ?? "";
				const v = parts[1] ?? "";
				if (k && v) params[k.trim()] = v.trim();
			}
			const rawCharId = params["charId"];
			const charId = rawCharId && rawCharId !== "0" ? rawCharId : null;

			const row = el.createDiv({ cls: "dndbi-atlas-launcher-row dont-hide" });

			const refreshBtn = row.createEl("button", { cls: "dndbi-refresh-btn" });
			refreshBtn.setText("🔄 Refresh sheet from D&D Beyond");

			if (!charId) {
				refreshBtn.disabled = true;
				refreshBtn.title = "This note has no D&D Beyond character ID.";
			} else {
				refreshBtn.addEventListener("click", () => {
					const originalLabel = "🔄 Refresh from D&D Beyond";
					refreshBtn.setText("⏳ Refreshing…");
					refreshBtn.disabled = true;
					refreshBtn.classList.remove("dndbi-flash-success", "dndbi-flash-error");

					this.app.workspace.activeLeaf?.rebuildView();
		
					this.importCharacter(charId).then(() => {
						refreshBtn.setText("✅ Refreshed");
						refreshBtn.classList.add("dndbi-flash-success");
					}).catch((e: unknown) => {
						const msg = e instanceof Error ? e.message : String(e);
						new Notice(`❌ Refresh failed: ${msg}`, 4000);
						refreshBtn.setText("❌ Refresh failed");
						refreshBtn.classList.add("dndbi-flash-error");
						console.error("[DnD Beyond Importer]", e);
					}).finally(() => {
						window.setTimeout(() => {
							refreshBtn.setText(originalLabel);
							refreshBtn.classList.remove("dndbi-flash-success", "dndbi-flash-error");
							refreshBtn.disabled = false;
						}, 1600);
					});
				});
			}
		});
	}

	async loadSettings() {
		const loaded = (await this.loadData()) as Partial<DnDBeyondImporterSettings> | null;
		this.pluginSettings = Object.assign({}, DEFAULT_SETTINGS, loaded ?? {});
	}

	async saveSettings() {
		await this.saveData(this.pluginSettings);
	}
	
	async importCampaign(idOrUrl: string, settingsOverrides?: Partial<DnDBeyondImporterSettings>, campaignSettings?: Partial<CampaignImportSettings>): Promise<void> {
		const id = extractCharacterId(idOrUrl);
		
		const baseCharacterData = await this.fetchCharacterData(idOrUrl);
		
		if (!baseCharacterData.campaign){
			new Notice("This character is not part of a campaign.", 4000);
			return;
		}
		
		await Promise.all(baseCharacterData.campaign.characters.map(async (campaignCharacter) => await this.importCharacter(campaignCharacter.characterId.toString(), settingsOverrides, {campaignName: baseCharacterData.campaign?.name, isCampaignImport: true})));
		
		const encounter = {
			"description": "Encounter with 2 tokens",
			"tokens": baseCharacterData.campaign.characters.map(c => ({
						"id": `token-${c?.characterId}-96cpjf`,
						"name": c?.characterName ?? "Unknown",
						"size": 1,
						"statblockPath": `${c?.characterName}.md`
				})),
			"atlasRecord": {
				"format": 1,
				"name": baseCharacterData.campaign.name,
				"collection": "Default",
				"tags": ["D&D Beyond Importer"],
				"id": `encounter-${baseCharacterData.campaign.id}-znm1kd`,
				"createdAt": Date.now(),
				"modifiedAt": Date.now(),
				"type": "encounter"
			}
		}

		const createdFile = await this.app.vault.create(`atlas-vtt/collections/Default/encounters/encounter-${baseCharacterData.campaign.id}-znm1kd.json`, JSON.stringify(encounter, null, 2));
		
		new Notice(`✅ Imported campaign ${baseCharacterData.campaign.name}.`, 3000);
	}
	
	async importCharacter(idOrUrl: string, settingsOverrides?: Partial<DnDBeyondImporterSettings>, campaignSettings?: Partial<CampaignImportSettings>): Promise<void> {
		await TemplateManager.installTemplate(this.app);
		
		if (campaignSettings?.importCampagn) {
			await this.importCampaign(idOrUrl, settingsOverrides, campaignSettings);
			return;
		}
		
		const character = await this.fetchCharacterData(idOrUrl);

		const existing: TFile | undefined = this.app.vault.getMarkdownFiles().find(
			(f: TFile) => {
				const fm: Record<string, unknown> | undefined =
					this.app.metadataCache.getFileCache(f)?.frontmatter;
				return fm?.["dndbeyond_id"] === character.id;
			}
		);
		
		let markdown: string;
		try {
			markdown = MarkdownBuilder.buildMarkdown(character, this.pluginSettings, settingsOverrides, existing ? this.app.metadataCache.getFileCache(existing)?.frontmatter : undefined);
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			new Notice(`❌ Failed to build character note: ${msg}`, 5000);
			throw e;
		}

		const folder = this.toPath(this.pluginSettings.outputFolder || "Characters", campaignSettings?.campaignName || "");
		if (folder && !this.app.vault.getAbstractFileByPath(folder)) {
			try {
				await this.app.vault.createFolder(folder);
			} catch {
				/* folder already exists (race with another note); safe to ignore */
			}
		}

		const safeName = (character.name ?? `Character ${character.id}`).replace(/[\\/:*?"<>|]/g, "-").trim();
		const defaultPath = normalizePath(`${folder}/${safeName}.md`);
		let imagePath = folder;

		try {
			if (existing) {
				imagePath = existing.parent?.path ?? '';
				await this.app.vault.modify(existing, markdown);
				
			} else {
				let targetPath = defaultPath;
				let suffix = 2;
				while (this.app.vault.getAbstractFileByPath(targetPath)) {
					targetPath = normalizePath(`${folder}/${safeName} (${suffix}).md`);
					suffix++;
				}
				const createdFile = await this.app.vault.create(targetPath, markdown);
				if (!campaignSettings?.isCampaignImport){
					const leaf = this.app.workspace.getLeaf(false);
					await leaf.openFile(createdFile);
				}
				
			}
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			new Notice(`❌ Failed to write character note: ${msg}`, 5000);
			throw e;
		}
		
		const imageOutputFolder = this.pluginSettings.imageOutputFolder || '~/Images/';

		const imageDirectory = imageOutputFolder?.startsWith('~') ?
			normalizePath(`${imagePath}/${imageOutputFolder.replace('~/', '').replace('~', '')}`) :
			normalizePath(`${imageOutputFolder}`);

		const existingImage = this.app.vault.getFiles().find(f => f.name === `${character.name ?? "character"}_${character.id}.jpg`);
		
		if (!existingImage) {

			if (imageDirectory && !this.app.vault.getAbstractFileByPath(imageDirectory)) {
				try {
					await this.app.vault.createFolder(imageDirectory);
				} catch {
					/* folder already exists (race with another note); safe to ignore */
				}
			}

			try {
				await this.app.vault.createBinary(`${imageDirectory}/${character.name ?? "character"}_${character.id}.jpg`, await requestUrl({url: character.decorations?.avatarUrl ?? ""}).arrayBuffer);
			} catch (e) {
				console.error(e);
			}
		}

		const atlasDefinition = {
			"atlasRecord": {
				"format": 1,
				"type": "token",
				"showRing": true,
				"name": character.name,
				"imagePath": `${imageDirectory}/${character.name ?? "character"}_${character.id}.jpg`,
				"size": 1,
				"statblockPath": this.toPath(folder, `${character.name}.md`),
				"playerCharacter": true,
				"collection": "Default",
				"tags": [],
				"thumbnailPath": `${imageDirectory}/${character.name ?? "character"}_${character.id}.jpg`,
				"id": `token-${character.id}-96cpjf`,
				"createdAt": Date.now(),
				"modifiedAt": Date.now()
			}
		}

		await this.app.vault.create(`atlas-vtt/collections/Default/tokens/token-${character.id}-96cpjf.json`, JSON.stringify(atlasDefinition, null, 2));

		new Notice(`✅ Imported ${character.name ?? "character"}.`, 3000);
	}

	private async fetchCharacterData(idOrUrl: string) {

		const id = extractCharacterId(idOrUrl);
		if (!id) {
			new Notice("Couldn't find a D&D Beyond character ID in that input.", 4000);
			throw new Error("Invalid D&D Beyond character URL or ID.");
		}
		
		let data: DdbApiResponse;
		let partyInventory: PartyInventory = {data: {partyItems: []}};
		try {
			const resp = await requestUrl({
				url: `https://character-service.dndbeyond.com/character/v5/character/${id}?includeCustomItems=true`,
				headers: {Accept: "application/json"},
			});
			data = resp.json as DdbApiResponse;

			if (data?.data?.campaign) {
				const partyInv = await requestUrl({
					url: `https://character-service.dndbeyond.com/character/v5/party/inventory/${data.data.campaign.id}`,
					headers: {Accept: "application/json"},
				});
				partyInventory = partyInv.json as PartyInventory;
			}
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			new Notice(`❌ Couldn't fetch character ${id}. Make sure the sheet is set to Public on D&D Beyond.`, 5000);
			throw new Error(`Failed to fetch D&D Beyond character ${id}: ${msg}`);
		}

		const character = data?.data;
		if (!character) {
			new Notice("❌ Unexpected response from D&D Beyond. Is the character set to Public?", 5000);
			throw new Error("Unexpected D&D Beyond API response structure.");
		}

		const partyItems = partyInventory?.data?.partyItems?.filter(i => i.equippedEntityId == character.id)?.map(i => i.definition.grantedModifiers ?? [])?.flat() ?? [];
		character.modifiers?.item?.push(...partyItems);
		
		return character;
	}
	
	private toPath(...parts: string[]): string {
		return parts.filter(Boolean).map(p => p.trim()).join("/");
	}
}