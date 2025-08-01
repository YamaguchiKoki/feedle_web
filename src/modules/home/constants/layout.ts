export const LAYOUT_CONSTANTS = {
	NAVBAR_HEIGHT: "3.5rem", // 56px = h-14 in Tailwind
	NAVBAR_HEIGHT_CLASS: "h-14",
	NAVBAR_TOP_CLASS: "top-14",
	NAVBAR_MARGIN_TOP_CLASS: "mt-14",
} as const;

export const LAYOUT_CLASSES = {
	navbarHeight: LAYOUT_CONSTANTS.NAVBAR_HEIGHT_CLASS,
	sidebarTop: LAYOUT_CONSTANTS.NAVBAR_TOP_CLASS,
	sidebarHeight: `h-[calc(100vh-${LAYOUT_CONSTANTS.NAVBAR_HEIGHT})]`,
	contentMarginTop: LAYOUT_CONSTANTS.NAVBAR_MARGIN_TOP_CLASS,
} as const;
