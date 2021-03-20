import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AppStateInterface } from './state'
import { TrainingData } from '../../core/classes/TrainingData'
import { writeToIndexedDb } from '../../core/func/manageIndexedDb'
import { WordsInterface } from '../database/state'

const actions: ActionTree<AppStateInterface, StateInterface> = {
  updateTrainingWord: async ({ commit, state }, userGrade: number) => {
    console.log('update', state.trainer.currentWord, userGrade)

    if (userGrade !== -1) {
      const trainingData = new TrainingData(
        JSON.parse(JSON.stringify(state.trainer.currentWord.trainingData[0]))
      )
      trainingData.addAttempt(userGrade)

      writeToIndexedDb([trainingData], 'database', 'trainingData', true)

      console.log('new interval', trainingData.interval)
      const ind = state.trainer.trainingSet.findIndex(
        item => item.id === state.trainer.currentWord.id
      )
      if (trainingData.interval > 0) {
        commit('removeWordFromTrainingSet', ind)
      } else {
        const updatedWord = JSON.parse(
          JSON.stringify(state.trainer.currentWord)
        )
        updatedWord.trainingData = [trainingData]
        commit('updateWord', { editedWord: updatedWord, ind })
      }
    }
    commit('updateTrainingWord')
  }
}

export default actions
