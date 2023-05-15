# CIS2201-Class-Project

## Important Links 
1. [Deliverables](https://drive.google.com/drive/folders/1KxLr-nuEIsJ1NMRdx6y6PDaXoMM-g495?usp=sharing)
2. [UI Style Guide](https://drive.google.com/file/d/1KeXOv_WearzkQqlx2MZp-AEtljkELAO8/view?usp=share_link)
3. [Event Manager API Express Server](https://github.com/orbijo/event-manager-api)

Access using usc email ⚠

## Setting Up the Project
1. Clone the project in any local directory you like
Example using the git CLI
```
git clone https://github.com/orbijo/cs2201-g6-ems-module.git
```
2. CD into the root folder
```
cd cs2201-g6-ems-module
```
3. Install dependencies on both client and server
```
// If you're using npm
npm install

// If you're using yarn
yarn
```

4. Run the project
```
// client
npm run dev

// server
npm run start

// If you're using yarn
yarn dev
```

5. Running Seeds
```
// on ther server CLI: (make sure you installed sequelize-cli)
npx sequelize-cli db:seed:all

