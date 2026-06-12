/**
 * NOLEGGIA-LO — main.js
 * Handles:
 *  1. Scroll-reveal animation via IntersectionObserver
 *  2. Navbar background change on scroll
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. Scroll-reveal (nl-fade-up → in-view)
  ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".nl-fade-up");

  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show all immediately for browsers without IO support */
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ------------------------------------------------------------------
     2. Navbar scroll effect (nl-nav-scrolled)
  ------------------------------------------------------------------ */
  var nav = document.getElementById("nl-nav");

  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 12) {
        nav.classList.add("nl-nav-scrolled");
      } else {
        nav.classList.remove("nl-nav-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); /* run once on load */
  }
})();
