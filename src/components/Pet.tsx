
import { useState, useEffect } from 'react';
import { RiskLevel } from '@/types';

interface PetProps {
  mood: "happy" | "neutral" | "sad";
  health: number;
  riskLevel: RiskLevel;
}

const Pet = ({ mood, health, riskLevel }: PetProps) => {
  const [animation, setAnimation] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the container element's position and size (the pet's parent container)
      const container = document.querySelector('.pet-container');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      
      // Calculate the maximum distance the pet can move
      const maxMovementX = 20;
      const maxMovementY = 10;
      
      // Calculate normalized mouse position within the container
      let normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      let normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      // Limit the range to -1 to 1
      normalizedX = Math.max(-1, Math.min(1, normalizedX));
      normalizedY = Math.max(-1, Math.min(1, normalizedY));
      
      // Calculate the movement offset
      const offsetX = normalizedX * maxMovementX;
      const offsetY = normalizedY * maxMovementY;
      
      setPosition({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    <div className="flex flex-col items-center space-y-4 pet-container">
      <div 
        className={`relative ${animation}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
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
