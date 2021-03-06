import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'add', component: () => import('pages/AddVocabs.vue') },
      { path: 'browser', component: () => import('pages/VocabBrowser.vue') },
      { path: 'decks', component: () => import('src/pages/VocabDecks.vue') },
      {
        name: 'trainer',
        path: 'trainer',
        component: () => import('src/pages/VocabTrainer.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
