export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export const transition = {
  duration: 0.7,
  ease: easeOutQuart,
};
export const reveal = {
  initial: { y: 28, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition,
};
