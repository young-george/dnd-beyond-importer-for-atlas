import AbstractRenderer from "./abstract.renderer";
import {DnDBeyondImporterSettings} from "../types";
import CharacterSheet from "../character-sheet";

export default class SettingsRenderer extends AbstractRenderer {
   
    constructor(
        character: CharacterSheet, 
        pluginSettings: Partial<DnDBeyondImporterSettings>, 
        existingFrontmatter?: Record<string, unknown>,
        private settingsOverrides?: Partial<DnDBeyondImporterSettings>
    ) {
        super(character, pluginSettings, existingFrontmatter);
    }
    
    render(): string {
        return `# ----- Override settings -----
${Object.entries(this.settingsOverrides || {})
            .map(([key, value]) => `${key}: ${value}`).join('\n')}
# -------------------------------`;
    }
    
    
}