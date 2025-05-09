
import { useState, useEffect } from 'react';
import { RiskLevel } from '@/types';

interface PetProps {
  mood: "happy" | "neutral" | "sad";
  health: number;
  riskLevel: RiskLevel;
}

const Pet = ({ mood, health, riskLevel }: PetProps) => {
  const [animation, setAnimation] = useState('');
  
  useEffect(() => {
    // Set animation based on mood
    if (mood === 'happy') {
      setAnimation('animate-bounce-slow');
    } else if (mood === 'sad') {
      setAnimation('animate-wiggle');
    } else {
      setAnimation('');
    }
  }, [mood]);

  const getEyeStyle = () => {
    switch (mood) {
      case "happy":
        return "rounded-b-full h-2 w-2";
      case "sad":
        return "rounded-t-full h-2 w-2";
      default:
        return "rounded-full h-3 w-3";
    }
  };

  const getMouthStyle = () => {
    switch (mood) {
      case "happy":
        return "h-3 w-6 rounded-b-full";
      case "sad":
        return "h-3 w-6 rounded-t-full";
      default:
        return "h-1 w-4 rounded";
    }
  };

  const getPetColorClass = () => {
    switch (riskLevel) {
      case "low":
        return "bg-crypto-low-risk";
      case "medium":
        return "bg-crypto-medium-risk";
      case "high":
        return "bg-crypto-high-risk";
      default:
        return "bg-crypto-primary";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`relative ${animation}`}>
        <div 
          className={`w-32 h-32 rounded-full ${getPetColorClass()} shadow-lg flex items-center justify-center relative pixel-border animate-pulse-glow`}
        >
          <div className="absolute top-8 left-8 bg-white w-4 h-4 rounded-full flex items-center justify-center">
            <div className={`bg-black ${getEyeStyle()}`}></div>
          </div>
          <div className="absolute top-8 right-8 bg-white w-4 h-4 rounded-full flex items-center justify-center">
            <div className={`bg-black ${getEyeStyle()}`}></div>
          </div>
          <div className="absolute bottom-10 bg-black ${getMouthStyle()}"></div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${health > 70 ? 'bg-green-500' : health > 30 ? 'bg-yellow-400' : 'bg-red-500'}`}
          style={{ width: `${health}%` }}
        ></div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500">Health: {health}%</p>
        <p className="text-sm font-medium pixel-text">{mood.toUpperCase()} CRYPTO PET</p>
      </div>
    </div>
  );
};

export default Pet;
