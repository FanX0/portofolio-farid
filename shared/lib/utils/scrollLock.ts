/**
 * Utility to manage scroll locking across the application,
 * ensuring compatibility with Lenis smooth scrolling and native scrolling.
 */

export const lockScroll = () => {
  // Lock native body scroll
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  // Stop Lenis if initialized
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.stop();
  }
};

export const unlockScroll = () => {
  // Unlock native body scroll
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";

  // Start Lenis if initialized
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.start();
  }
};
