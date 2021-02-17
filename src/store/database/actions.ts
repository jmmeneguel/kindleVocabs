/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { databaseStateInterface } from './state'
import { getFormatedEntries } from '../../core/func/formatEntries'

const actions: ActionTree<databaseStateInterface, StateInterface> = {
  async updateState () {
    console.log('action')
    const newState = await getFormatedEntries()
    this.commit('databaseModule/updateState', newState)
  }
}

export default actions
