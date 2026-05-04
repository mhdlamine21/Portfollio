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

// Texte animé (machine à écrire)
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

  const style_curseur = document.createElement("style");
  style_curseur.textContent = `
    @keyframes clignoter { 0%,100% { border-color: currentColor; } 50% { border-color: transparent; } }
    #texte_anime { animation: clignoter .8s step-end infinite; }
  `;
  document.head.appendChild(style_curseur);

  function taper() {
    const mot = mots[i_mot];
    const txt = supprime
      ? mot.substring(0, i_char - 1)
      : mot.substring(0, i_char + 1);
    el.textContent = txt;
    supprime ? i_char-- : i_char++;

    let delai = supprime ? 55 : 95;
    if (!supprime && i_char === mot.length) {
      delai = 2200;
      supprime = true;
    } else if (supprime && i_char === 0) {
      supprime = false;
      i_mot = (i_mot + 1) % mots.length;
      delai = 400;
    }

    setTimeout(taper, delai);
  }

  setTimeout(taper, 1400);
}

// Formulaire de contact
function initialiser_formulaire() {
  const formulaire = document.getElementById("formulaire_contact");
  const msg_succes = document.getElementById("message_succes");
  const btn_envoyer = document.getElementById("bouton_envoyer");

  formulaire?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!btn_envoyer) return;

    btn_envoyer.disabled = true;
    btn_envoyer.innerHTML = `⏳ Envoi en cours...`;

    const formData = new FormData(formulaire);
    formData.append("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mouhamedlniang@gmail.com",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        btn_envoyer.innerHTML = "✅ Envoyé !";
        btn_envoyer.style.background =
          "linear-gradient(135deg,#22C55E,#16A34A)";
        msg_succes?.classList.add("visible");
        formulaire.reset();

        setTimeout(() => {
          btn_envoyer.disabled = false;
          btn_envoyer.innerHTML = `Envoyer le message`;
          btn_envoyer.style.background = "";
          msg_succes?.classList.remove("visible");
        }, 5000);
      } else {
        throw new Error("Erreur d'envoi");
      }
    } catch (error) {
      btn_envoyer.innerHTML = "❌ Erreur, réessayez";
      setTimeout(() => {
        btn_envoyer.disabled = false;
        btn_envoyer.innerHTML = `Envoyer le message`;
      }, 3000);
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

// Lancement au chargement
document.addEventListener("DOMContentLoaded", () => {
  initialiser_filtres_competences();
  initialiser_filtres_projets();
  lancer_animation_texte();
  initialiser_formulaire();
});
