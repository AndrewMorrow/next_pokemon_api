import { Pokemon, PrismaClient } from "@prisma/client";
import seedData from "../src/pokemonData.json";
const prisma = new PrismaClient();

const typesArr = [
  { type: "Grass" },
  { type: "Poison" },
  { type: "Fire" },
  { type: "Flying" },
  { type: "Water" },
  { type: "Bug" },
  { type: "Normal" },
  { type: "Electric" },
  { type: "Ground" },
  { type: "Fairy" },
  { type: "Fighting" },
  { type: "Psychic" },
  { type: "Rock" },
  { type: "Steel" },
  { type: "Ice" },
  { type: "Ghost" },
  { type: "Dragon" },
  { type: "Dark" },
];

async function seeder() {
  const deletePokemon = prisma.pokemon.deleteMany();
  const deleteTypes = prisma.type.deleteMany();
  await prisma.$transaction([deletePokemon, deleteTypes]);

  await prisma.type.createMany({
    data: typesArr,
    skipDuplicates: true,
  });

  const dbTypesArr = await prisma.type.findMany();

  const formattedData = seedData.map((pokemon) => {
    const formattedPokemon: Pokemon = {
      id: pokemon.id,
      name: pokemon.name.english,
      japanese_name: pokemon.name.japanese,
      chinese_name: pokemon.name.chinese,
      french_name: pokemon.name.french,
      primary_type: 0,
      secondary_type: null,
      hp: pokemon.base.hp,
      attack: pokemon.base.attack,
      defense: pokemon.base.defense,
      special_attack: pokemon.base.special_attack,
      special_defense: pokemon.base.special_defense,
      speed: pokemon.base.speed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const primary_type = dbTypesArr?.find(
      (type) => type.type === pokemon.type[0]
    );

    if (primary_type) formattedPokemon.primary_type = primary_type?.id;

    if (pokemon.type.length > 1) {
      const secondaryType = dbTypesArr?.find(
        (type) => type.type === pokemon.type[1]
      );

      if (secondaryType) formattedPokemon.secondary_type = secondaryType?.id;
    }
    return formattedPokemon;
  });

  const createMany = await prisma.pokemon.createMany({
    data: formattedData,
  });
  console.log(createMany);
}

seeder()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
