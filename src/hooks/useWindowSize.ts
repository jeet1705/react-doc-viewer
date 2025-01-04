import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
    
        const handleResize = () => {
          // Debounce logic
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            // Only handle significant changes
            if (
              window.innerWidth !== windowSize.width ||
              Math.abs(window.innerHeight - windowSize.height) > 100 // Ignore small height changes
            ) {
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
              });
            }
          }, 200); // Adjust debounce timing as needed
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          if (timeoutId) clearTimeout(timeoutId);
          window.removeEventListener("resize", handleResize);
        };
      }, [windowSize]);
    
      return windowSize;
};
