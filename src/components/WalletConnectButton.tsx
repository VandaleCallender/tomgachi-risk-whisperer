
import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/sonner";

export function WalletConnectButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      // This is a placeholder for actual wallet connection logic
      // In a real implementation, you would use a library like web3.js, ethers.js, or web3modal
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful connection
      const mockWalletAddress = "0x" + Math.random().toString(16).slice(2, 12) + "...";
      setWalletAddress(mockWalletAddress);
      setIsConnected(true);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet");
      console.error("Wallet connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    toast.info("Wallet disconnected");
  };

  return (
    <Button
      variant={isConnected ? "outline" : "default"}
      className={`gap-2 ${isConnected ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50" : ""}`}
      onClick={isConnected ? handleDisconnect : handleConnect}
      disabled={isConnecting}
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? (
        "Connecting..."
      ) : isConnected ? (
        walletAddress
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}
