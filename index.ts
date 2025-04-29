import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import readline from 'readline-sync';

const prisma = new PrismaClient();

async function startPokedex() {
    console.log("Welcome to the Pokédex CLI!");
    console.log('Type a Pokémon name or ID to look it up. Type "quit" to exit.\n');

    while (true) {
        const userInput = readline.question('🔎 Search Pokémon: ').toLowerCase().trim();

        if (userInput === "quit") {
            console.log("See you next time!");
            break;
        }

        // Try to find in local DB first
        const pokemonFromDb = await prisma.pokemon.findFirst({
            where: {
                OR: [
                    { name: userInput },
                    { id: Number(userInput) || -1 }
                ]
            }
        });

        if (pokemonFromDb) {
            console.log(`Found in local Pokédex:`);
            console.log(`Name: ${pokemonFromDb.name}`);
            console.log(`ID: ${pokemonFromDb.id}`);
            console.log(`Types: ${pokemonFromDb.types}`);
        } else {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`);
                const { id, name, types } = res.data;
                const typeList = types.map((t: any) => t.type.name).join(', ');

                // Save to DB
                await prisma.pokemon.create({
                    data: {
                        id,
                        name,
                        types: typeList
                    }
                });

                console.log(`Fetched from PokeAPI:`);
                console.log(`Name: ${name}`);
                console.log(`ID: ${id}`);
                console.log(`Types: ${typeList}`);
            } catch {
                console.error("❌ Pokémon not found. Check the name or ID and try again.");
            }
        }

        console.log('----------------------------------------\n');
    }

    await prisma.$disconnect();
}

startPokedex();