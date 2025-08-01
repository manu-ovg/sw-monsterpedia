// Sample data to demonstrate the bestiary functionality
// Replace this with actual JSON file imports when available

export interface BestiaryMonster {
  com2us_id: number;
  name: string;
  element?: string;
  type?: string;
  stars?: number;
}

export interface MonsterSkill {
  skill_id: number;
  name: string;
  description?: string;
  type?: string;
}

export interface MonsterData {
  id: number;
  name: string;
  skills: MonsterSkill[];
}

// Sample bestiary data
export const sampleBestiary: BestiaryMonster[] = [
  {
    com2us_id: 22211,
    name: "Fire Dragon Knight",
    element: "Fire",
    type: "Attack",
    stars: 5
  },
  {
    com2us_id: 19513,
    name: "Water Phoenix",
    element: "Water", 
    type: "HP",
    stars: 5
  },
  {
    com2us_id: 14414,
    name: "Wind Unicorn",
    element: "Wind",
    type: "Support",
    stars: 5
  },
  {
    com2us_id: 15523,
    name: "Light Archangel",
    element: "Light",
    type: "Support",
    stars: 5
  },
  {
    com2us_id: 13312,
    name: "Dark Vampire Lord",
    element: "Dark",
    type: "Attack",
    stars: 5
  },
  {
    com2us_id: 11234,
    name: "Fire Ifrit",
    element: "Fire",
    type: "Attack",
    stars: 5
  }
];

// Sample monsters data with skills
export const sampleMonsters: MonsterData[] = [
  {
    id: 22211, // Matches com2us_id
    name: "Fire Dragon Knight",
    skills: [
      { skill_id: 1001, name: "Flame Strike", description: "Attacks with blazing sword", type: "Attack" },
      { skill_id: 1002, name: "Dragon's Fury", description: "Unleashes draconic rage", type: "Buff" },
      { skill_id: 1003, name: "Inferno Breath", description: "Breathes devastating fire", type: "AOE" },
      { skill_id: 1004, name: "Phoenix Rising", description: "Ultimate fire transformation", type: "Ultimate" }
    ]
  },
  {
    id: 19513,
    name: "Water Phoenix",
    skills: [
      { skill_id: 2001, name: "Tidal Wave", description: "Crushing wave attack", type: "Attack" },
      { skill_id: 2002, name: "Aqua Shield", description: "Water barrier protection", type: "Defense" },
      { skill_id: 2003, name: "Tsunami", description: "Massive water devastation", type: "AOE" }
    ]
  },
  {
    id: 14414,
    name: "Wind Unicorn",
    skills: [
      { skill_id: 3001, name: "Gale Horn", description: "Swift wind attack", type: "Attack" },
      { skill_id: 3002, name: "Healing Breeze", description: "Restorative wind magic", type: "Heal" },
      { skill_id: 3003, name: "Tornado", description: "Devastating whirlwind", type: "AOE" },
      { skill_id: 3004, name: "Storm Lord", description: "Master of all winds", type: "Ultimate" }
    ]
  },
  {
    id: 15523,
    name: "Light Archangel",
    skills: [
      { skill_id: 4001, name: "Divine Strike", description: "Holy light attack", type: "Attack" },
      { skill_id: 4002, name: "Blessing", description: "Divine protection", type: "Buff" },
      { skill_id: 4003, name: "Sacred Light", description: "Purifying radiance", type: "Heal" }
    ]
  },
  {
    id: 13312,
    name: "Dark Vampire Lord",
    skills: [
      { skill_id: 5001, name: "Blood Drain", description: "Life-stealing attack", type: "Attack" },
      { skill_id: 5002, name: "Shadow Cloak", description: "Dark stealth ability", type: "Buff" },
      { skill_id: 5003, name: "Crimson Storm", description: "Blood magic devastation", type: "AOE" },
      { skill_id: 5004, name: "Eternal Darkness", description: "Ultimate vampire power", type: "Ultimate" }
    ]
  },
  {
    id: 11234,
    name: "Fire Ifrit",
    skills: [
      { skill_id: 6001, name: "Molten Fist", description: "Burning punch attack", type: "Attack" },
      { skill_id: 6002, name: "Flame Armor", description: "Fire protective barrier", type: "Defense" },
      { skill_id: 6003, name: "Infernal Blast", description: "Explosive fire magic", type: "AOE" }
    ]
  }
];

// Helper function to match monsters between the two datasets
export const getMonsterWithSkills = (bestiaryMonster: BestiaryMonster): MonsterData | null => {
  return sampleMonsters.find(monster => monster.id === bestiaryMonster.com2us_id) || null;
};

// Helper function to get element color
export const getElementColor = (element?: string): string => {
  switch (element?.toLowerCase()) {
    case 'fire': return 'text-red-400';
    case 'water': return 'text-blue-400';
    case 'wind': return 'text-green-400';
    case 'light': return 'text-yellow-400';
    case 'dark': return 'text-purple-400';
    default: return 'text-gray-400';
  }
};

// Helper function to get rarity color based on stars
export const getRarityColor = (stars?: number): string => {
  switch (stars) {
    case 5: return 'text-monster-legendary';
    case 4: return 'text-monster-epic';
    case 3: return 'text-monster-rare';
    default: return 'text-foreground';
  }
};