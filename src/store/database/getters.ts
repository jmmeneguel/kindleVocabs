import { WordInfo } from 'src/core/classes/WordInfo'
import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { databaseStateInterface } from './state'

interface entryInterface {
  word: string,
  stem: string,
  wordInfo: WordInfo[],
  context: string[],
  status: string
}

const getters: GetterTree<databaseStateInterface, StateInterface> = {
  formatedEntries (state): entryInterface[] {
    return [{
      word: 'Abbildung',
      stem: 'Abbildung',
      wordInfo: [],
      context: ['Abbildung'],
      status: 'New'
    }]
  }
}

export default getters