const mediaQuery = window.matchMedia("(min-width: 768px)");
const body = document.body;
const header = document.querySelector(".js-header");
const tl = gsap.timeline();

// resizeReload
const resizeReload = () => {
  location.reload();
}

mediaQuery.addEventListener("change", resizeReload);


// smoothScroll
const smoothScroll = () => {
  const scrollElement = document.querySelectorAll("a[href^='#']");

  for(let i = 0; i < scrollElement.length; i++) {
    scrollElement[i].addEventListener("click", (e) => {
      e.preventDefault();

      const href = scrollElement[i].getAttribute("href");
      const target = document.getElementById(href.replace("#", ""));

      const rect = target.getBoundingClientRect().top;
      const offset = window.pageYOffset;
      const position = rect + offset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    });
  }
}


// hamburgerMenu
const hamburger = () => {
  const hamburgerButton = document.querySelector(".js-nav-button");
  const hamburgerLink = document.querySelectorAll(".js-nav-link");

  hamburgerButton.addEventListener("click", () => {
    body.classList.toggle("is-open");
  });

  for(let i = 0; i < hamburgerLink.length; i++) {
    hamburgerLink[i].addEventListener("click", () => {
      body.classList.remove("is-open");
    });
  }

  header.addEventListener("transitionrun", () => {
    hamburgerButton.style.pointerEvents = "none";
  });

  header.addEventListener("transitionend", () => {
    hamburgerButton.style.pointerEvents = "auto";
  });
}


// intersectionObserver
const visible = () => {
  let ROOT_MARGIN_VALUE;

  if(mediaQuery.matches) {
    ROOT_MARGIN_VALUE = "0px 0px -10%";
  } else {
    ROOT_MARGIN_VALUE = "0px 0px 0px 0px";
  }

  const options = {
    rootMargin: ROOT_MARGIN_VALUE
  }

  const targetVisible = document.querySelectorAll(".js-observe-target");
  const targetVisibleModifier = "is-show";

  const visibleHandler = (entries) => {
    for(let i = 0; i < entries.length; i++) {
      if(entries[i].isIntersecting) {
        entries[i].target.classList.add(targetVisibleModifier);
        observer.unobserve(entries[i].target);
      }
    }
  };

  const observer = new IntersectionObserver(visibleHandler,options);

  for(let i = 0; i < targetVisible.length; i++) {
    observer.observe(targetVisible[i]);
  }
}

mediaQuery.addEventListener("change", visible);


// cursor
const worksList = document.querySelector(".js-works-list");

