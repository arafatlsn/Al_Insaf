import { useEffect, useState } from "react";

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Define media queries
    const mobileQuery = window?.matchMedia("(max-width: 575px)");
    const tabletQuery = window?.matchMedia(
      "(min-width: 576px) and (max-width: 991px)"
    );
    const desktopQuery = window?.matchMedia("(min-width: 992px)");

    // Initial check
    const updateScreenSize = () => {
      setScreenSize({
        isMobile: mobileQuery?.matches,
        isTablet: tabletQuery?.matches,
        isDesktop: desktopQuery?.matches,
      });
    };

    // Run initial check
    updateScreenSize();

    // Add listeners for changes
    mobileQuery?.addEventListener("change", updateScreenSize);
    tabletQuery?.addEventListener("change", updateScreenSize);
    desktopQuery?.addEventListener("change", updateScreenSize);

    // Cleanup listeners on unmount
    return () => {
      mobileQuery?.removeEventListener("change", updateScreenSize);
      tabletQuery?.removeEventListener("change", updateScreenSize);
      desktopQuery?.removeEventListener("change", updateScreenSize);
    };
  }, []);
  return screenSize;
};

export default useResponsive;
