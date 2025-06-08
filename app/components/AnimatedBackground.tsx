"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";

export default function AnimatedBackground({ opacity = 0 }: { opacity?: number }) {
  const [modifiedSrc, setModifiedSrc] = useState<string | null>(null);

  useEffect(() => {
    // Load and modify the animation data to limit frames
    fetch('/animations/grey.json')
      .then(response => response.json())
      .then(data => {
        // Modify the JSON to limit frames to 120
        const modifiedData = {
          ...data,
          op: Math.min(120, data.op || 120), // Set out point (end frame) to 120
          ip: 0 // Set in point (start frame) to 0
        };
        
        console.log(`Original frames: ${data.op}, Modified to: ${modifiedData.op}`);
        
        // Create a blob URL for the modified data
        const blob = new Blob([JSON.stringify(modifiedData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        setModifiedSrc(url);
      })
      .catch(error => {
        console.error('Error loading animation:', error);
        // Fallback to original file
        setModifiedSrc('/animations/grey.json');
      });

    // Cleanup blob URL when component unmounts
    return () => {
      if (modifiedSrc && modifiedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(modifiedSrc);
      }
    };
  }, []);

  if (!modifiedSrc) {
    return null; // Show nothing while loading
  }

  return (
    <div 
      className="fixed inset-0 -z-10 transition-opacity duration-1000 ease-in-out"
      style={{ opacity }}
    >
      <Player
        src={modifiedSrc}
        style={{ 
          height: "100%", 
          width: "100%",
          objectFit: "cover",
          transform: "scale(1.05)"
        }}
        loop={true}
        autoplay={true}
        speed={1}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </div>
  );
}