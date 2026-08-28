"use strict";

// Theme par défaut : clair
const theme_sauvegarde = localStorage.getItem("theme") || "clair";
document.documentElement.dataset.theme = theme_sauvegarde;

// Fonction utilitaire d'échappement XSS
function echapperHTML(chaine) {
  if (typeof chaine !== "string") return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return chaine.replace(/[&<>"'/]/g, (char) => map[char]);
}

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
  el.style.display = "inline";
  el.style.maxWidth = "100%";
  el.style.overflowWrap = "break-word";
  el.style.wordBreak = "break-word";

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

// Système Solaire 3D Réaliste avec orbites continues en temps réel et parallaxe
function initialiser_systeme_solaire_3d() {
  const stage = document.getElementById("solar_3d_stage");
  const cosmos = document.getElementById("solar_3d_cosmos");
  const starfield = document.getElementById("starfield_dust");
  const planetNodes = document.querySelectorAll(".planet_3d_node");

  if (!cosmos || !planetNodes.length) return;

  // Calcul des rayons orbitaux selon la largeur d'écran
  function getRadii() {
    const w = window.innerWidth;
    let r1 = 105;
    let r2 = 160;
    let r3 = 220;

    if (w <= 360) {
      r1 = 50;
      r2 = 77;
      r3 = 107;
    } else if (w <= 480) {
      r1 = 57;
      r2 = 87;
      r3 = 120;
    } else if (w <= 768) {
      r1 = 70;
      r2 = 107;
      r3 = 145;
    } else if (w <= 968) {
      r1 = 85;
      r2 = 130;
      r3 = 180;
    }

    return { r1, r2, r3 };
  }

  let radii = getRadii();
  window.addEventListener("resize", () => {
    radii = getRadii();
  });

  // Initialisation des données d'orbite pour chaque planète
  const planetsData = Array.from(planetNodes).map((node) => {
    const orbitNum = parseInt(node.getAttribute("data-orbit"), 10) || 1;
    const speed = parseFloat(node.getAttribute("data-speed")) || 0.02;
    const initialAngleDeg = parseFloat(node.getAttribute("data-angle")) || 0;
    const planetEl = node.querySelector(".planet_3d");

    return {
      node,
      planetEl,
      orbitNum,
      speed,
      angle: (initialAngleDeg * Math.PI) / 180,
    };
  });

  // Création des points lumineux orbitaux (sur les anneaux) et des poussières cosmiques
  const orbitPoints = [];
  const dustParticles = [];

  if (starfield) {
    starfield.innerHTML = "";

    // 1. Points lumineux directement sur les anneaux orbitaux
    const orbitConfigs = [
      { orbitNum: 1, count: 3, speed: 0.035, size: 6 },
      { orbitNum: 2, count: 5, speed: -0.022, size: 5.5 },
      { orbitNum: 3, count: 7, speed: 0.014, size: 5 },
    ];

    orbitConfigs.forEach((cfg) => {
      for (let i = 0; i < cfg.count; i++) {
        const p = document.createElement("div");
        p.className = "orbit_luminous_point";
        p.style.width = `${cfg.size}px`;
        p.style.height = `${cfg.size}px`;
        starfield.appendChild(p);

        const initialAngle = (i * (360 / cfg.count) * Math.PI) / 180;
        orbitPoints.push({
          element: p,
          orbitNum: cfg.orbitNum,
          speed: cfg.speed,
          angle: initialAngle,
        });
      }
    });

    // 2. Poussières cosmiques libres en gravitation
    const nbPoussieres = 26;
    for (let i = 0; i < nbPoussieres; i++) {
      const p = document.createElement("div");
      p.className = "dust_particle";
      const taille = Math.random() * 3 + 2;
      const baseRadius = 40 + Math.random() * 195;
      const angle = Math.random() * Math.PI * 2;
      // Vitesse selon distance orbitale
      const baseSpeed = (0.01 + Math.random() * 0.018) * (130 / baseRadius);
      const direction = Math.random() > 0.2 ? 1 : -1;
      const speed = baseSpeed * direction;
      const z = (Math.random() - 0.5) * 40;

      p.style.width = `${taille}px`;
      p.style.height = `${taille}px`;
      starfield.appendChild(p);

      dustParticles.push({
        element: p,
        baseRadius,
        angle,
        speed,
        z,
      });
    }
  }

  let isHovered = false;
  cosmos.addEventListener("mouseenter", () => { isHovered = true; });
  cosmos.addEventListener("mouseleave", () => { isHovered = false; });

  // Boucle d'animation orbitale fluide et continue
  let lastTime = performance.now();

  function animerOrbite(currentTime) {
    const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
    lastTime = currentTime;

    const speedMultiplier = isHovered ? 0.35 : 1;

    // 1. Gravitation continue des planètes
    planetsData.forEach((p) => {
      p.angle += p.speed * speedMultiplier * delta * 50;

      let r = radii.r1;
      if (p.orbitNum === 2) r = radii.r2;
      else if (p.orbitNum === 3) r = radii.r3;

      const x = Math.cos(p.angle) * r;
      const y = Math.sin(p.angle) * r;

      p.node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px)`;

      if (Math.sin(p.angle) > 0) {
        p.node.style.zIndex = "150";
        if (p.planetEl) p.planetEl.style.opacity = "1";
      } else {
        p.node.style.zIndex = "20";
        if (p.planetEl) p.planetEl.style.opacity = "0.9";
      }
    });

    // 2. Gravitation continue des points lumineux sur les anneaux
    orbitPoints.forEach((op) => {
      op.angle += op.speed * speedMultiplier * delta * 50;

      let r = radii.r1;
      if (op.orbitNum === 2) r = radii.r2;
      else if (op.orbitNum === 3) r = radii.r3;

      const x = Math.cos(op.angle) * r;
      const y = Math.sin(op.angle) * r;

      op.element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px)`;

      if (Math.sin(op.angle) > 0) {
        op.element.style.zIndex = "140";
        op.element.style.opacity = "1";
      } else {
        op.element.style.zIndex = "18";
        op.element.style.opacity = "0.75";
      }
    });

    // 3. Gravitation continue des poussières cosmiques
    const scaleRatio = radii.r3 / 220;
    dustParticles.forEach((d) => {
      d.angle += d.speed * speedMultiplier * delta * 45;
      const curRadius = d.baseRadius * scaleRatio;
      const dx = Math.cos(d.angle) * curRadius;
      const dy = Math.sin(d.angle) * curRadius;

      d.element.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, ${d.z.toFixed(1)}px)`;

      if (Math.sin(d.angle) > 0) {
        d.element.style.zIndex = "130";
      } else {
        d.element.style.zIndex = "15";
      }
    });

    requestAnimationFrame(animerOrbite);
  }

  requestAnimationFrame(animerOrbite);

  // Parallaxe 3D interactive au mouvement de la souris (desktop)
  if (stage && window.innerWidth > 768) {
    let currentTiltX = 58;
    let currentTiltZ = -16;
    let targetTiltX = 58;
    let targetTiltZ = -16;

    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = 58 - ny * 18;
      targetTiltZ = -16 + nx * 22;
    });

    stage.addEventListener("mouseleave", () => {
      targetTiltX = 58;
      targetTiltZ = -16;
    });

    function updateCosmosTilt() {
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltZ += (targetTiltZ - currentTiltZ) * 0.08;
      cosmos.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateZ(${currentTiltZ.toFixed(2)}deg)`;
      requestAnimationFrame(updateCosmosTilt);
    }
    requestAnimationFrame(updateCosmosTilt);
  }
}

// Initialisation de la modale de lecture des certificats
function initialiser_modal_certificats() {
  const modal = document.getElementById("modal_certificat");
  const btnFermer = document.getElementById("modal_cert_fermer");
  const btnFermerBas = document.getElementById("modal_btn_fermer");
  const iframePdf = document.getElementById("modal_pdf_iframe");
  const containerPdf = document.getElementById("modal_pdf_container");
  const containerInfo = document.getElementById("modal_info_container");
  const titreEl = document.getElementById("modal_cert_titre");
  const emetteurEl = document.getElementById("modal_cert_emetteur");
  const badgeEl = document.getElementById("modal_cert_badge");
  const btnTelecharger = document.getElementById("modal_btn_telecharger");
  const btnOuvrir = document.getElementById("modal_btn_ouvrir");
  const quickOpen = document.getElementById("modal_quick_open");
  const infoTitre = document.getElementById("modal_info_titre");
  const infoDesc = document.getElementById("modal_info_desc");
  const infoTags = document.getElementById("modal_info_tags");

  if (!modal) return;

  function fermerModal() {
    modal.classList.remove("actif");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (iframePdf) iframePdf.src = "";
  }

  function ouvrirModal(carte) {
    const title = carte.getAttribute("data-cert-title") || carte.querySelector(".cert_title")?.textContent.trim() || "Certification";
    const issuer = carte.getAttribute("data-cert-issuer") || carte.querySelector(".cert_issuer")?.textContent.trim() || "";
    const badge = carte.getAttribute("data-cert-badge") || carte.querySelector(".cert_badge")?.textContent.trim() || "Diplôme";
    const rawPdfUrl = carte.getAttribute("data-cert-pdf") || (carte.getAttribute("href") && carte.getAttribute("href") !== "#" ? carte.getAttribute("href") : "");
    const pdfUrl = rawPdfUrl ? encodeURI(rawPdfUrl) : "";
    const desc = carte.getAttribute("data-cert-desc") || "Attestation et validation officielle des compétences.";
    const tagsStr = carte.getAttribute("data-cert-tags") || "";

    if (titreEl) titreEl.textContent = title;
    if (emetteurEl) emetteurEl.textContent = issuer;
    if (badgeEl) badgeEl.textContent = badge;

    if (pdfUrl && pdfUrl.toLowerCase().includes(".pdf")) {
      if (containerPdf) containerPdf.style.display = "flex";
      if (containerInfo) containerInfo.style.display = "none";
      if (iframePdf) iframePdf.src = pdfUrl + "#toolbar=1&navpanes=0";

      if (quickOpen) {
        quickOpen.href = pdfUrl;
      }

      if (btnTelecharger) {
        btnTelecharger.style.display = "inline-flex";
        btnTelecharger.href = pdfUrl;
        btnTelecharger.setAttribute("download", title.replace(/[^a-zA-Z0-9_-]/g, "_") + ".pdf");
      }
      if (btnOuvrir) {
        btnOuvrir.style.display = "inline-flex";
        btnOuvrir.href = pdfUrl;
      }
    } else {
      if (containerPdf) containerPdf.style.display = "none";
      if (containerInfo) containerInfo.style.display = "flex";
      if (infoTitre) infoTitre.textContent = title;
      if (infoDesc) infoDesc.textContent = desc;

      if (infoTags) {
        infoTags.innerHTML = "";
        if (tagsStr) {
          tagsStr.split(",").forEach((tag) => {
            const span = document.createElement("span");
            span.className = "modal_info_tag";
            span.textContent = tag.trim();
            infoTags.appendChild(span);
          });
        }
      }

      if (btnTelecharger) btnTelecharger.style.display = "none";
      if (btnOuvrir) {
        const directHref = carte.getAttribute("href");
        if (directHref && directHref !== "#") {
          btnOuvrir.style.display = "inline-flex";
          btnOuvrir.href = directHref;
        } else {
          btnOuvrir.style.display = "none";
        }
      }
    }

    modal.classList.add("actif");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  document.querySelectorAll(".cert_card").forEach((carte) => {
    carte.addEventListener("click", (e) => {
      e.preventDefault();
      ouvrirModal(carte);
    });
  });

  btnFermer?.addEventListener("click", fermerModal);
  btnFermerBas?.addEventListener("click", fermerModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) fermerModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("actif")) {
      fermerModal();
    }
  });
}

// Démarrage sécurisé au chargement
function demarrerApplication() {
  initialiser_filtres_competences();
  initialiser_filtres_projets();
  lancer_animation_texte();
  initialiser_formulaire();
  initialiser_systeme_solaire_3d();
  initialiser_modal_certificats();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", demarrerApplication);
} else {
  demarrerApplication();
}

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
