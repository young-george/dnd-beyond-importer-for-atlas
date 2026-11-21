import {App, DropdownComponent, Modal, Setting, Plugin} from "obsidian";
import {CampaignImportSettings, DnDBeyondImporterSettings} from "./types";
import {SETTING_DEFINITIONS} from "./settings-tab";

export default class ImportModal extends Modal {
    plugin: InstanceType<typeof Plugin> & {
        importCharacter: (url: string, settingsOverrides?: Partial<DnDBeyondImporterSettings>, campaignSettings?: Partial<CampaignImportSettings>) => Promise<void>;
    };
    private urlValue = "";
    private settingsOverrides: Partial<DnDBeyondImporterSettings> = {} as Partial<DnDBeyondImporterSettings>;
    private campaignSettings: Partial<CampaignImportSettings> = {} as Partial<CampaignImportSettings>;

    constructor(app: App, plugin: ImportModal["plugin"]) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        
        this.setTitle("Import D&D Beyond Character");
        
        new Setting(contentEl)
            .setName("Character URL or ID")
            .setDesc("Paste the character URL or numeric ID. The character must be set to Public on D&D Beyond.")
            .setClass("dndbi-import-url-input")
            .addText((text) =>
                text
                    .setPlaceholder("https://www.dndbeyond.com/characters/137202151/…")
                    .setValue(this.urlValue)
                    .onChange((value) => {
                        this.urlValue = value;
                    })
            );
        
        const campaign = contentEl.createEl("details", {cls: "dndbi-import-setting-group"});
        campaign.createEl("summary", { text: "Campaign Settings" });

        new Setting(campaign)
            .setName("Import Campaign")
            .setDesc("Import all character sheets from the campaign associated with the linked character.")
            .addToggle(toggle => {
                toggle.setValue(false);
                toggle.onChange((value) => {
                    this.campaignSettings.importCampagn = value;
                });
            });
        
        const advanced = contentEl.createEl("details", {cls: "dndbi-import-setting-group"});
        advanced.createEl("summary", { text: "Advanced Settings" });
        
        advanced.createEl("p", { cls: 'setting-item-name', text: "Override plugin settings for this character sheet. These settings are remembered for " +
                "this character, and are applied when resyncing. These can be changed later by editing the statblock's frontmatter. Leave as 'Default' to uses the plugin's global settings." });
        
        new Setting(advanced)
            .setName(SETTING_DEFINITIONS.includeDescriptions.name)
            .setDesc(SETTING_DEFINITIONS.includeDescriptions.desc)
            .addDropdown(dropdown => {
                this.addStandardOptions(dropdown, "includeDescriptions")
            });

        new Setting(advanced)
            .setName(SETTING_DEFINITIONS.embedDndBeyond.name)
            .setDesc(SETTING_DEFINITIONS.embedDndBeyond.desc)
            .addDropdown(dropdown => {
                this.addStandardOptions(dropdown, "embedDndBeyond")
            });
        
        new Setting(advanced)
            .setName(SETTING_DEFINITIONS.importSkillValues.name)
            .setDesc(SETTING_DEFINITIONS.importSkillValues.desc)
            .addDropdown(dropdown => {
                this.addStandardOptions(dropdown, "importSkillValues")
            });
        
        new Setting(advanced)
            .setName(SETTING_DEFINITIONS.importOnStartup.name)
            .setDesc(SETTING_DEFINITIONS.importOnStartup.desc)
            .addDropdown(dropdown => {
                this.addStandardOptions(dropdown, "importOnStartup")
            });
        
        new Setting(advanced)
            .setName(SETTING_DEFINITIONS.importWhenOpening.name)
            .setDesc(SETTING_DEFINITIONS.importWhenOpening.desc)
            .addDropdown(dropdown => {
                this.addStandardOptions(dropdown, "importWhenOpening")
            });
        
        const btnRow = contentEl.createDiv({ cls: "dndbi-import-btn-row" });

        const cancelBtn = btnRow.createEl("button", { text: "Cancel" });
        cancelBtn.addEventListener("click", () => this.close());

        const importBtn = btnRow.createEl("button", {
            text: "Import",
            cls: "mod-cta",
        });
        importBtn.addEventListener("click", () => {
            this.submit().catch((err: unknown) => {
                console.error("Import failed:", err);
            });
        });
        
    }

    private async submit() {
        this.close();
        await this.plugin.importCharacter(this.urlValue.trim(), this.settingsOverrides, this.campaignSettings);
    }

    onClose() {
        this.contentEl.empty();
    }
    
    private addStandardOptions(dropdown: DropdownComponent, key: keyof DnDBeyondImporterSettings): DropdownComponent {
        return dropdown
            .addOption("default", "Default")
            .addOption("true", "Yes")
            .addOption("false", "No")
            .setValue("default")
            .onChange(value => {
                this.settingsOverrides[key] = {
                    "default": undefined,
                    "true": true,
                    "false": false
                }[value];
            });
    }
}