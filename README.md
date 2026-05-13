Le problème vient des backticks qui ne sont pas correctement fermés. Voici ton `README.md` corrigé et propre :

```markdown
# Portfolio - Mouhamadou Lamine Niang

Portfolio moderne et responsive d'étudiant en Génie Logiciel, avec mode clair/sombre et animations 3D.

🔗 **Lien du projet en ligne** : [https://mhdlamine21.github.io/Portfollio/](https://mhdlamine21.github.io/Portfollio/)

## Fonctionnalités

- 🌓 Mode clair / sombre (sauvegardé dans localStorage)
- 📱 Design responsive (mobile, tablette, desktop)
- ✨ Animations au scroll (apparition verticale et latérale)
- ⌨️ Effet machine à écrire dans le hero
- 🎯 Filtres dynamiques pour les compétences (Front-end, Back-end, BDD, DevOps, Mobile)
- 📊 Barres de compétences animées
- 🔢 Compteurs animés pour les statistiques
- 🃏 Effet tilt 3D sur les cartes projets (desktop)
- 🖱️ Lueur de curseur personnalisée
- 🔝 Bouton retour en haut
- 🧭 Navigation active au scroll
- 📧 Formulaire de contact avec FormSubmit
- 🎨 Système solaire technologique animé (orbites, planètes, particules)
- 🎨 34 icônes SVG incluses

## Structure du projet
```

Portfollio/
├── index.html
├── style.css
├── script.js
├── images/
│ ├── profil.jpg
│ ├── icons/
│ │ ├── html.svg
│ │ ├── css.svg
│ │ ├── javascript.svg
│ │ ├── python.svg
│ │ ├── java.svg
│ │ ├── php.svg
│ │ ├── flutter.svg
│ │ ├── git.svg
│ │ ├── github.svg
│ │ ├── linkedin.svg
│ │ ├── email.svg
│ │ └── ...
│ └── projects/
│ ├── votenow.svg
│ ├── univ-scheduler.svg
│ └── codezone.svg
└── documents/
├── CV/
│ └── Mon_cv.pdf
└── certificats/

````

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/mhdlamine21/Portfollio.git
````

2. Ouvrir `index.html` dans votre navigateur

## Personnalisation

### Modifier les informations personnelles

Éditez `index.html` et modifiez :

- Le titre de la page
- La description
- Les liens GitHub et LinkedIn
- L'adresse email du formulaire de contact

### Changer la photo de profil

Remplacez le fichier `images/profil.jpg` par votre propre photo.

### Modifier les compétences

Dans `index.html`, ajustez les attributs `data-niveau` (0 à 100) pour chaque compétence.

### Ajouter un projet

Copiez un bloc `article.carte_projet` existant et personnalisez-le.

### Modifier le texte animé

Dans `script.js`, modifiez le tableau `mots` dans la fonction `lancer_animation_texte()`.

### Modifier les couleurs du thème

Les couleurs principales sont définies dans les variables CSS `:root` (mode clair) et `[data-theme="sombre"]` (mode sombre).

## Déploiement

### GitHub Pages

Le site est déjà déployé sur GitHub Pages à l'adresse :
[https://mhdlamine21.github.io/Portfollio/](https://mhdlamine21.github.io/Portfollio/)

Pour mettre à jour :

```bash
git add .
git commit -m "Votre message"
git push origin main
```

## Technologies utilisées

- HTML5
- CSS3 (variables CSS, animations, flexbox, grid)
- JavaScript (ES6+)
- Intersection Observer API
- SVG personnalisés

## Auteur

**Mouhamadou Lamine Niang** - Étudiant en Génie Logiciel à l'Université Iba Der Thiam de Thiès

- GitHub : [@mhdlamine21](https://github.com/mhdlamine21)
- LinkedIn : [Mouhamadou Lamine Niang](https://www.linkedin.com/in/mouhamadou-lamine-niang-a886a2361/)
- Email : mouhamedlniang@gmail.com

---

```

```
