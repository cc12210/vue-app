import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Movie from '../pages/movie/Movie'
import Cinema from '../pages/cinema/Cinema'
import Mine from '../pages/mine/Mine'
import MovieInfo from '../pages/movieInfo/MovieInfo'
import cityPage from '../pages/cityPage/cityPage'

export default new Router({
  routes: [{
      path: '/movie',
      component: Movie,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/cinema',
      component: Cinema,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/movieInfo',
      name: 'movieInfo',
      component: MovieInfo,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/citypage',
      component: cityPage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})