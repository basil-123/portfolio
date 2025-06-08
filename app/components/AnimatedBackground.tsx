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
import type { AnimationItem } from "lottie-web";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [lottieInstance, setLottieInstance] = useState<AnimationItem | null>(null);

  useEffect(() => {
    // Play a specific segment in loop: frames 0 to 120
    if (lottieInstance) {
      lottieInstance.playSegments([0, 120], true);
      lottieInstance.setSubframe(false); // For better performance
    }
  }, [lottieInstance]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Player
        lottieRef={(instance: AnimationItem) => setLottieInstance(instance)}
        src="/animations/grey.json"
        autoplay={false}
        loop
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover", // Ensures full coverage without distortion
          transform: "scale(1.1)", // Slightly larger to prevent edge gaps
        }}
      />
    </div>
  );
}