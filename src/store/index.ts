import { store } from 'quasar/wrappers'
import Vuex from 'vuex'

import databaseModule from './database'
import { DatabaseStateInterface } from './database/state'

import appModule from './app'
import { AppStateInterface } from './app/state'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  databaseModule: DatabaseStateInterface
  appModule: AppStateInterface
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  // example: unknown;
}

export default store(function({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      databaseModule,
      appModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  })

  return Store
})
