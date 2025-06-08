// "use client";

// import { Player } from "@lottiefiles/react-lottie-player";

// export default function AnimatedBackground() {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full z-[-1] opacity-30">
//       <Player
//         autoplay
//         loop
//         src= "/animations/Main.json" // place your .json in public/animations/
//         style={{ height: "100%", width: "100%" }}
//       />
//     </div>
//   );
// }
"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";

export default function AnimatedBackground({ opacity = 0 }: { opacity?: number }) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.play();
    }
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
        loop
        autoplay={false}
      />
    </div>
  );
}