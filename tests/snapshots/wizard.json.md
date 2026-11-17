---
cssClasses: ["dnd-beyond-imported-character"]
obsidianUIMode: preview
atlas-template: "5e-2024-character-sheet-4r8tqz"
statblock: true
importer_version: 1.0.9
dndbeyond_id: 168673586
# ----- Override settings -----
embedDndBeyond: undefined
includeDescriptions: undefined
importOnStartup: undefined
importWhenOpening: undefined
importSkillValues: undefined
# -------------------------------
name: Therai
species: "Tiefling"
class: "Wizard"
subclass: "Bladesinging"
level: 7
size: Medium
background: "Urchin"
alignment: "Unaligned"
xp: 14000
tags: ["dnd-character", "tiefling", "Wizard"]
proficiency_bonus: "+3"
pb: "+3"
image: [[Therai_168673586.jpg]]
hp: 30
hp_current: 30
hp_temp: 0

hit_dice: "7d6"
hit_dice_spent: 0
hit_dice_pool:
  - name: "Hit Dice (d8)"
    max: 0
  - name: "Wizard (d6)"
    max: 7
    used: 0
initiative: "2"
ac: 15
speed: 30
stats:
  - 9
  - 15
  - 10
  - 16
  - 10
  - 12
saves:
- str: " -1"
- dex: " +2"
- con: " +0"
- int: "▲A +6"
- wis: " +3"
- cha: " +1"
acrobatics_override: " +2"
animal_handling_override: " +0"
arcana_override: "▲A +6"
athletics_override: " -1"
deception_override: " +1"
history_override: "▲A +3"
insight_override: " +0"
intimidation_override: " +1"
investigation_override: "▲A +6"
medicine_override: " +0"
nature_override: "▲A +3"
perception_override: " +0"
performance_override: " +4"
persuasion_override: " +1"
religion_override: "▲A +3"
sleight_of_hand_override: " +5"
stealth_override: " +5"
survival_override: " +0"

arcana_prof: ◆
investigation_prof: ◆
performance_prof: ◆
sleight_of_hand_prof: ◆
stealth_prof: ◆
damage_resistances: None
damage_immunities: None
damage_vulnerabilities: None
senses: Passive Perception **10**, Passive Investigation **16**, Passive Insight **10**, Darkvision 60ft
passive_perception: 10
passive_investigation: 16
passive_insight: 10
languages: Common, Common Sign Language, Draconic
armor_training: Light Armor
tool_proficiencies: Disguise Kit, Thieves' Tools
weapon_mastery:
actions:
- name: "Rapier"
  range: "5 ft "
  attack: "+2"
  damage: "1d8+2"
  type: "Piercing"
  desc: "Finesse, Vex "
- name: "Unarmed Strike"
  range: "5 ft"
  attack: "+3"
  damage: "1"
  type: "Bludgeoning"
  desc: " "
- name: "Scorching Ray"
  range: "120 ft"
  attack: "+7"
  damage: "2d6"
  type: "Fire"
  desc: " "
- name: "Vampiric Touch"
  range: "Self"
  attack: "+7"
  damage: "3d6"
  type: "Necrotic"
  desc: " "
- name: "Witch Bolt"
  range: "60 ft"
  attack: "+7"
  damage: "2d12 + 1d12"
  type: "Lightning, Lightning"
  desc: " "
bonus_actions:
- name: "Dragon's Breath"
  range: "Touch"
  attack: "DC12 DEX"
  damage: "3d6"
  type: "Acid, Cold, Fire, Lightning, Poison"
  desc: " "
- name: "Misty Step"
  range: "Self"
  attack: ""
  damage: ""
  type: ""
  desc: " "
- name: "Shadow Blade"
  range: "Self"
  attack: ""
  damage: "2d8"
  type: "Psychic"
  desc: " "
- name: "Bladesong"
  range: ""
  attack: ""
  damage: ""
  type: ""
  desc: " Uses: / long rest"

reactions:
- name: "Counterspell"
  range: "60 ft"
  attack: ""
  damage: ""
  type: ""
  desc: " "
- name: "Feather Fall"
  range: "60 ft"
  attack: ""
  damage: ""
  type: ""
  desc: " "
