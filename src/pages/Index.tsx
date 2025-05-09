
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Pet from "@/components/Pet";
import Dashboard from "@/components/Dashboard";
import ActionButtons from "@/components/ActionButtons";
import Header from "@/components/Header";
import { PetState, PortfolioStats, RiskLevel } from "@/types";
import { calculateRiskLevel, calculateMoodFromRisk, calculateHealthFromStats, getMockPortfolioStats, improvePortfolioStat } from "@/utils/riskCalculator";

const Index = () => {
  const [stats, setStats] = useState<PortfolioStats>(getMockPortfolioStats());
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("medium");
  const [petState, setPetState] = useState<PetState>({
    mood: "neutral",
    health: 50,
    riskLevel: "medium",
    lastFed: new Date(),
    lastPlayed: new Date(),
  });

  // Update pet state whenever stats change
  useEffect(() => {
    const mood = calculateMoodFromRisk(stats.overallRisk);
    const health = calculateHealthFromStats(stats);
    const risk = calculateRiskLevel(stats.overallRisk);
    
    setPetState(prev => ({
      ...prev,
      mood,
      health,
      riskLevel: risk
    }));
    
    setRiskLevel(risk);
  }, [stats]);

  const handleFeed = () => {
    setStats(prev => improvePortfolioStat(prev, 'diversification'));
    setPetState(prev => ({ ...prev, lastFed: new Date() }));
  };

  const handlePlay = () => {
    setStats(prev => improvePortfolioStat(prev, 'volatility'));
    setPetState(prev => ({ ...prev, lastPlayed: new Date() }));
  };

  const handleLearn = () => {
    setStats(prev => improvePortfolioStat(prev, 'liquidity'));
  };

  const handleSecure = () => {
    setStats(prev => improvePortfolioStat(prev, 'securityRating'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background">
      <Header />
      
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-6">
            <Card className="w-full bg-white/50 backdrop-blur-sm border-2 border-crypto-primary">
              <CardContent className="p-6 flex justify-center">
                <Pet 
                  mood={petState.mood}
                  health={petState.health}
                  riskLevel={petState.riskLevel}
                />
              </CardContent>
            </Card>
            
            <Card className="w-full">
              <CardContent className="p-6">
                <ActionButtons 
                  onFeed={handleFeed}
                  onPlay={handlePlay}
                  onLearn={handleLearn}
                  onSecure={handleSecure}
                  stats={stats}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Dashboard stats={stats} riskLevel={riskLevel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
