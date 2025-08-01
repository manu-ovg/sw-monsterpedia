import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MonsterCard } from "@/components/MonsterCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { realBestiary, getMonsterWithSkills } from "@/data/sampleData";
import { BookOpen, Sparkles, Filter } from "lucide-react";

export const Bestiary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // Get unique elements for filtering
  const elements = useMemo(() => {
    const uniqueElements = [...new Set(realBestiary.map(m => m.element).filter(Boolean))];
    return uniqueElements;
  }, []);

  // Filter monsters based on search term and element
  const filteredMonsters = useMemo(() => {
    return realBestiary.filter(monster => {
      const matchesSearch = searchTerm === "" || 
        monster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monster.element?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monster.archetype?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesElement = selectedElement === null || monster.element === selectedElement;

      // Also search in skills
      const monsterData = getMonsterWithSkills(monster);
      if (monsterData) {
        const skills = Object.values(monsterData.skills).filter(Boolean);
        const matchesSkills = skills.some(skill => 
          skill?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return (matchesSearch || matchesSkills) && matchesElement;
      }

      return matchesSearch && matchesElement;
    });
  }, [searchTerm, selectedElement]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--electric)/0.1),transparent_70%)]" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-electric/10 border border-electric/20 animate-glow-pulse">
                <BookOpen className="w-12 h-12 text-electric" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-electric to-primary bg-clip-text text-transparent animate-fade-in-up">
                SW Monsterpedia
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Summoners War Monster Database: Find every monster, every skill, and every ID
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-electric" />
                <span>{realBestiary.length} Monsters</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-electric" />
                <span>{elements.length} Elements</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search monsters by name, element, type, or skills..."
          />

          {/* Element Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant={selectedElement === null ? "electric" : "glow"}
              size="sm"
              onClick={() => setSelectedElement(null)}
              className="transition-all duration-200"
            >
              All Elements
            </Button>
            {elements.map(element => (
              <Button
                key={element}
                variant={selectedElement === element ? "electric" : "glow"}
                size="sm"
                onClick={() => setSelectedElement(element)}
                className="transition-all duration-200"
              >
                {element}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center">
            <Badge variant="secondary" className="px-4 py-2">
              {filteredMonsters.length} {filteredMonsters.length === 1 ? 'Monster' : 'Monsters'} Found
            </Badge>
          </div>
        </div>
      </div>

      {/* Monster Grid */}
      <div className="container mx-auto px-4 pb-16">
        {filteredMonsters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonsters.map((monster, index) => {
              const monsterData = getMonsterWithSkills(monster);
              return (
                <div 
                  key={monster.com2us_id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MonsterCard 
                    bestiaryMonster={monster}
                    monsterData={monsterData || undefined}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground">No monsters found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find the monsters you're looking for.
              </p>
              <Button 
                variant="electric" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedElement(null);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};