- name: "Shield"
  range: "Self"
  attack: ""
  damage: ""
  type: ""
  desc: " "
- name: "Reactive Spell"
  range: ""
  attack: ""
  damage: ""
  type: ""
  desc: " "

otheractions:
- name: "Arcane Recovery"
  range: ""
  attack: ""
  damage: ""
  type: ""
  desc: " Uses: <input class='action-use' type='checkbox' />/ long rest"
- name: "Cantrip Formulas"
  range: ""
  attack: ""
  damage: ""
  type: ""
  desc: " "
spellcasting_ability: "INT"
spell_save_dc: 15
spell_attack_bonus: +7

slots:
- name: 1st Level
  max: 4
  used: 0
- name: 2nd Level
  max: 3
  used: 0
- name: 3rd Level
  max: 3
  used: 0
- name: 4th Level
  max: 1
  used: 0
- name: 5th Level
  max: 0
  used: 0
- name: 6th Level
  max: 0
  used: 0
- name: 7th Level
  max: 0
  used: 0
- name: 8th Level
  max: 0
  used: 0
- name: 9th Level
  max: 0
  used: 0

tab_3:
- name: "Alter Self " 
  range: Self
  duration: Concentration, up to 1 hour
  cost: "Action"
  damage: 
  type: 
- name: "Burning Hands (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 4d6
  type: Fire
- name: "Catapult (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 4d8
  type: Bludgeoning
- name: "Darkness " 
  range: 60 ft
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 
  type: 
- name: "Darkness " 
  range: 60 ft
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 
  type: 
- name: "Dragon's Breath " 
  range: Touch
  duration: Concentration, up to 1 minute
  cost: "Bonus Action"
  damage: 3d6
  type: Acid, Cold, Fire, Lightning, Poison
- name: "Hellish Rebuke (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 3d10
  type: Fire
- name: "Hellish Rebuke (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 3d10
  type: Fire
- name: "Knock " 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 
  type: 
- name: "Magic Missile (Upcast)" 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 1d4
  type: Force
- name: "Misty Step " 
  range: Self
  duration: Instantaneous
  cost: "Bonus Action"
  damage: 
  type: 
- name: "Rime's Binding Ice " 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 3d8
  type: Cold
- name: "Rope Trick " 
  range: Touch
  duration: Up to 1 hour
  cost: "Action"
  damage: 
  type: 
- name: "Scorching Ray " 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 2d6
  type: Fire
- name: "Shadow Blade " 
  range: Self
  duration: Concentration, up to 1 minute
  cost: "Bonus Action"
  damage: 3d8
  type: Psychic
- name: "Shatter " 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 3d8
  type: Thunder
- name: "Thunderwave (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 3d8
  type: Thunder
- name: "Witch Bolt (Upcast)" 
  range: 60 ft
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 3d12 + 1d12
  type: Lightning
- name: "Wither and Bloom " 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 2d6
  type: Necrotic

tab_2:
- name: "Burning Hands " 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 3d6
  type: Fire
- name: "Catapult " 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 3d8
  type: Bludgeoning
- name: "Comprehend Languages " 
  range: Self
  duration: Up to 1 hour
  cost: "Action"
  damage: 
  type: 
- name: "Detect Magic " 
  range: Self
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 
  type: 
- name: "Feather Fall " 
  range: 60 ft
  duration: Up to 1 minute
  cost: "Reaction"
  damage: 
  type: 
- name: "Find Familiar " 
  range: 10 ft
  duration: Instantaneous
  cost: "Time: 1 hour"
  damage: 
  type: 
- name: "Hellish Rebuke " 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 2d10
  type: Fire
- name: "Hellish Rebuke " 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 2d10
  type: Fire
- name: "Identify " 
  range: Touch
  duration: Instantaneous
  cost: "Time: 1 minute"
  damage: 
  type: 
- name: "Magic Missile " 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 1d4 + 1
  type: Force
- name: "Protection from Evil and Good " 
  range: Touch
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 
  type: 
- name: "Shield " 
  range: Self
  duration: Up to 1 round
  cost: "Reaction"
  damage: 
  type: 
- name: "Tasha's Hideous Laughter " 
  range: 30 ft
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 
  type: 
