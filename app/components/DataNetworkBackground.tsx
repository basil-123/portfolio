// "use client";

// import { useCallback } from "react";
// import Particles from "react-tsparticles";
// import type { Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles";

// export default function DataNetworkBackground() {
//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadFull(engine);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         fullScreen: {
//           enable: true,
//           zIndex: -1,
//         },
//         background: {
//           color: {
//             value: "#0f172a", // black/dark slate
//           },
//         },
//         particles: {
//           number: {
//             value: 60,
//             density: {
//               enable: true,
//               area: 800,
//             },
//           },
//           color: {
//             value: "#38bdf8", // sky-400
//           },
//           links: {
//             enable: true,
//             distance: 120,
//             color: "#64748b", // slate-500
//             opacity: 0.5,
//             width: 1,
//           },
//           move: {
//             enable: true,
//             speed: 0.6,
//           },
//           size: {
//             value: 3,
//           },
//         },
//       }}
//     />
//   );
// }

"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "@tsparticles/all";

export default function DataNetworkBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: {
            value: "#000000", // pure black
          },
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#ffffff", // white particles
          },
          links: {
            enable: true,
            distance: 120,
            color: "#ffffff", // white links
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
          },
          size: {
            value: 2.5,
          },
        },
      }}
    />
  );
}

