
import { WalletCards } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { WalletConnectButton } from "./WalletConnectButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-4 px-6 border-b">
      <div className="flex items-center gap-2">
        <WalletCards className="h-6 w-6 text-crypto-primary" />
        <h1 className="text-xl font-bold pixel-text tracking-wider">Crypto-Gotchi</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <WalletConnectButton />
      </div>
    </div>
  );
};

export default Header;
