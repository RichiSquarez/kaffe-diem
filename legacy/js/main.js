(() => {
  const body = document.body;
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  const header = document.querySelector(".site-header");

  const setNavOpen = (open) => {
    body.classList.toggle("nav-open", open);
    body.classList.toggle("nav-locked", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  };

  if (toggle && nav) {
    setNavOpen(false);

    toggle.addEventListener("click", () => {
      const nextOpen = !body.classList.contains("nav-open");
      setNavOpen(nextOpen);
    });

    nav.addEventListener("click", (e) => {
      if (e.target && e.target.closest && e.target.closest("a")) setNavOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (!body.classList.contains("nav-open")) return;
      if (e.target.closest(".nav-bar")) return;
      setNavOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavOpen(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 640 && body.classList.contains("nav-open")) {
        setNavOpen(false);
      }
    });
  }

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const backToTopBtn = document.createElement("button");
  backToTopBtn.type = "button";
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  backToTopBtn.textContent = "↑";
  body.appendChild(backToTopBtn);

  const onScrollTopBtn = () => {
    backToTopBtn.classList.toggle("visible", window.scrollY > 420);
  };
  onScrollTopBtn();
  window.addEventListener("scroll", onScrollTopBtn, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
