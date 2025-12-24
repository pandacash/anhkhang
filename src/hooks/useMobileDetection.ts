import { useState, useEffect } from "react";

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      // Check for mobile user agents
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      
      // Also check screen width as backup
      const isSmallScreen = window.innerWidth < 768;
      
      // Consider it mobile if user agent matches OR screen is very small
      // But exclude tablets like Surface (which have larger screens)
      setIsMobile(isMobileDevice && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
