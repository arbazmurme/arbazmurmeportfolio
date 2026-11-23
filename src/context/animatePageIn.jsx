export const animatePageIn = () => {
  // Lazy-load GSAP so it doesn't inflate the initial client bundle.
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4"),
  ];

  if (banners.every((banner) => banner)) {
    import("gsap").then(({ default: gsap }) => {
      const tl = gsap.timeline();
      tl.set(banners, { visibility: "visible", yPercent: 0, pointerEvents: "auto" })
        .to(banners, {
          yPercent: 100,
          stagger: 0.12,
          ease: "power3.inOut",
          duration: 0.55,
          onComplete: () => {
            gsap.set(banners, { visibility: "hidden", pointerEvents: "none" });
          },
        });
    });
  }
};

export const animatePageOut = (href, router) => {
  // Lazy-load GSAP so it doesn't inflate the initial client bundle.
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4"),
  ];

  if (banners.every((banner) => banner)) {
    import("gsap").then(({ default: gsap }) => {
      const tl = gsap.timeline();
      tl.set(banners, { visibility: "visible", yPercent: -100, pointerEvents: "auto" })
        .to(banners, {
          yPercent: 0,
          stagger: 0.12,
          ease: "power3.inOut",
          duration: 0.55,
          onComplete: () => {
            router.push(href);
          },
        });
    });
  }
};
