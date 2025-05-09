
export type RiskLevel = "low" | "medium" | "high";

export interface PetState {
  mood: "happy" | "neutral" | "sad";
  health: number; // 0-100
  riskLevel: RiskLevel;
  lastFed: Date;
  lastPlayed: Date;
}

export interface PortfolioStats {
  diversification: number; // 0-100
  volatility: number; // 0-100
  liquidity: number; // 0-100
  securityRating: number; // 0-100
  overallRisk: number; // 0-100
}
