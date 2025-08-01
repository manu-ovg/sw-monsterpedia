// Real data from the GitHub repository
import bestiaryData from './bestiary.json';
import monstersData from './monsters.json';

export interface BestiaryMonster {
  url: string;
  com2us_id: number;
  name: string;
  element: string;
  archetype: string;
  base_stars: number;
  natural_stars: number;
  fusion_food: boolean;
  image_url: string;
}

export interface MonsterSkill {
  skill_id: number;
  name: string;
}

export interface MonsterData {
  name: string;
  id: number;
  skills: {
    skill_1?: MonsterSkill;
    skill_2?: MonsterSkill;
    skill_3?: MonsterSkill;
    skill_4?: MonsterSkill;
  };
}

// Import real data
export const realBestiary: BestiaryMonster[] = bestiaryData;
export const realMonsters: MonsterData[] = monstersData;

// Helper function to match monsters between the two datasets
export const getMonsterWithSkills = (bestiaryMonster: BestiaryMonster): MonsterData | null => {
  return realMonsters.find(monster => monster.id === bestiaryMonster.com2us_id) || null;
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
    case 6: return 'text-monster-legendary';
    case 5: return 'text-monster-legendary';
    case 4: return 'text-monster-epic';
    case 3: return 'text-monster-rare';
    default: return 'text-foreground';
  }
};

// Helper function to get skills as array from monster data
export const getSkillsArray = (monsterData: MonsterData): MonsterSkill[] => {
  const skills: MonsterSkill[] = [];
  if (monsterData.skills.skill_1) skills.push(monsterData.skills.skill_1);
  if (monsterData.skills.skill_2) skills.push(monsterData.skills.skill_2);
  if (monsterData.skills.skill_3) skills.push(monsterData.skills.skill_3);
  if (monsterData.skills.skill_4) skills.push(monsterData.skills.skill_4);
  return skills;
};