- name: "Tenser's Floating Disk " 
  range: 30 ft
  duration: Up to 1 hour
  cost: "Action"
  damage: 
  type: 
- name: "Thunderwave " 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 2d8
  type: Thunder
- name: "Witch Bolt " 
  range: 60 ft
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 2d12 + 1d12
  type: Lightning

tab_4:
- name: "Burning Hands (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 5d6
  type: Fire
- name: "Catapult (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 5d8
  type: Bludgeoning
- name: "Counterspell " 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 
  type: 
- name: "Dispel Magic " 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 
  type: 
- name: "Dragon's Breath (Upcast)" 
  range: Touch
  duration: Concentration, up to 1 minute
  cost: "Bonus Action"
  damage: 4d6
  type: Acid, Cold, Fire, Lightning, Poison
- name: "Fireball " 
  range: 150 ft
  duration: Instantaneous
  cost: "Action"
  damage: 8d6
  type: Fire
- name: "Fly " 
  range: Touch
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 
  type: 
- name: "Haste " 
  range: 30 ft
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 
  type: 
- name: "Hellish Rebuke (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 4d10
  type: Fire
- name: "Hellish Rebuke (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 4d10
  type: Fire
- name: "Magic Missile (Upcast)" 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 1d4
  type: Force
- name: "Melf's Minute Meteors " 
  range: Self
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 2d6
  type: Fire
- name: "Rime's Binding Ice (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 4d8
  type: Cold
- name: "Scorching Ray (Upcast)" 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 2d6
  type: Fire
- name: "Shadow Blade (Upcast)" 
  range: Self
  duration: Concentration, up to 1 minute
  cost: "Bonus Action"
  damage: 5d8
  type: Psychic
- name: "Shatter (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 4d8
  type: Thunder
- name: "Thunderwave (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 4d8
  type: Thunder
- name: "Tiny Hut " 
  range: Self
  duration: Up to 8 hours
  cost: "Time: 1 minute"
  damage: 
  type: 
- name: "Vampiric Touch " 
  range: Self
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 3d6 + 
  type: Necrotic, Healing
- name: "Witch Bolt (Upcast)" 
  range: 60 ft
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 4d12 + 1d12
  type: Lightning
- name: "Wither and Bloom (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 3d6
  type: Necrotic

tab_5:
- name: "Burning Hands (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 6d6
  type: Fire
- name: "Catapult (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 6d8
  type: Bludgeoning
- name: "Counterspell (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 
  type: 
- name: "Dispel Magic (Upcast)" 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 
  type: 
- name: "Dragon's Breath (Upcast)" 
  range: Touch
  duration: Concentration, up to 1 minute
  cost: "Bonus Action"
  damage: 5d6
  type: Acid, Cold, Fire, Lightning, Poison
- name: "Fire Shield " 
  range: Self
  duration: Up to 10 minutes
  cost: "Action"
  damage: 2d8
  type: Fire, Cold
- name: "Fireball (Upcast)" 
  range: 150 ft
  duration: Instantaneous
  cost: "Action"
  damage: 9d6
  type: Fire
- name: "Fly (Upcast)" 
  range: Touch
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 
  type: 
- name: "Hellish Rebuke (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 5d10
  type: Fire
- name: "Hellish Rebuke (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Reaction"
  damage: 5d10
  type: Fire
- name: "Magic Missile (Upcast)" 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 1d4
  type: Force
- name: "Melf's Minute Meteors (Upcast)" 
  range: Self
  duration: Concentration, up to 10 minutes
  cost: "Action"
  damage: 2d6
  type: Fire
- name: "Rime's Binding Ice (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 5d8
  type: Cold
- name: "Scorching Ray (Upcast)" 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 2d6
  type: Fire
- name: "Shadow Blade (Upcast)" 
  range: Self
  duration: Concentration, up to 1 minute
  cost: "Bonus Action"
  damage: 8d8
  type: Psychic
- name: "Shatter (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 5d8
  type: Thunder
- name: "Thunderwave (Upcast)" 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 5d8
  type: Thunder
- name: "Vampiric Touch (Upcast)" 
  range: Self
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 4d6
  type: Necrotic, Healing
