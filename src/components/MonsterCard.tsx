import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BestiaryMonster, MonsterData, getElementColor, getRarityColor, getSkillsArray } from "@/data/sampleData";
import { Sparkles, Zap, Shield, Heart, Swords } from "lucide-react";

interface MonsterCardProps {
  bestiaryMonster: BestiaryMonster;
  monsterData?: MonsterData;
}

const getSkillIcon = (skillType?: string) => {
  switch (skillType?.toLowerCase()) {
    case 'attack': return <Swords className="w-4 h-4" />;
    case 'defense': return <Shield className="w-4 h-4" />;
    case 'heal': return <Heart className="w-4 h-4" />;
    case 'buff': return <Sparkles className="w-4 h-4" />;
    case 'aoe': return <Zap className="w-4 h-4" />;
    case 'ultimate': return <Sparkles className="w-4 h-4 text-electric" />;
    default: return <Zap className="w-4 h-4" />;
  }
};

export const MonsterCard = ({ bestiaryMonster, monsterData }: MonsterCardProps) => {
  const elementColor = getElementColor(bestiaryMonster.element);
  const rarityColor = getRarityColor(bestiaryMonster.natural_stars);
  const skills = monsterData ? getSkillsArray(monsterData) : [];

  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:border-electric/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--electric)/0.3)] hover:-translate-y-2 animate-fade-in-up">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-electric/20 to-primary/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      <div className="relative space-y-4">
        {/* Monster Image */}
        {bestiaryMonster.image_url && (
          <div className="relative h-32 bg-gradient-to-br from-secondary/50 to-background overflow-hidden">
            <img 
              src={bestiaryMonster.image_url} 
              alt={bestiaryMonster.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>
        )}
        
        <div className="p-6 space-y-4">
        {/* Monster Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground group-hover:text-electric transition-colors duration-300">
              {bestiaryMonster.name}
            </h3>
            {bestiaryMonster.natural_stars && (
              <div className="flex items-center gap-1">
                {Array.from({ length: bestiaryMonster.natural_stars }).map((_, i) => (
                  <Sparkles key={i} className={`w-4 h-4 ${rarityColor}`} />
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {bestiaryMonster.element && (
              <Badge variant="secondary" className={`${elementColor} border-current/20 bg-current/10`}>
                {bestiaryMonster.element}
              </Badge>
            )}
            {bestiaryMonster.archetype && (
              <Badge variant="outline" className="text-muted-foreground">
                {bestiaryMonster.archetype}
              </Badge>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Skills
          </h4>
          
          {skills.length > 0 ? (
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div 
                  key={skill.skill_id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors duration-200 group/skill"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="flex-shrink-0 text-electric group-hover/skill:text-electric-glow transition-colors duration-200">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        Skill {index + 1}: {skill.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ID: {skill.skill_id}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-sm">Skills data not found</div>
              <div className="text-xs opacity-60 mt-1">
                ID: {bestiaryMonster.com2us_id}
              </div>
            </div>
           )}
        </div>
        </div>
      </div>
    </Card>
  );
};