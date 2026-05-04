# Portfolio — Mouhamadou Lamine Niang
Guide d'utilisation et de personnalisation

## Structure des fichiers

```
portfolio/
├── index.html              → Page principale
├── style.css               → Tous les styles
├── script.js               → Toutes les interactions
└── images/
    ├── icons/              → 34 icônes SVG (langages, frameworks, outils)
    │   ├── html.svg, css.svg, javascript.svg, typescript.svg
    │   ├── react.svg, nextjs.svg, nodejs.svg, python.svg
    │   ├── java.svg, php.svg, laravel.svg, flutter.svg
    │   ├── dart.svg, kotlin.svg, sql.svg, mysql.svg
    │   ├── postgresql.svg, oracle.svg, mongodb.svg, redis.svg
    │   ├── docker.svg, git.svg, github.svg, linkedin.svg
    │   ├── tailwind.svg, prisma.svg, figma.svg
    │   ├── c.svg, cpp.svg, csharp.svg, linux.svg, aws.svg
    │   └── email.svg
    └── projects/           → Logos projets (à remplacer par tes vrais logos)
        ├── codezone.svg, votenow.svg, signalement.svg
        ├── university.svg, deskpilot.svg, voicelingo.svg
        ├── pharmacie.svg, tontine.svg
```

---

## Personnalisation rapide

### 1. Tes infos dans index.html — remplace ces valeurs

| Ce qu'il y a | Ce que tu mets |
|---|---|
| `votre@email.com` | Ton adresse email |
| `votre-username` | Ton pseudo GitHub |
| `votre-profil` | Ton profil LinkedIn |

### 2. Ta photo de profil

Dans index.html, trouve `.avatar_cercle` et remplace le 🧑‍💻 :
```html
<div class="avatar_cercle">
  <img src="images/avatar.jpg" alt="Mouhamadou Lamine Niang" />
</div>
```
Place ta photo `avatar.jpg` dans le dossier `images/`.

### 3. Logos de tes projets

Remplace les fichiers SVG dans `images/projects/` par tes vrais logos PNG/JPG (200×200px recommandé).

### 4. Ton CV PDF

Place `cv.pdf` dans `images/` — le bouton "Télécharger CV" fonctionne automatiquement.

### 5. Ajuster les niveaux de compétences

Dans `index.html`, chaque barre a `data-niveau="XX"` (0 à 100). Change selon ton niveau réel.

### 6. Ajouter une compétence

Copie un bloc `carte_competence` existant et adapte :
```html
<div class="carte_competence comp_XX reveler" data-domaine="frontend">
  <div class="particule_flottante"></div>
  <div class="competence_icone icone_XX">
    <img src="images/icons/montech.svg" alt="Ma Tech" width="28" height="28"/>
  </div>
  <p class="competence_nom">Ma Tech</p>
  <div class="barre_fond"><div class="barre_remplissage barre_XX" data-niveau="75"></div></div>
  <p class="competence_pct">75% — Front-end</p>
</div>
```
Les `data-domaine` possibles : `frontend`, `backend`, `bdd`, `devops`, `mobile`

### 7. Ajouter un projet

Copie un `article.carte_projet` et adapte le `data-cat` :
Les catégories possibles : `web`, `mobile`, `bdd`, `ia`, `systeme`, `poo`
Un projet peut avoir plusieurs catégories séparées par un espace : `data-cat="web bdd"`

---

## Déploiement gratuit

### Vercel (recommandé — 1 min)
1. Crée un compte vercel.com
2. Connecte GitHub → importe le repo
3. URL : `ton-nom.vercel.app`

### Netlify
1. netlify.com → glisse-dépose le dossier
2. URL immédiate

### GitHub Pages
1. Push sur GitHub
2. Settings → Pages → Source: main
3. URL : `username.github.io/portfolio`

---

## Fonctionnalités incluses

- Mode clair / sombre (toggle en nav, sauvegardé)
- Filtre des compétences par domaine (Front-end, Back-end, BDD, DevOps, Mobile)
- Filtre des projets par catégorie (Web, Mobile, BDD, IA, Système, POO)
- Animation machine à écrire dans le hero
- Barres de compétences animées au scroll
- Compteurs animés (stats)
- Effet tilt 3D sur les cartes projet
- Lueur de curseur souris
- Bouton retour en haut
- Nav active au scroll
- Formulaire qui ouvre le client mail avec tous les champs préremplis
- Responsive complet (mobile, tablette, desktop)
- 34 icônes SVG incluses

---

## Checklist avant mise en ligne

- [ ] Remplacer votre@email.com partout
- [ ] Remplacer votre-username (GitHub)
- [ ] Remplacer votre-profil (LinkedIn)
- [ ] Ajouter ta photo images/avatar.jpg
- [ ] Ajouter ton CV images/cv.pdf
- [ ] Remplacer les logos projets dans images/projects/
- [ ] Ajuster les niveaux de compétences (data-niveau)
- [ ] Ajuster les URLs des projets GitHub
- [ ] Tester mode clair ET sombre
- [ ] Tester tous les filtres compétences et projets
- [ ] Tester sur mobile

Université Iba Der Thiam de Thiès 🇸🇳
