import {DdbApiResponse, DnDBeyondImporterSettings} from "./types";
import CharacterSheet from "./character-sheet";
import FrontmatterRenderer from "./renderers/frontmatter.renderer";
import BasicDetailsRenderer from "./renderers/basic-details.renderer";
import HitpointsRenderer from "./renderers/hitpoints.renderer";
import CombatStatsRenderer from "./renderers/combat-stats.renderer";
import StatsRenderer from "./renderers/stats.renderer";
import SkillsRenderer from "./renderers/skills.renderer";
import DefensesRenderer from "./renderers/defenses.renderer";
import SensesRenderer from "./renderers/senses.renderer";
import ProficienciesRenderer from "./renderers/proficiencies.renderer";
import ActionsRenderer from "./renderers/actions.renderer";
import SpellcastingRenderer from "./renderers/spellcasting.renderer";
import FeaturesRenderer from "./renderers/features.renderer";
import EquipmentRenderer from "./renderers/equipment.renderer";
import CurrenciesRenderer from "./renderers/currencies.renderer";
import NotesRenderer from "./renderers/notes.renderer";
import TurndownService from 'turndown';
import SettingsRenderer from "./renderers/settings.renderer";

export default class MarkdownBuilder {
    
    static turndownService = new TurndownService();
  
    static buildMarkdown(
        data: DdbApiResponse,
        settings: Partial<DnDBeyondImporterSettings>,
        settingsOverrides?: Partial<DnDBeyondImporterSettings>,
        existingFrontmatter?: Record<string, unknown>
    ): string {

        const char = data.data;
        if (!char) throw new Error("Unexpected API response structure");

        if (!settingsOverrides){
            settingsOverrides = {
                embedDndBeyond: existingFrontmatter?.["embedDndBeyond"] as boolean | undefined,
                includeDescriptions: existingFrontmatter?.["includeDescriptions"] as boolean | undefined,
                importOnStartup: existingFrontmatter?.["importOnStartup"] as boolean | undefined,
                importWhenOpening: existingFrontmatter?.["importWhenOpening"] as boolean | undefined,
                importSkillValues: existingFrontmatter?.["importSkillValues"] as boolean | undefined
            }
        }
        
        const overrideSettings = Object.assign({}, settings, settingsOverrides ?? {});

        const sheet = new CharacterSheet(char, overrideSettings);
        
        
        const renderers = [
            new FrontmatterRenderer(sheet, overrideSettings, existingFrontmatter),
            new SettingsRenderer(sheet, settings, existingFrontmatter, settingsOverrides),
            new BasicDetailsRenderer(sheet, overrideSettings),
            new HitpointsRenderer(sheet, overrideSettings),
            new CombatStatsRenderer(sheet, overrideSettings),
            new StatsRenderer(sheet, overrideSettings),
            new SkillsRenderer(sheet, overrideSettings),
            new DefensesRenderer(sheet, overrideSettings),
            new SensesRenderer(sheet, overrideSettings),
            new ProficienciesRenderer(sheet, overrideSettings),
            new ActionsRenderer(sheet, overrideSettings),
            new SpellcastingRenderer(sheet, overrideSettings),
            new FeaturesRenderer(sheet, overrideSettings),
            new EquipmentRenderer(sheet, overrideSettings),
            new CurrenciesRenderer(sheet, overrideSettings),
            new NotesRenderer(sheet, overrideSettings, existingFrontmatter)
        ]

        let md = `---
${renderers.map(r => r.render().trim()).join("\n")}
---

\`\`\`dnd-sheet-launcher-atlas
charId:${char.id}
\`\`\`\n\n

${overrideSettings.embedDndBeyond ? `<iframe class="dnd-frame" src="https://www.dndbeyond.com/characters/${char.id}"></iframe>` : ''}

${this.buildDetails(sheet)}
`
        md = md.replace(/\\\[/g, '[').replace(/\\\]/g, ']');
        md = md.replace(/{{modifier:([a-z]{3})(.*)}}/g, '@$1.mod');
        md = md.replace(/<p>/g, '\n').replace(/<\/p>/g, '\n\n');
        md = md.replace(/\[skill\](.*?)\[\/skill\]/g, '[$1](skills.md#$1)');
        md = md.replace(/\[wprop\](.*?)\[\/wprop\]/g, '[$1](item-properties.md#$1)');
        md = md.replace(/\[condition\](.*?)\[\/condition\]/g, '[$1](conditions.md#$1)');
        md = md.replace(/\[action\](.*?)\[\/action\]/g, '[$1](actions.md#$1)');
        md = md.replace(/\[rules\](.*?)\[\/rules\]/g, '$1');

        return md;
    }

    static buildDetails(sheet: CharacterSheet): string {
        return sheet.linkedDescriptions
            ?.filter(d => d?.description && d?.description.trim() !== "")
            ?.map(d => `### ${d?.name ?? ""}\n${this.turndownService.turndown(d?.description ?? "")}\n`).join('\n');

    }
}