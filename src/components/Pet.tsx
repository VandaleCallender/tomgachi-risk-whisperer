
import { useState, useEffect } from 'react';
import { RiskLevel } from '@/types';

interface PetProps {
  mood: "happy" | "neutral" | "sad";
  health: number;
  riskLevel: RiskLevel;
}

const Pet = ({ mood, health, riskLevel }: PetProps) => {
  const [animation, setAnimation] = useState('');
  const [eyePosition, setEyePosition] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  
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
      // Get the container element's position and size
      const container = document.querySelector('.pet-container');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      
      // Calculate the maximum distance the eyes can move
      const maxEyeMovement = 2;
      
      // Calculate normalized mouse position within the container
      let normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      let normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      // Limit the range to -1 to 1
      normalizedX = Math.max(-1, Math.min(1, normalizedX));
      normalizedY = Math.max(-1, Math.min(1, normalizedY));
      
      // Calculate the eye offset
      const eyeOffsetX = normalizedX * maxEyeMovement;
      const eyeOffsetY = normalizedY * maxEyeMovement;
      
      setEyePosition({
        left: { x: eyeOffsetX, y: eyeOffsetY },
        right: { x: eyeOffsetX, y: eyeOffsetY }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getPetColor = () => {
    switch (riskLevel) {
      case "low":
        return "bg-purple-300 dark:bg-purple-500";
      case "medium":
        return "bg-amber-300 dark:bg-amber-500";
      case "high":
        return "bg-red-300 dark:bg-red-500";
      default:
        return "bg-purple-300 dark:bg-purple-500";
    }
  };

  const getBorderColor = () => {
    switch (riskLevel) {
      case "low":
        return "border-purple-900 dark:border-purple-300";
      case "medium":
        return "border-amber-900 dark:border-amber-300";
      case "high":
        return "border-red-900 dark:border-red-300";
      default:
        return "border-purple-900 dark:border-purple-300";
    }
  };

  const getEyeExpression = () => {
    if (mood === "happy") {
      return (
        <>
          <div className="absolute w-3 h-3 bg-black top-8 left-7" />
          <div className="absolute top-8 right-7 flex flex-col">
            <div className="w-3 h-1 bg-black" />
            <div className="w-1 h-1 bg-black ml-2" />
            <div className="w-3 h-1 bg-black" />
          </div>
        </>
      );
    } else if (mood === "sad") {
      return (
        <>
          <div className="absolute flex flex-col top-8 left-7">
            <div className="w-3 h-1 bg-black" />
            <div className="w-1 h-1 bg-black ml-2" />
            <div className="w-3 h-1 bg-black" />
          </div>
          <div className="absolute w-3 h-3 bg-black top-8 right-7" />
        </>
      );
    } else {
      return (
        <>
          <div className="absolute w-3 h-3 bg-black top-8 left-7" />
          <div className="absolute w-3 h-3 bg-black top-8 right-7" />
        </>
      );
    }
  };

  const getMouthExpression = () => {
    if (mood === "happy") {
      return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-black rounded-b-sm" />
      );
    } else if (mood === "sad") {
      return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-black rounded-t-sm" />
      );
    } else {
      return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black" />
      );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 pet-container">
      <div className={`relative ${animation}`}>
        {/* Pixel art octopus */}
        <div 
          className={`relative w-32 h-32 ${getPetColor()} border-4 ${getBorderColor()} pixel-border`}
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 87% 75%, 87% 87%, 75% 87%, 75% 75%, 62% 75%, 62% 87%, 50% 87%, 50% 75%, 37% 75%, 37% 87%, 25% 87%, 25% 75%, 12% 75%, 12% 87%, 0% 87%)',
          }}
        >
          {/* Eyes that track mouse movement */}
          {getEyeExpression()}
          
          {/* Mouth */}
          {getMouthExpression()}
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${health > 70 ? 'bg-green-500' : health > 30 ? 'bg-yellow-400' : 'bg-red-500'}`}
          style={{ width: `${health}%` }}
        ></div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Health: {health}%</p>
        <p className="text-sm font-medium pixel-text">{mood.toUpperCase()} CRYPTO PET</p>
      </div>
    </div>
  );
};

export default Pet;
