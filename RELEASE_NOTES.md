# Release Notes

## 1.0.11
- Remove plugin template management, as templates can now be shared through the Armarium.
- Fix issue with spells were missing the spellcasting ability modifier in the damage roll.

## 1.0.10
- Correctly show heroic inspiration and death save results.
- Handle advantage and disadvantage using Atlas' `adv` and `dis` markers, making the relevant rolls automatically roll with Advantage or Disadvantage.
- Include skills with no proficiency in the statblock, to correctly render the dropdown in Atlas Online.
- Fix issue with rendering of initiative in Atlas Online, including advantage/disadvantage.

## 1.0.9
- Fix issue with reaction spells not appearing.
- Fix an issue with spells upcasting all the way to level 9.
- Fix an issue with healing spells not showing dice rolls.
- Warn the user when the `5e (2024) Character Sheet` template is out of date, offering to update it.
- Fix issue with weapon behaviours and damage dice not showing correctly for versatile weapons.

## 1.0.8
- Fix issue with multiline allies/organisations.
- Improve rendering of Uses checkboxes.
- Account for base walking speed overrides.
- Handle the extra ability score increase that can be selected when configuring abilities before selecting a background.
- Remove colours from ▲A and ▼D icons in statblock, as they are not supported in Atlas Online.

## 1.0.7
- Support skill overrides from D&D Beyond. If a skill modifier is overridden in D&D Beyond, the plugin will now import the overridden value instead of the default value.
- Fix issue where some spells would not show an attack roll.
- Improve support for custom skills.
- Show selected class feature options, like selected Eldritch Invocations.

## 1.0.6
- Improve error handling when checking for the 5e character sheet template.

## 1.0.5
- Fix issue with spellcasting costs.

## v1.0.4
- Rewrite HTML styling into Markdown, so that it can be shown properly in Atlas Online.

## v1.0.1
- Add additional spellcasting details, including cost (action, bonus action, reaction), damage dice, damage type.
- Add support for upcasting spells.
- Exclude additional feats from being imported: "Hero's Journey Boon", "Faction Renown", "Neutral Faction Renown", "Subfaction Renown"

## v1.0.0 — Initial Release

- Import any public D&D Beyond character sheet as a Markdown note formatted to work with Atlas VTT.