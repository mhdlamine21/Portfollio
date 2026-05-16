"use strict";

// Theme par défaut : clair
const theme_sauvegarde = localStorage.getItem("theme") || "clair";
document.documentElement.dataset.theme = theme_sauvegarde;

function basculer_theme() {
  const html = document.documentElement;
  const nouveau = html.dataset.theme === "clair" ? "sombre" : "clair";
  html.dataset.theme = nouveau;
  localStorage.setItem("theme", nouveau);
}

// Menu mobile
function gerer_menu_mobile() {
  const menu = document.getElementById("menu_mobile");
  const bouton = document.getElementById("bouton_menu");
  if (!menu || !bouton) return;
  const ouvert = menu.classList.toggle("ouvert");
  bouton.setAttribute("aria-expanded", ouvert);
  menu.setAttribute("aria-hidden", !ouvert);
  const lignes = bouton.querySelectorAll(".ligne_menu");
  if (ouvert) {
    lignes[0].style.transform = "rotate(45deg) translate(5px,5px)";
    lignes[1].style.opacity = "0";
    lignes[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    lignes.forEach((l) => {
      l.style.transform = "";
      l.style.opacity = "";
    });
  }
}

// Fermer menu via liens mobiles
document.querySelectorAll(".lien_mobile").forEach((lien) => {
  lien.addEventListener("click", () => {
    const menu = document.getElementById("menu_mobile");
    const bouton = document.getElementById("bouton_menu");
    if (!menu?.classList.contains("ouvert")) return;
    menu.classList.remove("ouvert");
    menu.setAttribute("aria-hidden", "true");
    bouton?.setAttribute("aria-expanded", "false");
    bouton?.querySelectorAll(".ligne_menu").forEach((l) => {
      l.style.transform = "";
      l.style.opacity = "";
    });
  });
});

// Fermer menu au clic extérieur
document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu_mobile");
  const bouton = document.getElementById("bouton_menu");
  if (!menu?.classList.contains("ouvert")) return;
  if (!menu.contains(e.target) && !bouton?.contains(e.target))
    gerer_menu_mobile();
});

// Lueur curseur souris (desktop uniquement)
if (window.innerWidth > 768) {
  const lueur = document.getElementById("curseur_lueur");
  if (lueur) {
    document.addEventListener("mousemove", (e) => {
      lueur.style.left = e.clientX + "px";
      lueur.style.top = e.clientY + "px";
    });
  }
}

// Révélation des éléments au scroll
const obs_reveal = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs_reveal.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveler").forEach((el) => obs_reveal.observe(el));

// Révélation des éléments latéraux gauche
const obs_gauche = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs_gauche.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".reveler-gauche")
  .forEach((el) => obs_gauche.observe(el));

// Révélation des éléments latéraux droite
const obs_droite = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs_droite.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".reveler-droite")
  .forEach((el) => obs_droite.observe(el));

// Animation des barres de compétences
const obs_barres = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".barre_remplissage").forEach((barre) => {
          setTimeout(() => {
            barre.style.width = (barre.dataset.niveau || "0") + "%";
          }, 300);
        });
        obs_barres.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);

const grille_comp = document.getElementById("grille_competences");
if (grille_comp) obs_barres.observe(grille_comp);

// Compteur animé des statistiques
const obs_stats = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".stat_chiffre").forEach((el) => {
        const cible = parseInt(el.dataset.cible, 10) || 0;
        let compteur = 0;
        const pas = Math.max(1, Math.ceil(cible / 35));
        const chrono = setInterval(() => {
          compteur += pas;
          if (compteur >= cible) {
            compteur = cible;
            clearInterval(chrono);
          }
          el.textContent = compteur + "+";
        }, 40);
      });
      obs_stats.unobserve(e.target);
    });
  },
  { threshold: 0.3 },
);

