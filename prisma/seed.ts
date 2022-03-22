import { PrismaClient } from "@prisma/client";
import seedData from "../src/pokemonData.json";
const prisma = new PrismaClient();

const formattedData = seedData.map((pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name.english,
    japanese_name: pokemon.name.japanese,
    chinese_name: pokemon.name.chinese,
    french_name: pokemon.name.french,
    types: pokemon.type,
    hp: pokemon.base.hp,
    attack: pokemon.base.attack,
    defense: pokemon.base.defense,
    special_attack: pokemon.base.special_attack,
    special_defense: pokemon.base.special_defense,
    speed: pokemon.base.speed,
  };
});

async function seeder() {
  // const createManyTypes = await prisma.type.createMany({
  //   data: [
  //     { type: "Grass" },
  //     { type: "Poison" },
  //     { type: "Fire" },
  //     { type: "Flying" },
  //     { type: "Water" },
  //     { type: "Bug" },
  //     { type: "Normal" },
  //     { type: "Electric" },
  //     { type: "Ground" },
  //     { type: "Fairy" },
  //     { type: "Fighting" },
  //     { type: "Psychic" },
  //     { type: "Rock" },
  //     { type: "Steel" },
  //     { type: "Ice" },
  //     { type: "Ghost" },
  //     { type: "Dragon" },
  //     { type: "Dark" },
  //   ],
  //   skipDuplicates: true,
  // });

  const createMany = await prisma.pokemon.createMany({
    data: formattedData,
    skipDuplicates: true, // Skip 'Bobo'
  });
}

seeder()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
