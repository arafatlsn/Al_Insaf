import { useEffect, useState } from "react";

const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: width < 576,
    isTablet: width >= 576 && width < 992,
    isDesktop: width >= 992,
    width,
  };
};

export default useResponsive;
