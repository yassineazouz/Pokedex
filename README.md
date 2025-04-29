
# 🧾 Pokédex CLI

Ce projet est réalisé dans le cadre d'un test technique développé avec [Bun](https://bun.sh/), [Prisma](https://www.prisma.io/) et la [PokeAPI](https://pokeapi.co/).  
Il permet de rechercher des Pokémon par nom ou ID, et de les enregistrer localement dans une base SQLite pour éviter les appels API inutiles.

---

## ⚙️ Prérequis

- [Bun](https://bun.sh/) installé (`curl -fsSL https://bun.sh/install | bash`)
- [Node.js](https://nodejs.org/)

---

## 🚀 Installation

1. Clone le repo :

```bash
git clone https://github.com/yassineazouz/Pokedex
cd Pokedex
```

2. Installe les dépendances :

```bash
bun install
```

3. Initialise Prisma :

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## 🕹️ Utilisation

Lance simplement :

```bash
bun index.ts
```

Tu peux ensuite :

- Entrer un nom ou un ID de Pokémon
- Voir ses informations (nom, id, types)
- Réessayer autant de fois que tu veux
- Taper `quit` pour quitter

---

## 🗃️ Exemple d’utilisation

```
🔎 Search Pokémon: pikachu
Fetched from PokeAPI:
Name: pikachu
ID: 25
Types: electric

🔎 Search Pokémon: 25
Found in local Pokédex:
➡Name: pikachu
ID: 25
Types: electric
```
