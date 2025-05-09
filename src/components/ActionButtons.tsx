
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { PortfolioStats } from "@/types";
import { Shield, Database, WalletCards, Info } from "lucide-react";

interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onLearn: () => void;
  onSecure: () => void;
  stats: PortfolioStats;
}

const ActionButtons = ({ onFeed, onPlay, onLearn, onSecure, stats }: ActionButtonsProps) => {
  const { toast } = useToast();

  const handleFeed = () => {
    onFeed();
    toast({
      title: "Portfolio diversified!",
      description: `Diversification increased to ${stats.diversification}%`,
    });
  };

  const handlePlay = () => {
    onPlay();
    toast({
      title: "Risk assessment complete!",
      description: `Volatility reduced to ${stats.volatility}%`,
    });
  };

  const handleLearn = () => {
    onLearn();
    toast({
      title: "Learning about crypto risks!",
      description: "Your knowledge has improved your portfolio health.",
    });
  };

  const handleSecure = () => {
    onSecure();
    toast({
      title: "Security check completed!",
      description: `Security rating improved to ${stats.securityRating}%`,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="border-2 border-crypto-primary hover:bg-crypto-primary hover:text-white" 
              onClick={handleFeed}
            >
              <WalletCards className="mr-2 h-4 w-4" />
              <span className="pixel-text">Diversify</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Feed your crypto pet by diversifying your portfolio</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="border-2 border-crypto-secondary hover:bg-crypto-secondary hover:text-white" 
              onClick={handlePlay}
            >
              <Database className="mr-2 h-4 w-4" />
              <span className="pixel-text">Analyze</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Play with your crypto pet by analyzing risk factors</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="border-2 border-crypto-tertiary hover:bg-crypto-tertiary hover:text-white" 
              onClick={handleLearn}
            >
              <Info className="mr-2 h-4 w-4" />
              <span className="pixel-text">Learn</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Learn about crypto risks and best practices</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="border-2 border-crypto-low-risk hover:bg-crypto-low-risk hover:text-white" 
              onClick={handleSecure}
            >
              <Shield className="mr-2 h-4 w-4" />
              <span className="pixel-text">Secure</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Improve your portfolio's security</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ActionButtons;
