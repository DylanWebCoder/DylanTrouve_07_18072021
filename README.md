Ajouter un fichier .env à la racine du dossier server avec :  
PORT= Le port du serveur  
DB_TABLE_NAME= Le nom du "Schema" dans mysql  
DB_USER= Utilisateur dans sql (par défaut c'est "root")  
DB_PASSWORD= Mot de passe dans sql   
SECRET_TOKEN= Clé secréte aléatoire pour le token  

Pour installer toutes les dépendances, il faut se placer dans chaque dossier server et client, et utiliser "npm install".  
  
Pour lancer l'application : "npm start" dans chaque dossier.  

Pour le front-end : Utilisation de React  
Pour le back-end : Utilisation de Node.js (avec express) et MySql (avec Sequelize)

L'application a plusieurs fonctionnalités : 
- Inscription / Connexion / Déconnexion
- Suppression de son compte
- Création d'un post avec titre et contenu si l'utilisateur est connécté
- Ajout de commentaire sur un post si l'utilisateur est connécté
- Suppression d'un post si l'utilisateur est propriétaire du post ou que l'utilisateur est admin
- Suppression d'un commentaire si l'utilisateur est le propriétaire du commentaire ou que l'utilisateur est admin
- L'utilisateur connécté peut ajouter un like ou enlever un like (si déja like) à un post 