document
  .querySelectorAll(".stats_rangee")
  .forEach((el) => obs_stats.observe(el));

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach((lien) => {
  lien.addEventListener("click", (e) => {
    const cible = document.querySelector(lien.getAttribute("href"));
    if (cible) {
      e.preventDefault();
      cible.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Lien nav actif au scroll
const sections_page = document.querySelectorAll("section[id]");
const liens_nav = document.querySelectorAll(".lien_nav");

function actualiser_nav() {
  let courante = "";
  sections_page.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 90) courante = s.id;
  });
  liens_nav.forEach((l) =>
    l.classList.toggle("actif", l.getAttribute("href") === "#" + courante),
  );
}
window.addEventListener("scroll", actualiser_nav, { passive: true });
actualiser_nav();

// Ombre sur la nav au scroll
const entete = document.getElementById("entete");
window.addEventListener(
  "scroll",
  () => {
    if (!entete) return;
    entete.style.boxShadow =
      window.scrollY > 20 ? "0 4px 24px rgba(0,0,0,.08)" : "";
  },
  { passive: true },
);

// Bouton retour en haut
const bouton_haut = document.getElementById("bouton_haut");
window.addEventListener(
  "scroll",
  () => {
    bouton_haut?.classList.toggle("visible", window.scrollY > 400);
  },
  { passive: true },
);
bouton_haut?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// Effet tilt 3D sur les cartes projet (desktop)
if (window.innerWidth > 768) {
  document.querySelectorAll(".carte_projet").forEach((carte) => {
    carte.addEventListener("mousemove", (e) => {
      const rect = carte.getBoundingClientRect();
      const rot_x =
        ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4;
      const rot_y =
        ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4;
      carte.style.transform = `perspective(900px) rotateX(${rot_x}deg) rotateY(${rot_y}deg) translateY(-9px)`;
    });
    carte.addEventListener("mouseleave", () => {
      carte.style.transform = "";
      carte.style.transition = "transform .5s ease";
      setTimeout(() => {
        carte.style.transition = "";
      }, 500);
    });
  });
}

// Filtre des compétences par domaine
function initialiser_filtres_competences() {
  const boutons = document.querySelectorAll(".filtre_btn");
  const cartes = document.querySelectorAll(".carte_competence");

  boutons.forEach((btn) => {
    btn.addEventListener("click", () => {
      boutons.forEach((b) => {
        b.classList.remove("actif_filtre");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("actif_filtre");
      btn.setAttribute("aria-selected", "true");

      const domaine = btn.dataset.domaine;

      cartes.forEach((carte) => {
        if (domaine === "tous" || carte.dataset.domaine === domaine) {
          carte.classList.remove("masquee");
        } else {
          carte.classList.add("masquee");
        }
      });

      setTimeout(() => {
        cartes.forEach((carte) => {
          if (!carte.classList.contains("masquee")) {
            carte.querySelectorAll(".barre_remplissage").forEach((barre) => {
              barre.style.width = "0";
              setTimeout(() => {
                barre.style.width = (barre.dataset.niveau || "0") + "%";
              }, 100);
            });
          }
        });
      }, 50);
    });
  });
}

// Filtre des projets par catégorie
function initialiser_filtres_projets() {
  const boutons = document.querySelectorAll(".filtre_proj");
  const cartes = document.querySelectorAll(".carte_projet");
  const msg_aucun = document.getElementById("aucun_projet");

  boutons.forEach((btn) => {
    btn.addEventListener("click", () => {
      boutons.forEach((b) => {
        b.classList.remove("actif_filtre_proj");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("actif_filtre_proj");
      btn.setAttribute("aria-selected", "true");

      const cat = btn.dataset.cat;
      let nb_visible = 0;

      cartes.forEach((carte) => {
        const cats = (carte.dataset.cat || "").split(" ");
        const afficher = cat === "tous" || cats.includes(cat);
        carte.classList.toggle("masquee", !afficher);
        if (afficher) nb_visible++;
      });

      if (msg_aucun) msg_aucun.classList.toggle("visible", nb_visible === 0);
    });
  });
}

// Texte animé (machine à écrire) - Version corrigée
function lancer_animation_texte() {
  const el = document.getElementById("texte_anime");
  if (!el) return;

  const mots = [
    "Génie Logiciel",
    "Programmation Orientée Objet",
    "Systèmes d'Information",
    "Bases de Données",
    "Développement d'applications",
  ];

  let i_mot = 0;
  let i_char = 0;
  let supprime = false;

  el.style.borderRight = "2px solid currentColor";
  el.style.paddingRight = "3px";
  el.style.display = "inline-block";
  el.style.minWidth = "0px";
  el.style.width = "auto";

  const style_curseur = document.createElement("style");
  style_curseur.textContent = `
    @keyframes clignoter { 0%,100% { border-color: currentColor; } 50% { border-color: transparent; } }
    #texte_anime { animation: clignoter .8s step-end infinite; }
  `;
  document.head.appendChild(style_curseur);

  function taper() {
    const mot = mots[i_mot];

    if (!supprime) {
      if (i_char <= mot.length) {
        el.textContent = mot.substring(0, i_char);
        i_char++;
        setTimeout(taper, 100);
      } else {
        supprime = true;
        setTimeout(taper, 2000);
      }
    } else {
      if (i_char >= 0) {
        el.textContent = mot.substring(0, i_char);
        i_char--;
        setTimeout(taper, 50);
      } else {
        supprime = false;
        i_mot = (i_mot + 1) % mots.length;
        i_char = 0;
        setTimeout(taper, 100);
      }
    }
  }

  setTimeout(taper, 800);
}

// Formulaire de contact
function initialiser_formulaire() {
  const formulaire = document.getElementById("formulaire_contact");
  const msg_succes = document.getElementById("message_succes");
  const msg_error = document.getElementById("message_error");
  const btn_envoyer = document.getElementById("bouton_envoyer");

  // Fonction de validation
  function validerChamp(champ, type) {
    const valeur = champ.value.trim();
    let valide = true;
    let message = "";

    if (type === "nom") {
      if (valeur === "") {
        message = "Le nom est requis";
        valide = false;
      } else if (valeur.length < 2) {
        message = "Nom trop court (minimum 2 caractères)";
        valide = false;
      }
    } else if (type === "email") {
      const regexEmail = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
      if (valeur === "") {
        message = "L'email est requis";
        valide = false;
      } else if (!regexEmail.test(valeur)) {
        message = "Email invalide (ex: nom@domaine.com)";
        valide = false;
      }
    } else if (type === "objet") {
      if (valeur === "") {
        message = "L'objet est requis";
        valide = false;
      } else if (valeur.length < 3) {
        message = "Objet trop court";
        valide = false;
      }
    } else if (type === "message") {
      if (valeur === "") {
        message = "Le message est requis";
        valide = false;
      } else if (valeur.length < 10) {
        message = "Message trop court (minimum 10 caractères)";
        valide = false;
      }
    }

    const errorSpan = document.getElementById(`error_${type}`);
    if (errorSpan) {
      errorSpan.textContent = message;
    }

    if (valide) {
      champ.classList.remove("invalid");
      champ.classList.add("valid");
    } else {
      champ.classList.remove("valid");
      champ.classList.add("invalid");
    }

    return valide;
  }

  // Validation en temps réel
  const champNom = document.getElementById("champ_nom");
  const champEmail = document.getElementById("champ_email");
  const champObjet = document.getElementById("champ_objet");
  const champMessage = document.getElementById("champ_message");

  if (champNom)
    champNom.addEventListener("input", () => validerChamp(champNom, "nom"));
  if (champEmail)
    champEmail.addEventListener("input", () =>
      validerChamp(champEmail, "email"),
    );
  if (champObjet)
    champObjet.addEventListener("input", () =>
      validerChamp(champObjet, "objet"),
    );
  if (champMessage)
    champMessage.addEventListener("input", () =>
      validerChamp(champMessage, "message"),
    );

  // Submission avec Formspree
  formulaire?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation
    const nomValide = validerChamp(champNom, "nom");
    const emailValide = validerChamp(champEmail, "email");
    const objetValide = validerChamp(champObjet, "objet");
    const messageValide = validerChamp(champMessage, "message");

    // Honeypot
    const honeypot = document.getElementById("honeypot");
    if (honeypot && honeypot.value !== "") {
      msg_succes?.classList.add("visible");
      formulaire.reset();
      setTimeout(() => msg_succes?.classList.remove("visible"), 3000);
      return;
    }

    if (!nomValide || !emailValide || !objetValide || !messageValide) {
      msg_error?.classList.add("visible");
      setTimeout(() => msg_error?.classList.remove("visible"), 3000);
      return;
    }

    if (!btn_envoyer) return;

    btn_envoyer.disabled = true;
    btn_envoyer.innerHTML = `⏳ Envoi en cours...`;

    const formData = new FormData(formulaire);
    formData.append(
      "_subject",
      champObjet?.value.trim() || "Nouveau message du portfolio",
    );

    try {
      const response = await fetch(formulaire.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        btn_envoyer.innerHTML = "✅ Envoyé !";
        btn_envoyer.style.background =
          "linear-gradient(135deg,#22C55E,#16A34A)";
        msg_succes?.classList.add("visible");
        formulaire.reset();

        [champNom, champEmail, champObjet, champMessage].forEach((champ) => {
          if (champ) champ.classList.remove("valid", "invalid");
        });

        setTimeout(() => {
          btn_envoyer.disabled = false;
          btn_envoyer.innerHTML = `Envoyer le message`;
          btn_envoyer.style.background = "";
          msg_succes?.classList.remove("visible");
        }, 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Erreur d'envoi");
      }
    } catch (error) {
      console.error("Erreur:", error);
      btn_envoyer.innerHTML = "❌ Erreur, réessayez";
      msg_error?.classList.add("visible");
      setTimeout(() => {
        btn_envoyer.disabled = false;
        btn_envoyer.innerHTML = `Envoyer le message`;
        msg_error?.classList.remove("visible");
      }, 4000);
    }
  });
}

// Animation footer
const obs_footer = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revele");
        obs_footer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

const footer = document.querySelector(".pied_page");
if (footer) obs_footer.observe(footer);

function ajouterParticulesOrbite() {
  const solarSystem = document.querySelector(".solar-system");
  if (!solarSystem) return;

  // Rayons de base (en pixels)
  const baseRadius = {
    orbit1: 85,
    orbit2: 140,
    orbit3: 195,
  };

  // Fonction pour obtenir le facteur d'échelle selon l'écran
  function getScale() {
    if (window.innerWidth <= 480) return 0.55;
    if (window.innerWidth <= 768) return 0.7;
    if (window.innerWidth <= 968) return 0.85;
    return 1;
  }

  let currentScale = getScale();
  let particles = [];
  let animationId = null;

  // Configuration des particules (rayons de base NON multipliés)
  const orbitesConfig = [
    { radius: baseRadius.orbit1, count: 1, sizes: [5], speeds: [1.2] },
    {
      radius: baseRadius.orbit2,
      count: 4,
      sizes: [4, 5, 3, 6],
      speeds: [0.8, 1.0, 0.6, 1.1],
    },
    { radius: baseRadius.orbit3, count: 2, sizes: [5, 4], speeds: [0.5, 0.7] },
  ];

  // Création des particules
  orbitesConfig.forEach((orbit) => {
    for (let i = 0; i < orbit.count; i++) {
      const angleInitial = (360 / orbit.count) * i;
      const size = orbit.sizes[i % orbit.sizes.length];
      const speed = orbit.speeds[i % orbit.speeds.length];

      const particle = document.createElement("div");
      particle.className = "orbit-particle";
      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";
      particle.style.background = "var(--acc)";
      particle.style.opacity = "0.8";
      particle.style.pointerEvents = "none";
      particle.style.boxShadow = "0 0 4px var(--acc)";
      particle.style.animation = "pulse-particle 2s ease-in-out infinite";

      particles.push({
        element: particle,
        baseRadius: orbit.radius,
        currentRadius: orbit.radius * currentScale,
        angle: angleInitial,
        speed: speed,
      });

      solarSystem.appendChild(particle);
    }
  });

  // Mise à jour des positions des particules
  function updateParticlesPositions() {
    particles.forEach((particle) => {
      const rad = (particle.angle * Math.PI) / 180;
      const x = Math.cos(rad) * particle.currentRadius;
      const y = Math.sin(rad) * particle.currentRadius;
      particle.element.style.left = `calc(50% + ${x}px)`;
      particle.element.style.top = `calc(50% + ${y}px)`;
    });
  }

  // Animation des particules
  function animerParticules() {
    particles.forEach((particle) => {
      particle.angle += particle.speed;
      if (particle.angle >= 360) particle.angle -= 360;
    });
    updateParticlesPositions();
    animationId = requestAnimationFrame(animerParticules);
  }

  // Gestion du redimensionnement
  function handleResize() {
    const newScale = getScale();
    if (newScale !== currentScale) {
      currentScale = newScale;
      particles.forEach((particle) => {
        particle.currentRadius = particle.baseRadius * currentScale;
      });
      updateParticlesPositions();
    }
  }

  window.addEventListener("resize", () => {
    setTimeout(handleResize, 100);
  });

  animerParticules();
}

// Lancement au chargement
document.addEventListener("DOMContentLoaded", () => {
  initialiser_filtres_competences();
  initialiser_filtres_projets();
  lancer_animation_texte();
  initialiser_formulaire();
  ajouterParticulesOrbite();
});

// Nouveaux filtres compétences
const filterBtns = document.querySelectorAll(".filter_btn_new");
const skillCards = document.querySelectorAll(".skill_card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active_filter"));
    btn.classList.add("active_filter");

    const filterValue = btn.getAttribute("data-filter");

    skillCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.classList.remove("hidden_card");
      } else {
        card.classList.add("hidden_card");
      }
    });
  });
});

// Animation des barres de compétences au scroll
const skillBars = document.querySelectorAll(".skill_bar");
const skillsSection = document.querySelector(".section_competences");

const observerSkills = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        });
        observerSkills.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

if (skillsSection) observerSkills.observe(skillsSection);

// Filtres certifications
const certFilterBtns = document.querySelectorAll(".cert_filter_btn");
const certCards = document.querySelectorAll(".cert_card");

certFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    certFilterBtns.forEach((b) => b.classList.remove("active_cert_filter"));
    btn.classList.add("active_cert_filter");

    const filterValue = btn.getAttribute("data-cert-filter");

    certCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-cert-category") === filterValue
      ) {
        card.classList.remove("hidden_cert");
      } else {
        card.classList.add("hidden_cert");
      }
    });
  });
});
