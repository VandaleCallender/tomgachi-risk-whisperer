
import { WalletCards } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-center py-4 border-b">
      <div className="flex items-center gap-2">
        <WalletCards className="h-6 w-6 text-crypto-primary" />
        <h1 className="text-xl font-bold pixel-text tracking-wider">Crypto-Gotchi</h1>
      </div>
    </div>
  );
};

export default Header;
