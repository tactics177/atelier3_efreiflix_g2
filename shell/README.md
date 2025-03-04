# EFREIFlix Shell - Déploiement sur Vercel

Ce document explique comment déployer l'application shell EFREIFlix sur Vercel.

## Prérequis

1. Un compte Vercel
2. Les micro-frontends déployés sur Vercel ou un autre service d'hébergement
3. Node.js et npm installés localement

## Configuration pour le déploiement

### 1. Configurer les URLs des micro-frontends

Avant de déployer, vous devez configurer les URLs des micro-frontends dans le fichier `.env.production`. Remplacez les URLs par les URLs réelles de vos micro-frontends déployés.

```
# .env.production
CATALOGUE_URL=https://votre-catalogue-url.vercel.app
RECOMMENDATIONS_URL=https://votre-recommendations-url.vercel.app
WATCHLIST_URL=https://votre-watchlist-url.vercel.app
NOTATION_URL=https://votre-notation-url.vercel.app
PREVIEW_URL=https://votre-preview-url.vercel.app
COMMENTS_URL=https://votre-comments-url.vercel.app
USERPROFILE_URL=https://votre-userprofile-url.vercel.app
FAVORIS_URL=https://votre-favoris-url.vercel.app
```

### 2. Déployer sur Vercel

#### Option 1 : Déploiement via l'interface Vercel

1. Connectez-vous à votre compte Vercel
2. Cliquez sur "New Project"
3. Importez votre dépôt Git
4. Configurez le projet :
   - Framework Preset : Other
   - Build Command : `npm run vercel-build`
   - Output Directory : `dist`
5. Cliquez sur "Deploy"

#### Option 2 : Déploiement via la CLI Vercel

1. Installez la CLI Vercel :
   ```
   npm install -g vercel
   ```

2. Connectez-vous à votre compte Vercel :
   ```
   vercel login
   ```

3. Déployez le projet :
   ```
   vercel
   ```

4. Suivez les instructions pour configurer le projet.

## Variables d'environnement sur Vercel

Vous pouvez également configurer les variables d'environnement directement sur Vercel :

1. Allez dans les paramètres de votre projet sur Vercel
2. Cliquez sur "Environment Variables"
3. Ajoutez toutes les variables d'environnement du fichier `.env.production`

## Déploiement des micro-frontends

Chaque micro-frontend doit être déployé séparément sur Vercel ou un autre service d'hébergement. Assurez-vous que les URLs des micro-frontends sont accessibles publiquement et que les fichiers remoteEntry.js sont correctement exposés.

## Développement local

Pour le développement local, utilisez le fichier `.env.local` qui contient les URLs des micro-frontends en développement local.

```
npm start
```

## Build local

Pour construire l'application localement :

```
npm run build
```

Le résultat sera disponible dans le dossier `dist`. 