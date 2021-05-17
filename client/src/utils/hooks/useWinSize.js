import { useEffect, useState } from "react";

const useWinSize = () => {
  const initScreen = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const [winSize, setWinSize] = useState(initScreen);

  useEffect(() => {
    const handleResize = () => {
      setWinSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return winSize;
};

export default useWinSize;
