/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { databaseStateInterface } from './state'
import { gellAllKeys } from '../../core/func/manageIndexedDb'

const actions: ActionTree<databaseStateInterface, StateInterface> = {
  async updateState () {
    const p1 = gellAllKeys('database', 'words')
    const p2 = gellAllKeys('database', 'lookUps')
    const p3 = gellAllKeys('database', 'bookInfo')
    const p4 = gellAllKeys('database', 'trainingData')

    await Promise.all([p1, p2, p3, p4])
      .then(res => {
        this.commit('databaseModule/updateState', {
          words: res[0],
          lookUps: res[1],
          bookInfo: res[2],
          trainingData: res[3]
        })
      })
      .catch(err => console.log(err))
  }
}

export default actions
