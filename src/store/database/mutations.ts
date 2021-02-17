import { MutationTree } from 'vuex'
import { databaseStateInterface } from './state'

const mutation: MutationTree<databaseStateInterface> = {
  updateState (state: databaseStateInterface, newState: databaseStateInterface) {
    state = newState
    console.log('mutation', newState)
  }
}

export default mutation
