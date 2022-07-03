import { createTestGenre } from "./create-test-genre.js";

const genre = {
  name: "Post-punk",
  description:
    "Style of rock music inspired by punk but less aggressive in performance and musically more experimental.",
  country: "United Kingdom",
  year: 1978,
  id: undefined,
};

// const responceGenre = await createTestGenre(genre);
// const genreResponce = responceGenre?.data?.createGenre;
// genre.id = genreResponce.id;

export const testBand = {
  name: "Хуго-Уго",
  origin: "Тольятти",
  members: [
    {
      name: "Максим Котомцев",
      instrument: "вокал, гитара",
      years: ["1990", "1991", "1992"],
    },
    {
      name: "Владимир Краснощеков",
      instrument: "бас",
      years: ["1990", "1991", "1992"],
    },
    {
      name: "Павел Шпуров",
      instrument: "барабаны",
      years: ["1991", "1992"],
    },
  ],
  website: "https://xygo-ygo.blogspot.com/",
  genresIds: [] as string[],
  id: undefined,
};
