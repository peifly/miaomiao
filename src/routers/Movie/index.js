export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  redirect: `/movie/nowplaying`,
  children: [
    {
      path: 'city',
      component: () => import('@/components/City')
    },
    {
      path: 'nowplaying',
      name: 'nowplaying',
      component: () => import('@/components/Nowplaying')
    },
    {
      path: 'commingsoon',
      name: 'commingsoon',
      component: () => import('@/components/Commingsoon')
    },
    {
      path: 'search',
      component: () => import('@/components/Search')
    }
  ]
}
