declare class RandomGenerator {
  constructor(customString?: string);
  handleEdgeCases: () => void;
  getRandomIntBetween: (min: number, max: number) => number;
  generateUniqueNumber: (nChars: number) => string;
  increaseLength: (uniqueNumber: string, maxGroups: number) => string;
  getCharFromString: (value: number) => string;
  createVocabulary: (vocabulary: string[]) => void;
  generate: (nChars?: number, vocabulary?: string[]) => string;
  instance: (nChars?: number, vocabulary?: string[]) => () => string;
}

export = RandomGenerator;
