"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground({ opacity = 0 }: { opacity?: number }) {
  const playerRef = useRef<any>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure the player is fully mounted
    const timer = setTimeout(() => {
      if (playerRef.current) {
        try {
          // Force play the animation
          playerRef.current.play();
          console.log("Animation started manually");
        } catch (error) {
          console.error("Error playing Lottie animation:", error);
          // If manual play fails, ensure autoplay is enabled
          setShouldAutoplay(true);
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-10 transition-opacity duration-1000 ease-in-out"
      style={{ opacity }}
    >
      <Player
        ref={playerRef}
        src="/animations/grey.json"
        style={{ 
          height: "100%", 
          width: "100%",
          objectFit: "cover",
          transform: "scale(1.05)"
        }}
        loop={true}
        autoplay={shouldAutoplay}
        speed={1}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </div>
  );
}