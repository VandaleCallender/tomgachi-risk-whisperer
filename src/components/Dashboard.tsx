
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskMeter from "./RiskMeter";
import { PortfolioStats, RiskLevel } from "@/types";
import { Shield, Database, WalletCards, Info } from "lucide-react";

interface DashboardProps {
  stats: PortfolioStats;
  riskLevel: RiskLevel;
}

const Dashboard = ({ stats, riskLevel }: DashboardProps) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="pixel-text">Overview</TabsTrigger>
          <TabsTrigger value="details" className="pixel-text">Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="pixel-text">Risk Overview</CardTitle>
              <CardDescription>See how your crypto portfolio is performing</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskMeter riskScore={stats.overallRisk} riskLevel={riskLevel} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="pixel-text">Portfolio Details</CardTitle>
              <CardDescription>Detailed breakdown of your portfolio stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <WalletCards className="mr-2 h-4 w-4 text-crypto-primary" />
                    <span>Diversification</span>
                  </div>
                  <span className="font-bold">{stats.diversification}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="mr-2 h-4 w-4 text-crypto-secondary" />
                    <span>Volatility</span>
                  </div>
                  <span className="font-bold">{stats.volatility}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Info className="mr-2 h-4 w-4 text-crypto-tertiary" />
                    <span>Liquidity</span>
                  </div>
                  <span className="font-bold">{stats.liquidity}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-crypto-low-risk" />
                    <span>Security Rating</span>
                  </div>
                  <span className="font-bold">{stats.securityRating}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