- name: "Vitriolic Sphere " 
  range: 150 ft
  duration: Instantaneous
  cost: "Action"
  damage: 10d4 + 5d4
  type: Acid
- name: "Witch Bolt (Upcast)" 
  range: 60 ft
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 5d12 + 1d12
  type: Lightning
- name: "Wither and Bloom (Upcast)" 
  range: 60 ft
  duration: Instantaneous
  cost: "Action"
  damage: 4d6
  type: Necrotic

spellcasting:
- name: "Dancing Lights " 
  range: 120 ft
  duration: Concentration, up to 1 minute
  cost: "Action"
  damage: 
  type: 
- name: "Fire Bolt " 
  range: 120 ft
  duration: Instantaneous
  cost: "Action"
  damage: 2d10
  type: Fire
- name: "Green-Flame Blade " 
  range: Self
  duration: Instantaneous
  cost: "Action"
  damage: 1d8
  type: Fire
- name: "Message " 
  range: 120 ft
  duration: Up to 1 round
  cost: "Action"
  damage: 
  type: 
- name: "Prestidigitation " 
  range: 10 ft
  duration: Up to 1 hour
  cost: "Action"
  damage: 
  type: 
- name: "Thaumaturgy " 
  range: 30 ft
  duration: Up to 1 minute
  cost: "Action"
  damage: 
  type:
class_features:
- name: "Hit Points"
- name: "Proficiencies"
- name: "Equipment"
- name: "Spellcasting"
- name: "Arcane Recovery"
- name: "Arcane Tradition"
- name: "Ability Score Improvement"
- name: "Training in War and Song"
- name: "Bladesong"
- name: "Extra Attack"

species_traits:
- name: "Ability Score Increases"
- name: "Creature Type"
- name: "Size"
- name: "Speed"
- name: "Darkvision"
- name: "Fiendish Legacy"
- name: "Otherworldly Presence"
- name: "Fiendish Legacy Spells"
- name: "Languages"

feats:
- name: "War Caster"
equipment:
- name: "Pendant of Int"
  desc: "— **Quantity:** 1, "
- name: "Studded Leather"
  desc: "— **Quantity:** 1, **Weight:** 13 lb."
- name: "Quarterstaff"
  desc: "— **Quantity:** 1, **Weight:** 4 lb."
- name: "Rapier"
  desc: "— **Quantity:** 1, **Weight:** 2 lb."
- name: "Backpack"
  desc: "— **Quantity:** 1, **Weight:** 5 lb."
- name: "Case, Map or Scroll"
  desc: "— **Quantity:** 1, **Weight:** 1 lb."
- name: "Clothes, Common"
  desc: "— **Quantity:** 1, **Weight:** 3 lb."
- name: "Spellbook"
  desc: "— **Quantity:** 1, **Weight:** 3 lb."
- name: "Small Knife"
  desc: "— **Quantity:** 1, "
- name: "Staff"
  desc: "— **Quantity:** 1, **Weight:** 4 lb."
- name: "Bedroll"
  desc: "— **Quantity:** 1, **Weight:** 7 lb."
- name: "Mess Kit"
  desc: "— **Quantity:** 1, **Weight:** 1 lb."
- name: "Rations (1 day)"
  desc: "— **Quantity:** 10, **Weight:** 2 lb."
- name: "Rope, Hempen (50 feet)"
  desc: "— **Quantity:** 1, **Weight:** 10 lb."
- name: "Tinderbox"
  desc: "— **Quantity:** 1, **Weight:** 1 lb."
- name: "Torch"
  desc: "— **Quantity:** 10, **Weight:** 1 lb."
- name: "Waterskin"
  desc: "— **Quantity:** 1, **Weight:** 5 lb."
currency:
- 0
- 0
- 0
- 420
- 0
notes_2: |-

  
  
  <!-- PUT CUSTOM NOTES BELOW THIS LINE -->
  
age: 
height: 
weight: 
eyes: 
skin: 
hair: 
personality: |-
  "
allies: |-
  
appearance:
---

```dnd-sheet-launcher-atlas
charId:168673586
```



<iframe class="dnd-frame" src="https://www.dndbeyond.com/characters/168673586"></iframe>