if(worksList !== null) {
  const cursorMove = () => {
    const worksItem = document.querySelectorAll(".js-works-item")
    const cursor = document.querySelector(".js-cursor-element");
    const cursorWidth = cursor.clientWidth;
    const cursorHeight = cursor.clientHeight;
    const cursorPos = {
      x: 0,
      y: 0
    }

    for(let i = 0; i < worksItem.length; i++) {
      worksItem[i].addEventListener("mouseenter", (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;

        gsap.set(cursor, {
          x: cursorPos.x - (cursorWidth / 2),
          y: cursorPos.y - (cursorHeight / 2),
          duration : 0.6,
          ease: "power2.out"
        });

        gsap.to(cursor, {
          opacity: 1,
          scale: 1.0,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      worksItem[i].addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    const onMouseMove = (e) => {
      cursorPos.x = e.clientX;
      cursorPos.y = e.clientY;

      gsap.to(cursor, {
        x: cursorPos.x - (cursorWidth / 2),
        y: cursorPos.y - (cursorHeight / 2),
        duration : 0.6,
        ease: "power2.out"
      });
    }

    const observer = new IntersectionObserver((entries) => {
      for(let i = 0; i < entries.length; i++) {
        if(entries[i].isIntersecting) {
          window.addEventListener("mousemove", onMouseMove);
        } else {
          window.removeEventListener("mousemove", onMouseMove);
        }
      }
    });
    observer.observe(worksList);
  }

  cursorMove();
}


// footerParallax
const footer = document.querySelector(".js-footer");

if(footer !== null) {
  const footerParallax = () => {
    const parallaxTrigger = document.querySelector(".js-parallax-trigger");
    const others = document.querySelector(".js-others");

    let scrollerEnd;
    let Y_PERCENT_VALUE;

    if(mediaQuery.matches) {
      scrollerEnd = "bottom 30%";
    } else {
      scrollerEnd = "bottom center";
    }

    if(others !== null) {
      if(mediaQuery.matches) {
        Y_PERCENT_VALUE = -30;
      } else {
        Y_PERCENT_VALUE = -5;
      }
    } else {
      Y_PERCENT_VALUE = -55;
    }

    gsap.set(footer, {
      opacity: 0.5,
      yPercent: Y_PERCENT_VALUE
    });

    gsap.to(footer, {
      opacity: 1,
      yPercent: 0,
      scrollTrigger: {
        trigger: parallaxTrigger,
        start: "bottom bottom",
        end: scrollerEnd,
        scrub: true
      }
    });
  }

  mediaQuery.addEventListener("change", footerParallax);

  footerParallax();
}


// splitText
const splitText = () => {
  const target = document.querySelectorAll(".js-split-target");

  for(let i = 0; i < target.length; i++) {
    const node = target[i].childNodes;
    const newText = [];

    for(let i = 0; i < node.length; i++) {
      if (node[i].nodeType === 3) {
        const text = node[i].textContent;
        const targetChar = text.split("");

        for (let i = 0; i < targetChar.length; i++) {
          newText.push(
            `<span class="split-text__wrapper"><span aria-hidden="true" style="display:inline-block; --char-index:${i}" class="letter js-letter">${targetChar[i]}</span></span></span>`
          );
        };
      } else {
        newText.push(node[i].outerHTML);
      }
    };

    target[i].innerHTML = newText.join("");
  };

  const visuallyHidden = () => {
    for(let i = 0; i < target.length; i++) {
      const visuallyHidden = document.createElement("span");

      visuallyHidden.innerHTML = target[i].textContent;
      visuallyHidden.classList.add("visually-hidden");
      target[i].appendChild(visuallyHidden);
    }
  }

  visuallyHidden();
}


// loadingAnimation
const loadingAnimation = () => {
  const fixedBackground = () => {
    body.classList.add("is-fixed");
  }

  const fvAnimation = () => {
    const mainvisual = document.querySelector(".js-mainvisual");
    const about = document.querySelector(".js-about");
    const works = document.querySelector(".js-works");

    if(mainvisual !== null) {
      const mvAnimation = () => {
        const resetStyle = () => {
          header.style.transform = "";
          header.style.pointerEvents = "auto";
        }

        gsap.set([".js-mv-circle", ".js-mv-typo", ".js-mv-scroll"], {
          autoAlpha: 0
        })

        gsap.set([".js-mv-split-text .js-letter", ".js-mv-copy"], {
          autoAlpha: 0,
          yPercent: 100
        })

        gsap.set(".js-mv-line", {
          scaleX: 0,
          transformOrigin: "0 0"
        })

        gsap.set(".js-header", {
          autoAlpha: 0,
          y: -50,
          pointerEvents: "none"
        })

        tl.to(".js-mv-split-text .js-letter", {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "power4.out"
        })
        .to(".js-mv-line", {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.out"
        }, "-=1.5")
        .to(".js-mv-copy", {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.4,
          ease: "power4.out"
        }, "<")
        .to(".js-mv-circle", {
          autoAlpha: 1,
          duration: 1.0,
          ease: "power4.out"
        }, "-=1.0")
        .to(".js-mv-typo", {
          autoAlpha: 1,
          duration: 2.0,
          ease: "power4.out"
        }, "-=1.0")
        .to(".js-mv-scroll", {
          autoAlpha: 1,
          duration: 1.4,
          ease: "power4.out"
        }, "-=1.8")
        .to(".js-header", {
          y: 0,
          autoAlpha: 1,
          duration: 1.4,
          ease: "power4.out",
          onComplete: resetStyle
        }, "<")
      }

      mvAnimation();
    }

    if(about !== null) {
      const aboutFvAnimation = () => {
        gsap.set(".js-about-image", {
          autoAlpha: 0,
          y: 30,
          rotation: 6
        })

        gsap.set(".js-about-circle", {
          autoAlpha: 0,
          y: 10,
          rotation: -30
        })

        tl.to(".js-about-image", {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "ease"
        })
        .to(".js-about-circle", {
          autoAlpha: 1,
          y: 0,
          rotation: 0,
          duration: 1.0,
          ease: "ease"
        }, "-=0.1")
      }

      aboutFvAnimation();
    }

    if(works !== null) {
      const worksFvAnimation = () => {
        const EASING = CustomEase.create('default', '0.73, 0, 0.17, 1');

        gsap.set(".js-works-heading .js-letter", {
          yPercent: 100
        })

        gsap.set(".js-works-meta", {
          autoAlpha: 0
        })

        gsap.set(".js-works-image", {
          autoAlpha: 0,
          y: 15
        })

        tl.to(".js-works-heading .js-letter", {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.01,
          ease: EASING
        })
        .to(".js-works-meta", {
          autoAlpha: 1,
          duration: 1.3,
          ease: "ease"
        })
        .to(".js-works-image", {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          ease: "ease"
        }, "-=0.8")
      }

      worksFvAnimation();
    }
  }

  const firstAnimation = () => {
    sessionStorage.setItem("finished", true);

    const unfixedBackground = () => {
      body.classList.remove("is-fixed");
    }

    gsap.set(".js-loading-logo01", {
      autoAlpha: 0
    })

    tl.to(".js-loading-logo01", {
      display: "block",
      autoAlpha: 1,
      duration: 0.4,
      ease: "none",
      delay: 0.5
    })
      .to(".js-loading-logo01", {
        display: "block",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo01", {
        display: "none",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo02", {
        display: "block",
        duration: 0.2,
        ease: "none"
    }, "<")
      .to(".js-loading-logo02", {
        display: "none",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo03", {
        display: "block",
        duration: 0.2,
        ease: "none"
    }, "<")
      .to(".js-loading-logo03", {
        display: "none",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo04", {
        display: "block",
        duration: 0.2,
        ease: "none"
    }, "<")
      .to(".js-loading", {
        yPercent: "-100",
        duration: 0.8,
        ease: "power4.inOut"
    }, "+=0.2")
      .to(".js-loading-wrapper", {
        autoAlpha: 0,
        duration: 0.2,
        onComplete: unfixedBackground, fvAnimation, visible
    }, "<")
  };

  const destroy = () => {
    gsap.to(".js-loading", {
      autoAlpha: 0,
      duration: 1.0,
      ease: "ease"
    })
  }

  window.addEventListener("load", () => {
    if (sessionStorage.getItem("finished")) {
      destroy();
      fvAnimation();
      visible();
    } else {
      fixedBackground();
      firstAnimation();
    }
  });
}


smoothScroll();
hamburger();
splitText();
loadingAnimation();