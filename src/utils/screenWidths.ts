export const MOBILE_MAX_WIDTH = 768;
export const TABLET_MAX_WIDTH = 992;

export const getIsMobile = () => window.innerWidth <= MOBILE_MAX_WIDTH;
export const getIsTablet = () => window.innerWidth <= TABLET_MAX_WIDTH;
export const getIsDesktop = () => window.innerWidth > TABLET_MAX_WIDTH;
