import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  // Set initial height only once on mount
  useEffect(() => {
    setWindowSize((prev) => ({
      ...prev,
      height: window.innerHeight,
    }));
  }, []);

  // Update width on resize
  useEffect(() => {
    function handleResize() {
      setWindowSize((prev) => ({
        ...prev,
        width: window.innerWidth,
      }));
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize width

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
