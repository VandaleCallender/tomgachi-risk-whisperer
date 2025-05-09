
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

  const getEyeStyle = (type: 'left' | 'right') => {
    const baseStyle = {
      transform: `translate(${eyePosition[type].x}px, ${eyePosition[type].y}px)`,
      transition: 'transform 0.2s ease-out'
    };

    switch (mood) {
      case "happy":
        return { ...baseStyle, borderRadius: '50% 50% 0 0', height: '4px', width: '4px' };
      case "sad":
        return { ...baseStyle, borderRadius: '0 0 50% 50%', height: '4px', width: '4px' };
      default:
        return { ...baseStyle, borderRadius: '50%', height: '5px', width: '5px' };
    }
  };

  const getMouthPath = () => {
    // Scale the mouth based on health
    const width = 24;
    const height = 12;
    
    switch (mood) {
      case "happy":
        // Smile - bigger when health is higher
        return (
          <path 
            d={`M10 ${8 + (100 - health) * 0.05} Q${width/2} ${height + 6} ${width - 10} ${8 + (100 - health) * 0.05}`}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      case "sad":
        // Frown - deeper when health is lower
        return (
          <path 
            d={`M10 ${12 - (health) * 0.05} Q${width/2} ${4 - (health) * 0.05} ${width - 10} ${12 - (health) * 0.05}`}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      default:
        // Neutral
        return (
          <line 
            x1="10" 
            y1="10" 
            x2={width - 10} 
            y2="10" 
            stroke="black" 
            strokeWidth="2"
          />
        );
    }
  };

  const getOctopusColor = () => {
    switch (riskLevel) {
      case "low":
        return "bg-gradient-to-br from-purple-300 to-purple-500";
      case "medium":
        return "bg-gradient-to-br from-amber-300 to-amber-500";
      case "high":
        return "bg-gradient-to-br from-red-300 to-red-500";
      default:
        return "bg-gradient-to-br from-purple-300 to-purple-500";
    }
  };

  // Generate tentacles
  const renderTentacles = () => {
    const tentacles = [];
    const tentacleCount = 8;
    const baseDelay = 0.2;
    
    for (let i = 0; i < tentacleCount; i++) {
      const angle = (i / tentacleCount) * 2 * Math.PI;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      const delay = baseDelay * i;
      
      tentacles.push(
        <div 
          key={i}
          className={`absolute w-6 h-12 rounded-full ${getOctopusColor()} opacity-90`}
          style={{ 
            transform: `translate(${x * 16}px, ${y * 16 + 40}px) rotate(${angle + Math.PI/2}rad)`,
            animation: `${i % 2 === 0 ? 'sway-left' : 'sway-right'} ${2 + i * 0.2}s infinite ease-in-out`,
            animationDelay: `${delay}s`,
            boxShadow: 'inset 0 -8px 10px rgba(0,0,0,0.2)',
          }}
        ></div>
      );
    }
    
    return tentacles;
  };

  return (
    <div className="flex flex-col items-center space-y-4 pet-container">
      <div className={`relative ${animation}`}>
        {/* Tentacles */}
        {renderTentacles()}
        
        {/* Main body */}
        <div 
          className={`w-32 h-32 rounded-full ${getOctopusColor()} shadow-lg flex items-center justify-center relative
            border-4 border-opacity-20 border-white dark:border-gray-800
            shadow-[0_0_15px_rgba(0,0,0,0.2)]`}
          style={{
            boxShadow: 'inset 0 -15px 30px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.3)',
            transform: 'translateY(5px)',
          }}
        >
          {/* Left eye socket */}
          <div className="absolute top-10 left-8 bg-white w-8 h-8 rounded-full flex items-center justify-center
            shadow-inner border-2 border-gray-200 dark:border-gray-600">
            {/* Left eye pupil */}
            <div 
              className="bg-black w-5 h-5 rounded-full"
              style={getEyeStyle('left')}
            ></div>
          </div>

          {/* Right eye socket */}
          <div className="absolute top-10 right-8 bg-white w-8 h-8 rounded-full flex items-center justify-center
            shadow-inner border-2 border-gray-200 dark:border-gray-600">
            {/* Right eye pupil */}
            <div 
              className="bg-black w-5 h-5 rounded-full"
              style={getEyeStyle('right')}
            ></div>
          </div>

          {/* Mouth */}
          <div className="absolute bottom-12 w-full flex justify-center">
            <svg width="30" height="20" viewBox="0 0 30 20">
              {getMouthPath()}
            </svg>
          </div>
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
