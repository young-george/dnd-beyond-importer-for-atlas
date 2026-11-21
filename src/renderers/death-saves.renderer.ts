import AbstractRenderer from "./abstract.renderer";

export default class DeathSavesRenderer extends AbstractRenderer {
    
    render(): string {
        return `death_save_success:
- name: Success
  max: 3
  used: ${3 - (this.character.raw.deathSaves?.successCount ?? 0)}
  templateMax: 3
death_save_failure:
- name: Failure
  max: 3
  used: ${3 - (this.character.raw.deathSaves?.failCount ?? 0)}
  templateMax: 3`;
    }

}