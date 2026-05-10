export const animatePageIn = () => {
  // Lazy-load GSAP so it doesn't inflate the initial client bundle.
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4")
  ];

  if (banners.every(banner => banner)) {
    import("gsap").then(({ default: gsap }) => {
      const tl = gsap.timeline();
      tl.set(banners, { yPercent: 0 })
        .to(banners, { yPercent: 100, stagger: 0.2 });
    });
  }
};

export const animatePageOut = (href, router) => {
  // Lazy-load GSAP so it doesn't inflate the initial client bundle.
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4")
  ];

  if (banners.every(banner => banner)) {
    import("gsap").then(({ default: gsap }) => {
      const tl = gsap.timeline();
      tl.set(banners, { yPercent: -100 })
        .to(banners, {
          yPercent: 0,
          stagger: 0.2,
          onComplete: () => {
            router.push(href);
          }
        });
    });
  }
};
