
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ShieldAlert } from "lucide-react";
import { RiskLevel } from '@/types';

interface RiskMeterProps {
  riskScore: number;
  riskLevel: RiskLevel;
}

const RiskMeter = ({ riskScore, riskLevel }: RiskMeterProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(riskScore), 500);
    return () => clearTimeout(timer);
  }, [riskScore]);
  
  const getColorClass = () => {
    switch (riskLevel) {
      case "low":
        return "bg-crypto-low-risk";
      case "medium":
        return "bg-crypto-medium-risk";
      case "high":
        return "bg-crypto-high-risk";
      default:
        return "bg-crypto-medium-risk";
    }
  };
  
  const getMessage = () => {
    switch (riskLevel) {
      case "low":
        return "Your portfolio has low risk. Great job!";
      case "medium":
        return "Your portfolio has medium risk. Consider diversifying.";
      case "high":
        return "Warning! High risk detected. Take action to protect your assets.";
      default:
        return "Unable to assess risk level.";
    }
  };
  
  const getIcon = () => {
    return riskLevel === "high" ? <ShieldAlert className="h-5 w-5" /> : <Shield className="h-5 w-5" />;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium pixel-text">Risk Level</h3>
      <div className="flex items-center gap-2">
        <Progress
          value={progress}
          className="h-3"
          indicatorClassName={getColorClass()}
        />
        <span className="text-sm font-semibold w-8">{riskScore}%</span>
      </div>
      
      <Alert className={`mt-4 border ${riskLevel === "high" ? "border-crypto-high-risk" : "border-crypto-primary"}`}>
        <div className="flex items-center gap-2">
          {getIcon()}
          <AlertDescription>
            {getMessage()}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default RiskMeter;
