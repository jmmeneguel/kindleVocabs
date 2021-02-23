import { WordInfo } from "src/core/classes/WordInfo";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { databaseStateInterface } from "./state";

interface entryInterface {
  word: string;
  stem: string;
  wordInfo: WordInfo[];
  context: string[];
  status: string;
}

const getters: GetterTree<databaseStateInterface, StateInterface> = {
  filteredEntries: state => filters => {
    function filterBooks(value) {
      if (filters.bookFilter.length === 0) {
        return true;
      } else {
        const bookIds = value.lookUps.map((item) => item.bookId)
        return filters.bookFilter.some((element) => {
          return bookIds.includes(element.value)
        });
      }
    }
    function filterLanguage(value) {
      if (filters.languageFilter.length === 0) {
        return true;
      } else {
        const languages: string[] = filters.languageFilter.map((item) => item.value)
        return languages.includes(value.lang);
      }
    }

    function filterHidden(value) {
      return !value.hidden
    }

    let filteredWords = state.words.filter(filterLanguage);
    filteredWords = filteredWords.filter(filterBooks);
    filteredWords = filteredWords.filter(filterHidden);

    return {
      words: filteredWords,
      books: state.books
    };
  },
  bookOptions: state => {
    const bookOptions = [];
    state.books.forEach(item => {
      bookOptions.push({
        label: item.title,
        value: item.id
      });
    });
    return bookOptions;
  },
  languageOptions: () => {
    return [
      {
        label: "English",
        value: "en"
      },
      {
        label: "German",
        value: "de"
      },
      {
        label: "Portuguese",
        value: "pt"
      }
    ];
  }
};

export default getters;
