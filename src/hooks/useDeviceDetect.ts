import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useDeviceDetect(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    function detect(): DeviceInfo {
      const ua = navigator.userAgent || '';
      const width = window.innerWidth;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      const mobileRE = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
      const tabletRE = /iPad|Android(?!.*Mobile)|Tablet/i;

      const isMobile = (mobileRE.test(ua) && width < 768) || (hasTouch && width < 480);
      const isTablet = tabletRE.test(ua) || (hasTouch && width >= 480 && width < 1024);
      const isDesktop = !isMobile && !isTablet;

      return { isMobile, isTablet, isDesktop };
    }

    setDevice(detect());

    const onResize = () => setDevice(detect());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return device;
}
