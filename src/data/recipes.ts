import { Recipe } from '../types';

// Alchemy Recipes (Phase 1: 20 most useful)
export const alchemyRecipes: Recipe[] = [
    {
        id: 'animal-speech-potion',
        name: 'Animal Speech Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Gain the ability to speak to CRITTERS for the session.',
        components: [
            { componentId: 'owl-tongue', componentName: 'Owl Tongue', quantity: 1 },
            { componentId: 'gnome-cap', componentName: 'Gnome Cap', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'arming-potion',
        name: 'Arming Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Grow two additional arms for 1 hour. In Combat, can attack twice.',
        components: [
            { componentId: 'elder-root', componentName: 'Elder Root', quantity: 1 },
            { componentId: 'crawlbad-claw', componentName: 'Crawlbad Claw', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'black-poison',
        name: 'Black Poison',
        type: 'alchemy',
        rarity: 'witchcraft',
        effect: 'On a 9+ Hit with a weapon dipped in this poison, the target Goon or Bruiser must make a 6+ Vitality Check or die. Champions become POISONED instead.',
        components: [
            { componentId: 'blackscar', componentName: 'Blackscar', quantity: 1 },
            { componentId: 'singe-viper-venom', componentName: 'Singe Viper Venom', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'blinding-powder',
        name: 'Blinding Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Target becomes BLINDED.',
        components: [
            { componentId: 'stickercloud', componentName: 'Stickercloud', quantity: 1 },
            { componentId: 'scraggle-eye', componentName: 'Scraggle Eye', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'bottled-creep-thistle',
        name: 'Bottled Creep Thistle',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Pour on the ground to conjure rapidly growing vines of Creep Thistle.',
        components: [
            { componentId: 'creep-thistle', componentName: 'Creep Thistle', quantity: 1 },
            { componentId: 'sour-keisterclam', componentName: 'Sour Keisterclam', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'bravery-potion',
        name: 'Bravery Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Heal 1d6 Courage and gain Advantage on Mettle Checks for 1 hour.',
        components: [
            { componentId: 'doohagenberry', componentName: 'Doohagenberry', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'cantrip-potion',
        name: 'Cantrip Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Gain a use of the Gnome Ability DWIMMERCRAFTY.',
        components: [
            { componentId: 'dwimmerseed', componentName: 'Dwimmerseed', quantity: 1 },
            { componentId: 'gnome-cap', componentName: 'Gnome Cap', quantity: 1 },
            { componentId: 'candlebloom', componentName: 'Candlebloom', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'charm-potion',
        name: 'Charm Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Drinker crushes on the first person they see after drinking. Lasts for 1 day.',
        components: [
            { componentId: 'songbloom', componentName: 'Songbloom', quantity: 1 },
            { componentId: 'speckled-reacher', componentName: 'Speckled Reacher', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'courage-potion',
        name: 'Courage Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Heal 1d12 Courage. Add Underblossom to make it 1d12+Level.',
        components: [
            { componentId: 'grail-tick-mucus', componentName: 'Grail Tick Mucus', quantity: 1 },
            { componentId: 'doohagenberry', componentName: 'Doohagenberry', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'crazy-grease',
        name: 'Crazy Grease',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Extremely slippery and flammable grease.',
        components: [
            { componentId: 'narrow-slimer', componentName: 'Narrow Slimer', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'digesting-powder',
        name: 'Digesting Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Instantly corrode a fist-sized non-living, non-Magic object.',
        components: [
            { componentId: 'rot-vine', componentName: 'Rot Vine', quantity: 1 },
            { componentId: 'rack-owl-pellet', componentName: 'Rack Owl Pellet', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'dragon-scale-potion',
        name: 'Dragon Scale Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Gain -1 Defense for an entire Combat.',
        components: [
            { componentId: 'dragon-lily', componentName: 'Dragon Lily', quantity: 1 },
            { componentId: 'crag-lizard-scales', componentName: 'Crag Lizard Scales', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'fire-resistance-potion',
        name: 'Fire Resistance Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Withstand extreme heat for 1 day and gain +5 Block against fire for 1 hour.',
        components: [
            { componentId: 'emberkiss', componentName: 'Emberkiss', quantity: 1 },
            { componentId: 'guardvark-bones', componentName: 'Guardvark Bones', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'flight-potion',
        name: 'Flight Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Grants flying for 10 minutes.',
        components: [
            { componentId: 'gulliath-feathers', componentName: 'Gulliath Feathers', quantity: 1 },
            { componentId: 'skyflower', componentName: 'Skyflower', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'frost-resistance-potion',
        name: 'Frost Resistance Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Withstand extreme cold for 1 day and gain +5 Block against cold damage for 1 hour.',
        components: [
            { componentId: 'candlebloom', componentName: 'Candlebloom', quantity: 1 },
            { componentId: 'whiteflame', componentName: 'Whiteflame', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'gigantism-potion',
        name: 'Gigantism Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Grow Huge to the size of a house for 10 minutes. Gain +2 Temporary Courage per Level.',
        components: [
            { componentId: 'ettinsblood', componentName: 'Ettinsblood', quantity: 1 },
            { componentId: 'kilorat-tail', componentName: 'Kilorat Tail', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'green-poison',
        name: 'Green Poison',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'On a 9+ Hit with a weapon dipped in this poison, the target must make a 6+ Vitality Check or become POISONED.',
        components: [
            { componentId: 'gorg-nettle', componentName: 'Gorg Nettle', quantity: 1 },
            { componentId: 'cairn-stinger-needle', componentName: 'Cairn Stinger Needle', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'gutter-glue',
        name: 'Gutter Glue',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Extremely strong adhesive that binds objects together like super glue.',
        components: [
            { componentId: 'guttersnail-goop', componentName: 'Guttersnail Goop', quantity: 1 },
            { componentId: 'merga-toad-slime', componentName: 'Merga Toad Slime', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'invisibility-potion',
        name: 'Invisibility Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Turn invisible for 1 hour or until engaging in Combat.',
        components: [
            { componentId: 'inkvale-iron', componentName: 'Inkvale Iron', quantity: 1 },
            { componentId: 'ryzophant-fang', componentName: 'Ryzophant Fang', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'lightfoot-potion',
        name: 'Lightfoot Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Run incredibly fast. Gain 2 Speed (move two range bands in a round) for the session.',
        components: [
            { componentId: 'jackalrabbit-fur', componentName: 'Jackalrabbit Fur', quantity: 1 },
            { componentId: 'silfren-flower', componentName: 'Silfren Flower', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'liquid-fire',
        name: 'Liquid Fire',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Highly flammable, sticky liquid that sets things on fire.',
        components: [
            { componentId: 'emberkiss', componentName: 'Emberkiss', quantity: 1 },
            { componentId: 'wyrmtail-vine', componentName: 'Wyrmtail Vine', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'mask-potion',
        name: 'Mask Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Change your appearance to look like someone else for 1 hour.',
        components: [
            { componentId: 'ashblossom', componentName: 'Ashblossom', quantity: 1 },
            { componentId: 'warbling-trapnoodle-scat', componentName: 'Warbling Trapnoodle Scat', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'mimic-potion',
        name: 'Mimic Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Perfectly mimic someone\'s voice for 1 hour.',
        components: [
            { componentId: 'reckonholly', componentName: 'Reckonholly', quantity: 1 },
            { componentId: 'warbling-trapnoodle-scat', componentName: 'Warbling Trapnoodle Scat', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'poison-antidote',
        name: 'Poison Antidote',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Cure POISONED.',
        components: [
            { componentId: 'muckroot', componentName: 'Muckroot', quantity: 1 },
            { componentId: 'singe-viper-venom', componentName: 'Singe Viper Venom', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'poison-resistance-potion',
        name: 'Poison Resistance Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Gain immunity to poisons for 1 day.',
        components: [
            { componentId: 'throngweed', componentName: 'Throngweed', quantity: 1 },
            { componentId: 'sting-whistler', componentName: 'Sting Whistler', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'potion-of-water-breathing',
        name: 'Potion of Water Breathing',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Breathe underwater for 1 hour.',
        components: [
            { componentId: 'star-moss', componentName: 'Star Moss', quantity: 1 },
            { componentId: 'quagmoss', componentName: 'Quagmoss', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'seeing-potion',
        name: 'Seeing Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'See invisible creatures and objects for 1 hour.',
        components: [
            { componentId: 'glittermoss', componentName: 'Glittermoss', quantity: 1 },
            { componentId: 'mirrorweed', componentName: 'Mirrorweed', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'shadow-walk-potion',
        name: 'Shadow Walk Potion',
        type: 'alchemy',
        rarity: 'witchcraft',
        effect: 'Step through shadows to teleport up to Near distance.',
        components: [
            { componentId: 'darkshroom', componentName: 'Darkshroom', quantity: 1 },
            { componentId: 'blinking-cave-incher-ichor', componentName: 'Blinking Cave Incher Ichor', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'shrinking-potion',
        name: 'Shrinking Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Shrink to the size of a mouse for 1 hour.',
        components: [
            { componentId: 'pindersnap-twinkle', componentName: 'Pindersnap Twinkle', quantity: 1 },
            { componentId: 'blinking-cave-incher-ichor', componentName: 'Blinking Cave Incher Ichor', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'sleep-powder',
        name: 'Sleep Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Target falls asleep for 1 hour or until disturbed.',
        components: [
            { componentId: 'flinder-dust', componentName: 'Flinder Dust', quantity: 1 },
            { componentId: 'funghoul-spores', componentName: 'Funghoul Spores', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'sniffing-potion',
        name: 'Sniffing Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Gain +1 Perceiving for the session.',
        components: [
            { componentId: 'orchsnout', componentName: 'Orchsnout', quantity: 1 },
            { componentId: 'rootersnoop-trunk', componentName: 'Rootersnoop Trunk', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'springheel-potion',
        name: 'Springheel Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Jump 20\' in the air for the session.',
        components: [
            { componentId: 'skyflower', componentName: 'Skyflower', quantity: 1 },
            { componentId: 'zozo-bird-egg', componentName: 'Zozo Bird Egg', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'sticky-glue',
        name: 'Sticky Glue',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Strong adhesive, not as strong as Gutter Glue.',
        components: [
            { componentId: 'melding-root', componentName: 'Melding Root', quantity: 1 },
            { componentId: 'guttersnail-goop', componentName: 'Guttersnail Goop', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'strong-potion',
        name: 'Strong Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Gain +1 Might for the session.',
        components: [
            { componentId: 'ettinsblood', componentName: 'Ettinsblood', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'sustaining-potion',
        name: 'Sustaining Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Don\'t need food or water for 1 day.',
        components: [
            { componentId: 'muckroot', componentName: 'Muckroot', quantity: 1 },
            { componentId: 'troll-bark', componentName: 'Troll Bark', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'tranquilizing-poison',
        name: 'Tranquilizing Poison',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'On a 9+ Hit with a weapon dipped in this poison, target falls unconscious for 1 hour.',
        components: [
            { componentId: 'bogsnap-ichor', componentName: 'Bogsnap Ichor', quantity: 1 },
            { componentId: 'weeping-ichor', componentName: 'Weeping Ichor', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'transmogrifying-potion',
        name: 'Transmogrifying Potion',
        type: 'alchemy',
        rarity: 'witchcraft',
        effect: 'Turn into a specific animal for 1 hour.',
        components: [
            { componentId: 'shifty-bootmouth', componentName: 'Shifty Bootmouth', quantity: 1 },
            { componentId: 'rot-vine', componentName: 'Rot Vine', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'true-aim-potion',
        name: 'True Aim Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Gain +2 Attack for an entire Combat.',
        components: [
            { componentId: 'ironwold-root', componentName: 'Ironwold Root', quantity: 1 },
            { componentId: 'glittermoss', componentName: 'Glittermoss', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'waking-potion',
        name: 'Waking Potion',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Wake someone from magical sleep or unconsciousness.',
        components: [
            { componentId: 'bogflower', componentName: 'Bogflower', quantity: 1 },
            { componentId: 'dreamwake', componentName: 'Dreamwake', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'cowl-of-the-pack-potion',
        name: 'Cowl of the Pack Potion',
        type: 'alchemy',
        rarity: 'witchcraft',
        effect: 'Transform into a wolf for 1 hour. Gain +1 Might and pack tactics.',
        components: [
            { componentId: 'weorgs-eye', componentName: 'Weorg\'s Eye', quantity: 1 },
            { componentId: 'wolf-pelt', componentName: 'Wolf Pelt', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'cursebreaker-potion',
        name: 'Cursebreaker Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Break a curse afflicting a person or item.',
        components: [
            { componentId: 'witchweed', componentName: 'Witchweed', quantity: 1 },
            { componentId: 'moppet-spider-eye', componentName: 'Moppet Spider Eye', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'ghost-speech-potion',
        name: 'Ghost Speech Potion',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Speak to ghosts for 1 hour.',
        components: [
            { componentId: 'gloomweed', componentName: 'Gloomweed', quantity: 1 },
            { componentId: 'spiritbloom', componentName: 'Spiritbloom', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'hex-powder',
        name: 'Hex Powder',
        type: 'alchemy',
        rarity: 'witchcraft',
        effect: 'Curse target with bad luck. They have Disadvantage on all Checks for 1 hour.',
        components: [
            { componentId: 'crimsonhook', componentName: 'Crimsonhook', quantity: 1 },
            { componentId: 'plappadoot-eye', componentName: 'Plappadoot Eye', quantity: 1 },
            { componentId: 'witchweed', componentName: 'Witchweed', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'invisible-ink',
        name: 'Invisible Ink',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Write messages that can only be seen under moonlight.',
        components: [
            { componentId: 'dreamwake', componentName: 'Dreamwake', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'itching-powder',
        name: 'Itching Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Target becomes DISTRACTED (Disadvantage on Checks).',
        components: [
            { componentId: 'itch-thicket', componentName: 'Itch Thicket', quantity: 1 },
            { componentId: 'kaleidoscorpion-tail', componentName: 'Kaleidoscorpion Tail', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'lifebringer-salve',
        name: 'Lifebringer Salve',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Restore 1 Vitality. Can only be used once per day.',
        components: [
            { componentId: 'dryads-beard', componentName: 'Dryad\'s Beard', quantity: 1 },
            { componentId: 'spiritbloom', componentName: 'Spiritbloom', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'petrification-potion',
        name: 'Petrification Potion',
        type: 'alchemy',
        rarity: 'witchcraft',
        effect: 'Turn target to stone for 1 hour or until spell is broken.',
        components: [
            { componentId: 'blackburr', componentName: 'Blackburr', quantity: 1 },
            { componentId: 'underblossom', componentName: 'Underblossom', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'shrubling-powder',
        name: 'Shrubling Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Animate a small bush or plant to serve you for 1 hour.',
        components: [
            { componentId: 'clunchweed', componentName: 'Clunchweed', quantity: 1 },
            { componentId: 'mountain-hermit', componentName: 'Mountain Hermit', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'silence-powder',
        name: 'Silence Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Target cannot speak or make noise for 1 hour.',
        components: [
            { componentId: 'dweorgbane', componentName: 'Dweorgbane', quantity: 1 },
            { componentId: 'muckland-bat-wing', componentName: 'Muckland Bat Wing', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'stupefying-powder',
        name: 'Stupefying Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Target becomes confused and dazed for 10 minutes.',
        components: [
            { componentId: 'rivergold', componentName: 'Rivergold', quantity: 1 },
            { componentId: 'sticky-wickle-vines', componentName: 'Sticky Wickle Vines', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'telepathic-cola',
        name: 'Telepathic Cola',
        type: 'alchemy',
        rarity: 'rare',
        effect: 'Read surface thoughts of one creature for 10 minutes.',
        components: [
            { componentId: 'golden-oldie', componentName: 'Golden Oldie', quantity: 1 },
            { componentId: 'mirrorweed', componentName: 'Mirrorweed', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'thought-powder',
        name: 'Thought Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Send a telepathic message to someone you know.',
        components: [
            { componentId: 'whisperleaf', componentName: 'Whisperleaf', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'tickle-powder',
        name: 'Tickle Powder',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Target laughs uncontrollably for 1 minute.',
        components: [
            { componentId: 'itch-thicket', componentName: 'Itch Thicket', quantity: 1 },
            { componentId: 'silfren-flower', componentName: 'Silfren Flower', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'weapon-black',
        name: 'Weapon Black',
        type: 'alchemy',
        rarity: 'common',
        effect: 'Black ink that can be painted on weapons and armor. 1d6 Usage Die.',
        components: [
            { componentId: 'bog-squid', componentName: 'Bog Squid', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    }
];

// Cooking Recipes (Phase 1: 15 most useful)
export const cookingRecipes: Recipe[] = [
    {
        id: 'bandy-clam-chowder',
        name: 'Bandy Clam Chowder',
        type: 'cooking',
        rarity: 'common',
        effect: 'Heal 1d6 Courage',
        components: [
            { componentId: 'bandy-clam-pearl', componentName: 'Bandy Clam Pearl', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'biter-bisque',
        name: 'Biter Bisque',
        type: 'cooking',
        rarity: 'common',
        effect: 'Inflict +1 Dread for the session.',
        components: [
            { componentId: 'hand-biter', componentName: 'Hand Biter', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'blackened-mungfish',
        name: 'Blackened Mungfish',
        type: 'cooking',
        rarity: 'common',
        effect: 'See in the dark for the session.',
        components: [
            { componentId: 'luminous-mungfish', componentName: 'Luminous Mungfish', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'boiled-crawlbad',
        name: 'Boiled Crawlbad',
        type: 'cooking',
        rarity: 'common',
        effect: 'Heal 2d4 Courage.',
        components: [
            { componentId: 'crawlbad-claw', componentName: 'Crawlbad Claw', quantity: 1 },
            { componentId: 'juvenile-crawlbad', componentName: 'Juvenile Crawlbad', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'bubble-carp-tea',
        name: 'Bubble Carp Tea',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Realms for the session.',
        components: [
            { componentId: 'bubble-carp', componentName: 'Bubble Carp', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'crag-lizard-steak',
        name: 'Crag Lizard Steak',
        type: 'cooking',
        rarity: 'common',
        effect: 'Heal 1d10 Courage.',
        components: [
            { componentId: 'crag-lizard-scales', componentName: 'Crag Lizard Scales', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'fireback-stew',
        name: 'Fireback Stew',
        type: 'cooking',
        rarity: 'common',
        effect: 'Naturally spicy and probably going to burn coming out, but feeds +6 people.',
        components: [
            { componentId: 'freshwater-fireback', componentName: 'Freshwater Fireback', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'ghostjaw-steak',
        name: 'Ghostjaw Steak',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Sneak for the session.',
        components: [
            { componentId: 'ghostjaw-creeper', componentName: 'Ghostjaw Creeper', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'gnome-biscuit',
        name: 'Gnome Biscuit',
        type: 'cooking',
        rarity: 'common',
        effect: 'Increases Knowhow by +1 for 1 day.',
        components: [
            { componentId: 'gnome-cap', componentName: 'Gnome Cap', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'grouper-soup',
        name: 'Grouper Soup',
        type: 'cooking',
        rarity: 'common',
        effect: 'Heal 5 Courage.',
        components: [
            { componentId: 'carnivorous-grouper', componentName: 'Carnivorous Grouper', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'king-salad-sandwich',
        name: 'King Salad Sandwich',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Nimbleness for the session.',
        components: [
            { componentId: 'king-runner', componentName: 'King Runner', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'liger-shark-filet',
        name: 'Liger Shark Filet',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +4 Courage for the session.',
        components: [
            { componentId: 'liger-shark-jaw', componentName: 'Liger Shark Jaw', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'magmabelly-pie',
        name: 'Magmabelly Pie',
        type: 'cooking',
        rarity: 'common',
        effect: 'Breathe fire for 1d6 Dread (plus BURNING) for 1 day.',
        components: [
            { componentId: 'magmabelly-starfish', componentName: 'Magmabelly Starfish', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'nackadinky-jumbolaya',
        name: 'Nackadinky Jumbolaya',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +5 maximum Courage for the session.',
        components: [
            { componentId: 'juvenile-crawlbad', componentName: 'Juvenile Crawlbad', quantity: 1 },
            { componentId: 'nackadinky-glittershrimp', componentName: 'Nackadinky Glittershrimp', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'roasted-frog-snapper',
        name: 'Roasted Frog Snapper',
        type: 'cooking',
        rarity: 'common',
        effect: 'Jump 10\' like a frog for the session.',
        components: [
            { componentId: 'frog-snapper', componentName: 'Frog Snapper', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'fried-piker',
        name: 'Fried Piker',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Grit for the session.',
        components: [
            { componentId: 'bogswilling-piker', componentName: 'Bogswilling Piker', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'seared-blobfish',
        name: 'Seared Blobfish',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Mettle for the session.',
        components: [
            { componentId: 'blackrill-blobfish', componentName: 'Blackrill Blobfish', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'ettin-blood-sausage',
        name: 'Ettin Blood Sausage',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Might for the session.',
        components: [
            { componentId: 'ettinsblood', componentName: 'Ettinsblood', quantity: 1 },
            { componentId: 'cankerboar-tusks', componentName: 'Cankerboar Tusks', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'kilorat-jerky',
        name: 'Kilorat Jerky',
        type: 'cooking',
        rarity: 'common',
        effect: 'Tastes disgusting but is a great long-lasting trail snack.',
        components: [
            { componentId: 'kilorat-tail', componentName: 'Kilorat Tail', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'grail-mucus-bread',
        name: 'Grail Mucus Bread',
        type: 'cooking',
        rarity: 'common',
        effect: 'Sweet bread that heals 1d4 Courage.',
        components: [
            { componentId: 'grail-tick-mucus', componentName: 'Grail Tick Mucus', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'caramelized-merga-slime',
        name: 'Caramelized Merga Slime',
        type: 'cooking',
        rarity: 'common',
        effect: 'Disgusting candy that heals 1d8 Courage.',
        components: [
            { componentId: 'merga-toad-slime', componentName: 'Merga Toad Slime', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'rootersnoop-soup',
        name: 'Rootersnoop Soup',
        type: 'cooking',
        rarity: 'common',
        effect: 'Heal 1d6 Courage.',
        components: [
            { componentId: 'rootersnoop-trunk', componentName: 'Rootersnoop Trunk', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'fiddler-string-cheese',
        name: 'Fiddler String Cheese',
        type: 'cooking',
        rarity: 'common',
        effect: 'Light snack that tastes like music.',
        components: [
            { componentId: 'pocket-fiddler-silk', componentName: 'Pocket Fiddler Silk', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'zozo-omelet',
        name: 'Zozo Omelet',
        type: 'cooking',
        rarity: 'common',
        effect: 'Huge omelet that feeds 4 people and heals 1d8 Courage.',
        components: [
            { componentId: 'zozo-bird-egg', componentName: 'Zozo Bird Egg', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'serpent-on-a-stick',
        name: 'Serpent On A Stick',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Inspire for the session.',
        components: [
            { componentId: 'silt-serpent-skin', componentName: 'Silt Serpent Skin', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'roasted-skeeter-surprise',
        name: 'Roasted Skeeter Surprise',
        type: 'cooking',
        rarity: 'common',
        effect: 'Crunchy snack that heals 1d4 Courage.',
        components: [
            { componentId: 'skeeter-needle', componentName: 'Skeeter Needle', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'morb-salad',
        name: 'Morb Salad',
        type: 'cooking',
        rarity: 'common',
        effect: 'Fresh vegetable salad. Heal 1d6 Courage.',
        components: [
            { componentId: 'morb-bark', componentName: 'Morb Bark', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'nackadonkee-gumbo',
        name: 'Nackadonkee Gumbo',
        type: 'cooking',
        rarity: 'common',
        effect: 'Spicy gumbo. Gain +2 Courage for the session.',
        components: [
            { componentId: 'nackadonkee-reaver', componentName: 'Nackadonkee Reaver', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'quagdad-eggs',
        name: 'Quagdad Eggs',
        type: 'cooking',
        rarity: 'common',
        effect: 'Boiled eggs that heal 1d6 Courage.',
        components: [
            { componentId: 'quagdad', componentName: 'Quagdad', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'snapjack-patties',
        name: 'Snapjack Patties',
        type: 'cooking',
        rarity: 'common',
        effect: 'Fish patties. Heal 1d8 Courage.',
        components: [
            { componentId: 'snapjack', componentName: 'Snapjack', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'bogflower-tea',
        name: 'Bogflower Tea',
        type: 'cooking',
        rarity: 'common',
        effect: 'Wake up feeling refreshed. Heal 1d6 Courage.',
        components: [
            { componentId: 'bogflower', componentName: 'Bogflower', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'dragon-spice-donut',
        name: 'Dragon Spice Donut',
        type: 'cooking',
        rarity: 'common',
        effect: 'Spicy and delicious. Gain +1 to one Stat for the session.',
        components: [
            { componentId: 'dragon-lily', componentName: 'Dragon Lily', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'dreamwake-tea',
        name: 'Dreamwake Tea',
        type: 'cooking',
        rarity: 'common',
        effect: 'Grants vivid dreams. +1 Realms for the session.',
        components: [
            { componentId: 'dreamwake', componentName: 'Dreamwake', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'dweorg-cheese',
        name: 'Dweorg Cheese',
        type: 'cooking',
        rarity: 'common',
        effect: 'Pungent cheese. Gain +1 Grit for the session.',
        components: [
            { componentId: 'dweorgbane', componentName: 'Dweorgbane', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'elder-root-beer',
        name: 'Elder Root Beer',
        type: 'cooking',
        rarity: 'common',
        effect: 'Refreshing beverage. Heal 1d8 Courage.',
        components: [
            { componentId: 'elder-root', componentName: 'Elder Root', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'dried-warbler-sticks',
        name: 'Dried Warbler Sticks',
        type: 'cooking',
        rarity: 'common',
        effect: 'Jerky-like snack. Long-lasting trail rations.',
        components: [
            { componentId: 'man-eating-warbler', componentName: 'Man-Eating Warbler', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'growler-goulash',
        name: 'Growler Goulash',
        type: 'cooking',
        rarity: 'common',
        effect: 'Hearty stew. Heal 1d10 Courage.',
        components: [
            { componentId: 'hatchet-toothed-growler', componentName: 'Hatchet Toothed Growler', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'lilyfish-sandwich',
        name: 'Lilyfish Sandwich',
        type: 'cooking',
        rarity: 'common',
        effect: 'Delicate and fragrant. Heal 1d6 Courage.',
        components: [
            { componentId: 'spotted-lilyfish', componentName: 'Spotted Lilyfish', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'liverjack-fritter',
        name: 'Liverjack Fritter',
        type: 'cooking',
        rarity: 'common',
        effect: 'Tastes fried even when not. Heal 1d8 Courage.',
        components: [
            { componentId: 'salty-liverjack', componentName: 'Salty Liverjack', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'marbled-casserole',
        name: 'Marbled Casserole',
        type: 'cooking',
        rarity: 'common',
        effect: 'Feeds 4 people. Heal 2d6 Courage.',
        components: [
            { componentId: 'marbled-leaper', componentName: 'Marbled Leaper', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'mountain-stout',
        name: 'Mountain Stout',
        type: 'cooking',
        rarity: 'common',
        effect: 'Strong ale. Gain +1 Mettle for the session.',
        components: [
            { componentId: 'mountain-hermit', componentName: 'Mountain Hermit', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'norga-juice',
        name: 'Norga Juice',
        type: 'cooking',
        rarity: 'common',
        effect: 'Makes you sleepy. Heal 2d6 Courage but become drowsy.',
        components: [
            { componentId: 'sleeping-norga', componentName: 'Sleeping Norga', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'reckon-brew',
        name: 'Reckon Brew',
        type: 'cooking',
        rarity: 'common',
        effect: 'Clarity-granting tea. Gain +1 Perceiving for the session.',
        components: [
            { componentId: 'reckonholly', componentName: 'Reckonholly', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'screaming-chili',
        name: 'Screaming Chili',
        type: 'cooking',
        rarity: 'common',
        effect: 'Incredibly spicy. Breathe fire for 1d4 Dread for 1 hour.',
        components: [
            { componentId: 'sandscreamer', componentName: 'Sandscreamer', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'throng-pep-tea',
        name: 'Throng Pep Tea',
        type: 'cooking',
        rarity: 'common',
        effect: 'Energizing brew. Gain +1 Speed for the session.',
        components: [
            { componentId: 'throngweed', componentName: 'Throngweed', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'waterweevil-surprise',
        name: 'Waterweevil Surprise',
        type: 'cooking',
        rarity: 'common',
        effect: 'Crunchy and green. Gain +1 Nimbleness for the session.',
        components: [
            { componentId: 'verdant-waterweevil', componentName: 'Verdant Waterweevil', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'wharf-rambler-kabob',
        name: 'Wharf Rambler Kabob',
        type: 'cooking',
        rarity: 'common',
        effect: 'Grilled fish kabob. Heal 1d10 Courage.',
        components: [
            { componentId: 'wharf-rambler', componentName: 'Wharf Rambler', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'kitchen-sink-noodles',
        name: 'Kitchen Sink Noodles',
        type: 'cooking',
        rarity: 'common',
        effect: 'Heal 3 Courage.',
        components: [
            { componentId: 'sinkworm-tallow', componentName: 'Sinkworm Tallow', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'slipperbeak-gumbo',
        name: 'Slipperbeak Gumbo',
        type: 'cooking',
        rarity: 'common',
        effect: 'Cures BLINDED.',
        components: [
            { componentId: 'slipperbeak', componentName: 'Slipperbeak', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    },
    {
        id: 'filleted-gentleman',
        name: 'Filleted Gentleman',
        type: 'cooking',
        rarity: 'common',
        effect: 'Gain +1 Charm for the session.',
        components: [
            { componentId: 'whiskered-gentleman', componentName: 'Whiskered Gentleman', quantity: 1 }
        ],
        craftingTime: '1 Hour',
        requiresForge: false
    }
];

// Crafting Recipes (Phase 1: 15 most useful)
export const craftingRecipes: Recipe[] = [
    {
        id: 'adventurers-cape',
        name: 'Adventurer\'s Cape',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every session, gain Advantage on an Inspire Check.',
        components: [
            { componentId: 'jackalrabbit-fur', componentName: 'Jackalrabbit Fur', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'angler-arrows',
        name: 'Angler Arrows',
        type: 'crafting',
        rarity: 'common',
        effect: 'Usage Die: 1d20. +1 Attack with bows.',
        components: [
            { componentId: 'arrowhead-angler', componentName: 'Arrowhead Angler', quantity: 1 }
        ],
        materialsRequired: 2,
        itemCost: 'copper',
        itemSlots: 1,
        craftingTime: '1d6 Hours',
        requiresForge: false
    },
    {
        id: 'batweave-cloak',
        name: 'Batweave Cloak',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Wearer appears almost invisible in darkness, gaining Advantage on Sneak Checks in such conditions.',
        components: [
            { componentId: 'muckland-bat-wing', componentName: 'Muckland Bat Wing', quantity: 1 },
            { componentId: 'wolf-pelt', componentName: 'Wolf Pelt', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent']
    },
    {
        id: 'bogril-bone-shield',
        name: 'Bogril Bone Shield',
        type: 'crafting',
        rarity: 'common',
        effect: 'Large Shield. +1 Block',
        components: [
            { componentId: 'used-tbe-tiger-bones', componentName: 'Used T\'Be Tiger Bones', quantity: 1 },
            { componentId: 'bogril-tortoise-shell', componentName: 'Bogril Tortoise Shell', quantity: 1 }
        ],
        materialsRequired: 9,
        itemCost: 'silver',
        itemSlots: 3,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'bugbear-greatsword',
        name: 'Bugbear Greatsword',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every Combat, on a Counterattack Hit, disarm the target\'s weapon.',
        components: [
            { componentId: 'koogra-claw', componentName: 'Koogra Claw', quantity: 1 },
            { componentId: 'bugbear-metal', componentName: 'Bugbear Metal', quantity: 1 }
        ],
        materialsRequired: 9,
        itemCost: 'silver',
        itemSlots: 3,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['cleave']
    },
    {
        id: 'crag-scale-boots',
        name: 'Crag Scale Boots',
        type: 'crafting',
        rarity: 'common',
        effect: 'Piecemeal Armor. +1 Block',
        components: [
            { componentId: 'crag-lizard-scales', componentName: 'Crag Lizard Scales', quantity: 1 },
            { componentId: 'mountain-tooth', componentName: 'Mountain Tooth', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['grim']
    },
    {
        id: 'flying-fang-daggers',
        name: 'Flying Fang Daggers',
        type: 'crafting',
        rarity: 'rare',
        effect: '5 Daggers. Ranged weapon, undetectable when hidden on PC. 0 Slot items.',
        components: [
            { componentId: 'ryzophant-fang', componentName: 'Ryzophant Fang', quantity: 1 },
            { componentId: 'ur-steel', componentName: 'Ur Steel', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 0,
        craftingTime: '1d6 Days',
        requiresForge: true,
        properties: ['Magnificent', 'cold steel']
    },
    {
        id: 'gatorbird-sickles',
        name: 'Gatorbird Sickles',
        type: 'crafting',
        rarity: 'common',
        effect: '+1 Dread when dual wielded.',
        components: [
            { componentId: 'bunglewood', componentName: 'Bunglewood', quantity: 1 },
            { componentId: 'owligator-talon', componentName: 'Owligator Talon', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['trip']
    },
    {
        id: 'helm-of-great-stag',
        name: 'Helm of the Great Stag',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Piecemeal Armor. Intimidate Check: Each session, pacify a hostile critter.',
        components: [
            { componentId: 'great-stag-antler', componentName: 'Great Stag Antler', quantity: 1 },
            { componentId: 'adamant', componentName: 'Adamant', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent', 'sturdy']
    },
    {
        id: 'hookclaw-mancatcher',
        name: 'Hookclaw Mancatcher',
        type: 'crafting',
        rarity: 'rare',
        effect: '[entangle] Once every Combat, on a 6+ Hit, Entangle a large or smaller target.',
        components: [
            { componentId: 'crawlbad-claw', componentName: 'Crawlbad Claw', quantity: 1 },
            { componentId: 'huxwood', componentName: 'Huxwood', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 2,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent', 'entangle', 'true']
    },
    {
        id: 'magnificent-swimming-pantaloons',
        name: 'Magnificent Swimming Pantaloons',
        type: 'crafting',
        rarity: 'common',
        effect: 'Gain Proficiency in Swimming while worn.',
        components: [
            { componentId: 'hippogruff-hide', componentName: 'Hippogruff Hide', quantity: 1 },
            { componentId: 'rindle-ram-fin', componentName: 'Rindle Ram Fin', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent']
    },
    {
        id: 'ranger-boots',
        name: 'Ranger Boots',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every session, gain Advantage on a Sneak Check.',
        components: [
            { componentId: 'thornhawk-feathers', componentName: 'Thornhawk Feathers', quantity: 1 },
            { componentId: 'wungalope-fur', componentName: 'Wungalope Fur', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'razorfin-rapier',
        name: 'Razorfin Rapier',
        type: 'crafting',
        rarity: 'common',
        effect: '[quick] Once every Combat, disarm a Goon.',
        components: [
            { componentId: 'dancing-razorfin', componentName: 'Dancing Razorfin', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['quick']
    },
    {
        id: 'thieves-tools',
        name: 'Thieves\' Tools',
        type: 'crafting',
        rarity: 'common',
        effect: '+1 when picking locks.',
        components: [
            { componentId: 'quillrat-needles', componentName: 'Quillrat Needles', quantity: 1 },
            { componentId: 'greyglitter-ore', componentName: 'Greyglitter Ore', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['hardy']
    },
    {
        id: 'welkin-armor',
        name: 'Welkin Armor',
        type: 'crafting',
        rarity: 'common',
        effect: 'Medium Armor. 0 Slots',
        components: [
            { componentId: 'featherflint', componentName: 'Featherflint', quantity: 1 },
            { componentId: 'gulliath-feathers', componentName: 'Gulliath Feathers', quantity: 1 }
        ],
        materialsRequired: 12,
        itemCost: 'silver',
        itemSlots: 0,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['light', 'nimble']
    },
    {
        id: 'koogra-axe',
        name: 'Koogra Axe',
        type: 'crafting',
        rarity: 'common',
        effect: '[beastly] On a 6+ Hit, frighten critters and gain Advantage on further Attacks against them.',
        components: [
            { componentId: 'koogra-claw', componentName: 'Koogra Claw', quantity: 1 },
            { componentId: 'garganite-chip', componentName: 'Garganite Chip', quantity: 1 }
        ],
        materialsRequired: 9,
        itemCost: 'silver',
        itemSlots: 3,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['beastly', 'repellent']
    },
    {
        id: 'tiger-bone-shield',
        name: 'Tiger Bone Shield',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Large Shield. +2 Block',
        components: [
            { componentId: 'used-tbe-tiger-bones', componentName: 'Used T\'Be Tiger Bones', quantity: 1 },
            { componentId: 'felmog-iron', componentName: 'Felmog Iron', quantity: 1 }
        ],
        materialsRequired: 9,
        itemCost: 'gold',
        itemSlots: 3,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent', 'exceptional']
    },
    {
        id: 'yowljack-bow',
        name: 'Yowljack Bow',
        type: 'crafting',
        rarity: 'common',
        effect: 'Ranged weapon. +1 Attack.',
        components: [
            { componentId: 'ironwold-root', componentName: 'Ironwold Root', quantity: 1 },
            { componentId: 'owligator-talon', componentName: 'Owligator Talon', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['accurate']
    },
    {
        id: 'serpentsilk-tunic',
        name: 'Serpentsilk Tunic',
        type: 'crafting',
        rarity: 'common',
        effect: 'Light Armor. +1 Block',
        components: [
            { componentId: 'pocket-fiddler-silk', componentName: 'Pocket Fiddler Silk', quantity: 1 },
            { componentId: 'silt-serpent-skin', componentName: 'Silt Serpent Skin', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'spiked-boots',
        name: 'Spiked Boots',
        type: 'crafting',
        rarity: 'common',
        effect: 'Piecemeal Armor. Kick attack: 1d6 Dread.',
        components: [
            { componentId: 'gelk-hide', componentName: 'Gelk Hide', quantity: 1 },
            { componentId: 'slurpworm-teeth', componentName: 'Slurpworm Teeth', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['entangle']
    },
    {
        id: 'wooly-armor',
        name: 'Wooly Armor',
        type: 'crafting',
        rarity: 'common',
        effect: 'Light Armor. Withstand extreme cold.',
        components: [
            { componentId: 'hippogruff-hide', componentName: 'Hippogruff Hide', quantity: 1 },
            { componentId: 'wungalope-fur', componentName: 'Wungalope Fur', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'swiftstrike-gloves',
        name: 'Swiftstrike Gloves',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every Combat, attack twice in one round.',
        components: [
            { componentId: 'jackalrabbit-fur', componentName: 'Jackalrabbit Fur', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'reptilian-leggings',
        name: 'Reptilian Leggings',
        type: 'crafting',
        rarity: 'common',
        effect: 'Piecemeal Armor. +1 Block',
        components: [
            { componentId: 'crag-lizard-scales', componentName: 'Crag Lizard Scales', quantity: 1 },
            { componentId: 'silt-serpent-skin', componentName: 'Silt Serpent Skin', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'troll-armor',
        name: 'Troll Armor',
        type: 'crafting',
        rarity: 'common',
        effect: 'Medium Armor. Heal 1 Courage at the start of each Combat.',
        components: [
            { componentId: 'morb-bark', componentName: 'Morb Bark', quantity: 1 },
            { componentId: 'troll-bark', componentName: 'Troll Bark', quantity: 1 },
            { componentId: 'sunderslab-fragment', componentName: 'Sunderslab Fragment', quantity: 1 }
        ],
        materialsRequired: 12,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['bonk']
    },
    {
        id: 'outriders-cloak',
        name: 'Outrider\'s Cloak',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every session, gain Advantage on a Travel Check.',
        components: [
            { componentId: 'blackburr', componentName: 'Blackburr', quantity: 1 },
            { componentId: 'wolf-pelt', componentName: 'Wolf Pelt', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'canker-spear',
        name: 'Canker Spear',
        type: 'crafting',
        rarity: 'common',
        effect: 'Spear. Ranged or melee weapon.',
        components: [
            { componentId: 'cankerboar-tusks', componentName: 'Cankerboar Tusks', quantity: 1 },
            { componentId: 'huxwood', componentName: 'Huxwood', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['true']
    },
    {
        id: 'orch-iron-halberd',
        name: 'Orch Iron Halberd',
        type: 'crafting',
        rarity: 'common',
        effect: '[slash] +2 Dread.',
        components: [
            { componentId: 'orch-iron', componentName: 'Orch Iron', quantity: 1 },
            { componentId: 'krowl-beak', componentName: 'Krowl Beak', quantity: 1 }
        ],
        materialsRequired: 9,
        itemCost: 'silver',
        itemSlots: 3,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['slash']
    },
    {
        id: 'wingspan-cloak',
        name: 'Wingspan Cloak',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Glide safely to the ground from any height.',
        components: [
            { componentId: 'muckland-bat-wing', componentName: 'Muckland Bat Wing', quantity: 1 },
            { componentId: 'thornhawk-feathers', componentName: 'Thornhawk Feathers', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent']
    },
    {
        id: 'pocket-bow',
        name: 'Pocket Bow',
        type: 'crafting',
        rarity: 'common',
        effect: 'Small ranged weapon. 0 Slots',
        components: [
            { componentId: 'bunglewood', componentName: 'Bunglewood', quantity: 1 },
            { componentId: 'pocket-fiddler-silk', componentName: 'Pocket Fiddler Silk', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 0,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['trip']
    },
    {
        id: 'crimsonhook-caltrops',
        name: 'Crimsonhook Caltrops',
        type: 'crafting',
        rarity: 'common',
        effect: 'Usage Die: 1d6. Scatter on ground to damage and slow pursuers.',
        components: [
            { componentId: 'crimsonhook', componentName: 'Crimsonhook', quantity: 1 },
            { componentId: 'glassbeam', componentName: 'Glassbeam', quantity: 1 }
        ],
        materialsRequired: 2,
        itemCost: 'copper',
        itemSlots: 1,
        craftingTime: '1d6 Hours',
        requiresForge: false,
        properties: ['mirrored']
    },
    {
        id: 'dazzling-silver-ring',
        name: 'Dazzling Silver Ring',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every session, gain Advantage on an Inspire Check.',
        components: [
            { componentId: 'dwimmersteel', componentName: 'Dwimmersteel', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 0,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['trusty']
    },
    {
        id: 'deep-quag-devil-armor',
        name: 'Deep Quag Devil Armor',
        type: 'crafting',
        rarity: 'common',
        effect: 'Medium Armor. Breathe underwater for 1 hour per day.',
        components: [
            { componentId: 'deep-quag-devil', componentName: 'Deep Quag Devil', quantity: 1 }
        ],
        materialsRequired: 12,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'dozing-arrow',
        name: 'Dozing Arrow',
        type: 'crafting',
        rarity: 'common',
        effect: 'Usage Die: 1d8. Target hit must save or fall asleep.',
        components: [
            { componentId: 'skeeter-needle', componentName: 'Skeeter Needle', quantity: 1 },
            { componentId: 'whiteflame', componentName: 'Whiteflame', quantity: 1 }
        ],
        materialsRequired: 2,
        itemCost: 'copper',
        itemSlots: 1,
        craftingTime: '1d6 Hours',
        requiresForge: false
    },
    {
        id: 'dwimmerscale-shield',
        name: 'Dwimmerscale Shield',
        type: 'crafting',
        rarity: 'common',
        effect: 'Medium Shield. +1 Block, shimmers with magical light.',
        components: [
            { componentId: 'dwimmerscale-shad', componentName: 'Dwimmerscale Shad', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'garish-amulet',
        name: 'Garish Amulet',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every session, frighten enemies with gaudy display.',
        components: [
            { componentId: 'bandy-clam-pearl', componentName: 'Bandy Clam Pearl', quantity: 1 },
            { componentId: 'goblin-alloy', componentName: 'Goblin Alloy', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 0,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['quick']
    },
    {
        id: 'glittering-gold-ring',
        name: 'Glittering Gold Ring',
        type: 'crafting',
        rarity: 'common',
        effect: 'Worth 5 Gold Coins. Can be sold or worn for +1 Inspire.',
        components: [
            { componentId: 'gold-ore', componentName: 'Gold Ore', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'gold',
        itemSlots: 0,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['precious']
    },
    {
        id: 'glowing-tool',
        name: 'Glowing Tool',
        type: 'crafting',
        rarity: 'common',
        effect: 'Tool that glows bright green, illuminating Near area.',
        components: [
            { componentId: 'glowing-toad-shrimp', componentName: 'Glowing Toad Shrimp', quantity: 1 }
        ],
        materialsRequired: 2,
        itemCost: 'copper',
        itemSlots: 1,
        craftingTime: '1d6 Hours',
        requiresForge: false
    },
    {
        id: 'highborn-pendant',
        name: 'Highborn Pendant',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once every session, gain Advantage on a social Check.',
        components: [
            { componentId: 'gold-ore', componentName: 'Gold Ore', quantity: 1 },
            { componentId: 'greyglitter-ore', componentName: 'Greyglitter Ore', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'gold',
        itemSlots: 0,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['hardy', 'precious']
    },
    {
        id: 'kaleidoscorpion-flail',
        name: 'Kaleidoscorpion Flail',
        type: 'crafting',
        rarity: 'common',
        effect: 'Weapon. Color-shifting, hypnotic patterns disorient foes.',
        components: [
            { componentId: 'kaleidoscorpion-tail', componentName: 'Kaleidoscorpion Tail', quantity: 1 },
            { componentId: 'dunhamite-chip', componentName: 'Dunhamite Chip', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['stalwart']
    },
    {
        id: 'liger-shark-helm',
        name: 'Liger Shark Helm',
        type: 'crafting',
        rarity: 'common',
        effect: 'Piecemeal Armor. Intimidate land and sea creatures.',
        components: [
            { componentId: 'liger-shark-jaw', componentName: 'Liger Shark Jaw', quantity: 1 },
            { componentId: 'goblin-alloy', componentName: 'Goblin Alloy', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['quick']
    },
    {
        id: 'lucky-sharktooth-necklace',
        name: 'Lucky Sharktooth Necklace',
        type: 'crafting',
        rarity: 'common',
        effect: 'Once per session, reroll a failed Check.',
        components: [
            { componentId: 'liger-shark-jaw', componentName: 'Liger Shark Jaw', quantity: 1 }
        ],
        materialsRequired: 2,
        itemCost: 'copper',
        itemSlots: 0,
        craftingTime: '1d6 Hours',
        requiresForge: false
    },
    {
        id: 'magnificent-climbing-gloves',
        name: 'Magnificent Climbing Gloves',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Climb any surface. Gain Proficiency in Climbing.',
        components: [
            { componentId: 'keestersnap-pincers', componentName: 'Keestersnap Pincers', quantity: 1 },
            { componentId: 'creep-thistle', componentName: 'Creep Thistle', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent']
    },
    {
        id: 'magnificent-fishing-rod',
        name: 'Magnificent Fishing Rod',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Gain Advantage on Fishing Checks. Can catch Huge fish.',
        components: [
            { componentId: 'quagbirch', componentName: 'Quagbirch', quantity: 1 },
            { componentId: 'sticky-wickle-vines', componentName: 'Sticky Wickle Vines', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 2,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent', 'trip']
    },
    {
        id: 'prickly-leather-bracers',
        name: 'Prickly Leather Bracers',
        type: 'crafting',
        rarity: 'common',
        effect: 'Piecemeal Armor. Unarmed attacks deal +1 Dread.',
        components: [
            { componentId: 'stickercloud', componentName: 'Stickercloud', quantity: 1 },
            { componentId: 'skeeter-needle', componentName: 'Skeeter Needle', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'ramgore-hammer',
        name: 'Ramgore Hammer',
        type: 'crafting',
        rarity: 'rare',
        effect: '[bonk] Once every Combat, a Hit target becomes Stunned.',
        components: [
            { componentId: 'ramgore-horns', componentName: 'Ramgore Horns', quantity: 1 },
            { componentId: 'cumberstone', componentName: 'Cumberstone', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 3,
        craftingTime: '1d6 Days',
        requiresForge: true,
        properties: ['Magnificent', 'bonk', 'hefty']
    },
    {
        id: 'rubbery-morb-shield',
        name: 'Rubbery Morb Shield',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Large Shield. Inflict Blocked Dread back to the attacker.',
        components: [
            { componentId: 'morb-bark', componentName: 'Morb Bark', quantity: 1 },
            { componentId: 'sinkworm-tallow', componentName: 'Sinkworm Tallow', quantity: 1 }
        ],
        materialsRequired: 9,
        itemCost: 'gold',
        itemSlots: 3,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent']
    },
    {
        id: 'sharpfin-armor',
        name: 'Sharpfin Armor',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Medium Armor. Attackers suffer 1 Dread when they Hit the wearer (ignores Block).',
        components: [
            { componentId: 'emerald-sharpfin', componentName: 'Emerald Sharpfin', quantity: 1 }
        ],
        materialsRequired: 12,
        itemCost: 'gold',
        itemSlots: 2,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent']
    },
    {
        id: 'snagtooth-shiv',
        name: 'Snagtooth Shiv',
        type: 'crafting',
        rarity: 'common',
        effect: '[bleed] Causes bleeding on hit.',
        components: [
            { componentId: 'snagbunny-tooth', componentName: 'Snagbunny Tooth', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['bleed']
    },
    {
        id: 'spongey-bandages',
        name: 'Spongey Bandages',
        type: 'crafting',
        rarity: 'common',
        effect: 'Cures Bleeding and heals 1d4 Courage.',
        components: [
            { componentId: 'muckroot', componentName: 'Muckroot', quantity: 1 },
            { componentId: 'spongey-wheeler', componentName: 'Spongey Wheeler', quantity: 1 }
        ],
        materialsRequired: 2,
        itemCost: 'copper',
        itemSlots: 1,
        craftingTime: '1d6 Hours',
        requiresForge: false
    },
    {
        id: 'spiraled-main-gauche',
        name: 'Spiraled Main Gauche',
        type: 'crafting',
        rarity: 'common',
        effect: '[parry] +1 Block.',
        components: [
            { componentId: 'guardvark-bones', componentName: 'Guardvark Bones', quantity: 1 },
            { componentId: 'narsquall', componentName: 'Narsquall', quantity: 1 }
        ],
        materialsRequired: 6,
        itemCost: 'silver',
        itemSlots: 2,
        craftingTime: '6+1d6 Hours',
        requiresForge: true,
        properties: ['parry']
    },
    {
        id: 'stabby-needle',
        name: 'Stabby Needle',
        type: 'crafting',
        rarity: 'common',
        effect: '+1 Dread. Once every Combat, a Rascal gains Advantage on an Attack.',
        components: [
            { componentId: 'quillrat-needles', componentName: 'Quillrat Needles', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'starfell-spyglass',
        name: 'Starfell Spyglass',
        type: 'crafting',
        rarity: 'rare',
        effect: 'See objects in detail up to a mile away. Gain Advantage on Search Checks to see hidden Adversaries.',
        components: [
            { componentId: 'starfell-shard', componentName: 'Starfell Shard', quantity: 1 },
            { componentId: 'glassbeam', componentName: 'Glassbeam', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent', 'starfell-make', 'mirrored']
    },
    {
        id: 'sticker-snare',
        name: 'Sticker Snare',
        type: 'crafting',
        rarity: 'common',
        effect: 'Trap that Entangles the target. Small Adversaries suffer Disadvantage to escaping.',
        components: [
            { componentId: 'sticky-wickle-vines', componentName: 'Sticky Wickle Vines', quantity: 1 },
            { componentId: 'goblin-alloy', componentName: 'Goblin Alloy', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['quick', 'trip']
    },
    {
        id: 'thunderhorn-pauldrons',
        name: 'Thunderhorn Pauldrons',
        type: 'crafting',
        rarity: 'rare',
        effect: 'Piecemeal Armor. Attackers suffer 1 Dread when they Hit the wearer (ignores Block).',
        components: [
            { componentId: 'thunderhorn-horn', componentName: 'Thunderhorn Horn', quantity: 1 },
            { componentId: 'bugbear-metal', componentName: 'Bugbear Metal', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: true,
        properties: ['Magnificent', 'cleave']
    },
    {
        id: 'wire-worm-saw',
        name: 'Wire Worm Saw',
        type: 'crafting',
        rarity: 'common',
        effect: 'Saw through objects as tough as stone or steel.',
        components: [
            { componentId: 'wire-worm', componentName: 'Wire Worm', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false
    },
    {
        id: 'wyrmfish-scale-pauldrons',
        name: 'Wyrmfish Scale Pauldrons',
        type: 'crafting',
        rarity: 'common',
        effect: 'Piecemeal Armor. [repellent]',
        components: [
            { componentId: 'wyrmfish', componentName: 'Wyrmfish', quantity: 1 },
            { componentId: 'gelk-hide', componentName: 'Gelk Hide', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['repellent', 'entangle']
    },
    {
        id: 'wyrmtail-rope',
        name: 'Wyrmtail Rope',
        type: 'crafting',
        rarity: 'common',
        effect: '[superb] 100 feet of rope. 1 Slot.',
        components: [
            { componentId: 'wyrmtail-vine', componentName: 'Wyrmtail Vine', quantity: 1 },
            { componentId: 'elder-root', componentName: 'Elder Root', quantity: 1 }
        ],
        materialsRequired: 3,
        itemCost: 'silver',
        itemSlots: 1,
        craftingTime: '6+1d6 Hours',
        requiresForge: false,
        properties: ['superb']
    },
    {
        id: 'magnificent-string-instrument',
        name: 'Magnificent String Instrument',
        type: 'crafting',
        rarity: 'rare',
        effect: 'In the hands of a Bard, Invigorate heals +1 Courage.',
        components: [
            { componentId: 'pocket-fiddler-silk', componentName: 'Pocket Fiddler Silk', quantity: 1 },
            { componentId: 'wurlwood', componentName: 'Wurlwood', quantity: 1 }
        ],
        materialsRequired: 5,
        itemCost: 'gold',
        itemSlots: 1,
        craftingTime: '1d6 Days',
        requiresForge: false,
        properties: ['Magnificent', 'reach']
    }
];

export const allRecipes: Recipe[] = [
    ...alchemyRecipes,
    ...cookingRecipes,
    ...craftingRecipes
];
