import { LookUp } from "../../core/classes/LookUp";
import { TrainingData } from "../../core/classes/TrainingData";
import { WordInfo } from "../../core/classes/WordInfo";
import { BookInfo } from "../../core/classes/BookInfo";

export interface databaseStateInterface {
  words: {
    word: string;
    stem: string;
    meaning: WordInfo[] | undefined;
    lookUps: LookUp[] | undefined;
    trainingData: TrainingData | undefined;
  }[];
  books: BookInfo[];
}

function state(): databaseStateInterface {
  return { words: [], books: [] };
}

export default state;
