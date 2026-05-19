```markdown
# Portfolio - Mouhamadou Lamine Niang

Portfolio moderne et responsive d'étudiant en Génie Logiciel, avec mode clair/sombre, animations 3D et formulaire de contact fonctionnel.

🔗 **Lien du projet en ligne** : [https://mhdlamine21.github.io/Portfollio/](https://mhdlamine21.github.io/Portfollio/)

## Fonctionnalités

- 🌓 Mode clair / sombre (sauvegardé dans localStorage)
- 📱 Design responsive (mobile, tablette, desktop)
- ✨ Animations au scroll (apparition verticale et latérale)
- ⌨️ Effet machine à écrire dans le hero
- 🎯 Filtres dynamiques pour les compétences (Front-end, Back-end, BDD, DevOps, Mobile)
- 📊 Barres de compétences animées avec pourcentages
- 🔢 Compteurs animés pour les statistiques
- 🃏 Effet tilt 3D sur les cartes projets
- 🖱️ Lueur de curseur personnalisée
- 🔝 Bouton retour en haut
- 🧭 Navigation active au scroll
- 📧 Formulaire de contact avec validation et honeypot anti-spam
- 🎨 Système solaire technologique animé (hero section)
- 🎓 Section certifications avec filtres par domaine
- 📜 Timeline interactive pour le parcours
- 📊 Cartes statistiques modernes
- 🔔 Badge "Étudiant" flottant animé
- 🪐 Orbites et arcs orbitaux autour de la photo de profil

## Structure du projet
```

Portfollio/
├── index.html # Page principale
├── style.css # Styles et animations
├── script.js # Interactions JavaScript
├── images/
│ ├── profil.jpg # Photo de profil
│ ├── icons/ # 34 icônes SVG (technologies, réseaux)
│ └── projects/ # Logos des projets
└── documents/
├── CV/ # CV au format PDF
└── certificats/ # Certificats (optionnel)

````

## Icônes et ressources

### Icônes utilisées dans le projet

| Source | Lien | Utilisation |
|--------|------|-------------|
| **Heroicons** | [heroicons.com](https://heroicons.com) | Icônes principales (réseaux, tags, timeline) |
| **Lucide** | [lucide.dev](https://lucide.dev) | Icônes alternatives et certifications |
| **Tabler Icons** | [tabler.io/icons](https://tabler.io/icons) | Icônes techniques et diplômes |


## Installation

```bash
git clone https://github.com/mhdlamine21/Portfollio.git
cd Portfollio
````

Ouvrez `index.html` dans votre navigateur ou utilisez Live Server.

## Personnalisation

### Modifier les informations personnelles

Éditez `index.html` et modifiez :

- Le titre de la page
- La description
- Les liens GitHub et LinkedIn
- L'adresse email du formulaire de contact
- La photo de profil (`images/profil.jpg`)

### Modifier les compétences

Dans `index.html`, ajustez les attributs `data-niveau` (0 à 100) pour chaque compétence :

```html
<div class="skill_bar" data-width="90"></div>
```

### Ajouter une compétence

Copiez un bloc `skill_card` existant et adaptez la catégorie (`data-category`) :

- `frontend` - Technologies front-end
- `backend` - Technologies back-end
- `bdd` - Bases de données
- `devops` - DevOps et outils
- `mobile` - Développement mobile

### Ajouter un projet

Copiez un bloc `article.carte_projet` existant et personnalisez-le.

### Modifier le texte animé

Dans `script.js`, modifiez le tableau `mots` dans la fonction `lancer_animation_texte()` :

```javascript
const mots = [
  "Génie Logiciel",
  "Programmation Orientée Objet",
  "Systèmes d'Information",
  "Bases de Données",
  "Développement d'applications",
];
```

### Ajouter une certification

Dans `index.html`, ajoutez un nouveau bloc `cert_card` :

```html
<a
  href="lien_vers_pdf"
  class="cert_card"
  data-cert-category="categorie"
  target="_blank"
>
  <div class="cert_icon">
    <img src="images/icons/icone.svg" alt="..." width="24" height="24" />
  </div>
  <div class="cert_info">
    <div class="cert_title">Nom de la certification</div>
    <div class="cert_issuer">Organisme émetteur</div>
  </div>
  <div class="cert_badge">Catégorie</div>
  <div class="cert_arrow">...</div>
</a>
```

## Déploiement

Le site est déployé sur **GitHub Pages** : [https://mhdlamine21.github.io/Portfollio/](https://mhdlamine21.github.io/Portfollio/)

### Mettre à jour le site

```bash
git add .
git commit -m "Description des modifications"
git push origin main
```

### Activer GitHub Pages

1. Aller dans **Settings** > **Pages**
2. Source : **Deploy from a branch**
3. Branche : **main** / dossier : **/(root)**
4. Sauvegarder

## Technologies utilisées

| Technologie               | Version | Utilisation                          |
| ------------------------- | ------- | ------------------------------------ |
| HTML5                     | -       | Structure du site                    |
| CSS3                      | -       | Styles, animations, responsive       |
| JavaScript                | ES6+    | Interactions, animations, formulaire |
| Google Fonts              | -       | Polices Syne et Outfit               |
| Intersection Observer API | -       | Animations au scroll                 |
| Formspree                 | -       | Envoi d'emails (anti-spam)           |

## Auteur

**Mouhamadou Lamine Niang** - Étudiant en Génie Logiciel à l'Université Iba Der Thiam de Thiès

- GitHub : [@mhdlamine21](https://github.com/mhdlamine21)
- LinkedIn : [Mouhamadou Lamine Niang](https://www.linkedin.com/in/mouhamadou-lamine-niang-a886a2361/)
- Email : mouhamedlniang@gmail.com

## Remerciements

- [Heroicons](https://heroicons.com) pour les icônes SVG
- [Google Fonts](https://fonts.google.com) pour les typographies
- [Formspree](https://formspree.io) pour le traitement du formulaire

---

© 2026 Mouhamadou Lamine Niang — Software Developer 🇸🇳

```

```
