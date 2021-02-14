import { MutationTree } from 'vuex'
import { databaseStateInterface } from './state'

const mutation: MutationTree<databaseStateInterface> = {
  updateState (state: databaseStateInterface, newState: databaseStateInterface) {
    state.words = newState.words
    state.lookUps = newState.lookUps
    state.bookInfos = newState.bookInfos
    state.trainingData = newState.trainingData
  }
}

export default mutation
