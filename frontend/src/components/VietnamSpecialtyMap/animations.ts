export const transitionDefault = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1], // premium custom cubic-bezier
};

export const lineDrawAnimation = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const cardAnimation = {
  initial: { opacity: 0, y: 14, scale: 0.99 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: 0.2, // appears slightly after line starts drawing
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const productContentAnimation = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};
