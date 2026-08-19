/* ==========================================
   PRODUCT LANDING PAGE
   ========================================== */

const API_DATA = "./data.json";


/* ==========================================
   LOAD JSON DATA
   ========================================== */

async function loadData() {
  try {
    const response = await fetch(API_DATA);

    if (!response.ok) {
      throw new Error("Failed to load data.json");
    }

    const data = await response.json();

    renderPage(data);

  } catch (error) {
    console.error(error);

    /*
      Fallback supaya halaman tetap bisa
      berjalan jika data.json gagal dibaca.
    */
    renderPage({
      brand: {
        name: "Nexa",
        description:
          "A modern workspace for teams that want to build better products."
      },

      hero: {
        eyebrow: "The future of productivity",
        title: "Build better. Move faster.",
        description:
          "A powerful workspace designed to help modern teams organize, create, and launch products faster."
      },

      features: []
    });
  }
}


/* ==========================================
   RENDER PAGE
   ========================================== */

function renderPage(data) {

  /* Brand */

  const brandName = document.querySelector("#brandName");
  const footerBrand = document.querySelector("#footerBrand");

  if (data.brand) {
    if (brandName) {
      brandName.textContent = data.brand.name;
    }

    if (footerBrand) {
      footerBrand.textContent = data.brand.name;
    }

    const footerDescription =
      document.querySelector("#footerDescription");

    if (footerDescription) {
      footerDescription.textContent =
        data.brand.description;
    }
  }


  /* Hero */

  if (data.hero) {

    const eyebrow =
      document.querySelector("#heroEyebrow");

    const title =
      document.querySelector("#heroTitle");

    const description =
      document.querySelector("#heroDescription");

    if (eyebrow) {
      eyebrow.textContent = data.hero.eyebrow;
    }

    if (title && data.hero.title) {

      const titleParts =
        data.hero.title.split(" ");

      const middle =
        Math.ceil(titleParts.length / 2);

      const firstPart =
        titleParts.slice(0, middle).join(" ");

      const secondPart =
        titleParts.slice(middle).join(" ");

      title.innerHTML = `
        ${firstPart}
        <span>${secondPart}</span>
      `;
    }

    if (description) {
      description.textContent =
        data.hero.description;
    }
  }


  /* Features */

  renderFeatures(data.features || []);
}


/* ==========================================
   FEATURE RENDERER
   ========================================== */

function renderFeatures(features) {

  const grid =
    document.querySelector("#featuresGrid");

  if (!grid) return;

  grid.innerHTML = "";

  features.forEach((feature, index) => {

    const card =
      document.createElement("article");

    card.className = "feature-card";

    card.innerHTML = `
      <div class="feature-icon">
        ${feature.icon || "✦"}
      </div>

      <h3>${feature.title}</h3>

      <p>${feature.description}</p>
    `;

    card.style.opacity = "0";

    card.style.transform =
      "translateY(20px)";

    grid.appendChild(card);

    setTimeout(() => {

      card.style.transition =
        "opacity .6s ease, transform .6s ease";

      card.style.opacity = "1";

      card.style.transform =
        "translateY(0)";

    }, index * 100);
  });
}


/* ==========================================
   NAVBAR SCROLL
   ========================================== */

const navbar =
  document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* ==========================================
   MOBILE MENU
   ========================================== */

const menuToggle =
  document.querySelector("#menuToggle");

const navMenu =
  document.querySelector(".nav-menu");


menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("open");

});


/* Close menu after clicking navigation */

document
  .querySelectorAll(".nav-menu a")
  .forEach(link => {

    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });

  });


/* ==========================================
   SCROLL REVEAL
   ========================================== */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(
    ".section-heading, .showcase-content, .mobile-content, .step, .pricing-card, .cta-box"
  )
  .forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(25px)";

    element.style.transition =
      "opacity .7s ease, transform .7s ease";

    observer.observe(element);

  });


/* ==========================================
   REVEAL CLASS
   ========================================== */

const revealStyle =
  document.createElement("style");

revealStyle.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(revealStyle);


/* ==========================================
   BUTTON INTERACTION
   ========================================== */

document
  .querySelectorAll(".button")
  .forEach(button => {

    button.addEventListener("click", event => {

      const href =
        button.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();

        alert(
          "Welcome to Nexa! Your free workspace is ready to start."
        );
      }

    });

  });


/* ==========================================
   MOUSE PARALLAX HERO
   ========================================== */

const heroVisual =
  document.querySelector(".hero-visual");

if (heroVisual) {

  heroVisual.addEventListener(
    "mousemove",
    event => {

      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      const orb =
        heroVisual.querySelector(
          ".product-orb"
        );

      if (orb) {

        orb.style.transform = `
          translate(
            ${x * 10}px,
            ${y * 10}px
          )
        `;
      }

    }
  );


  heroVisual.addEventListener(
    "mouseleave",
    () => {

      const orb =
        heroVisual.querySelector(
          ".product-orb"
        );

      if (orb) {
        orb.style.transform = "";
      }

    }
  );
}


/* ==========================================
   START APP
   ========================================== */

loadData();