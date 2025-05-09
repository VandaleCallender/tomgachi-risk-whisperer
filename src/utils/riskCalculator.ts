
import { RiskLevel, PortfolioStats } from '../types';

export const calculateRiskLevel = (riskScore: number): RiskLevel => {
  if (riskScore < 30) return "low";
  if (riskScore < 70) return "medium";
  return "high";
};

export const calculateMoodFromRisk = (riskScore: number): "happy" | "neutral" | "sad" => {
  if (riskScore < 30) return "happy";
  if (riskScore < 70) return "neutral";
  return "sad";
};

export const calculateHealthFromStats = (stats: PortfolioStats): number => {
  // Higher values in stats are better, except for volatility and overallRisk
  const healthPoints = [
    stats.diversification,
    100 - stats.volatility,
    stats.liquidity,
    stats.securityRating,
    100 - stats.overallRisk
  ];
  
  // Average health points
  return Math.round(healthPoints.reduce((sum, point) => sum + point, 0) / healthPoints.length);
};

export const getMockPortfolioStats = (): PortfolioStats => {
  // In a real application, this would fetch data from a blockchain API
  return {
    diversification: Math.floor(Math.random() * 100),
    volatility: Math.floor(Math.random() * 100),
    liquidity: Math.floor(Math.random() * 100),
    securityRating: Math.floor(Math.random() * 100),
    overallRisk: Math.floor(Math.random() * 100)
  };
};

export const improvePortfolioStat = (
  stats: PortfolioStats,
  stat: keyof PortfolioStats
): PortfolioStats => {
  const newStats = { ...stats };
  
  // Improve the specific stat
  if (stat === 'volatility' || stat === 'overallRisk') {
    // For these stats, lower is better
    newStats[stat] = Math.max(0, newStats[stat] - Math.floor(Math.random() * 20));
  } else {
    // For other stats, higher is better
    newStats[stat] = Math.min(100, newStats[stat] + Math.floor(Math.random() * 20));
  }
  
  // Recalculate overall risk based on other stats
  if (stat !== 'overallRisk') {
    const avgRisk = (
      (100 - newStats.diversification) + 
      newStats.volatility + 
      (100 - newStats.liquidity) + 
      (100 - newStats.securityRating)
    ) / 4;
    
    newStats.overallRisk = Math.round(avgRisk);
  }
  
  return newStats;
};
