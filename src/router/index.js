import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SiteLogin from '@/components/SiteLogin'
import SiteMain from '@/components/siteMain'
import SiteMenu from '@/components/SiteMenu'
// nav1
import SiteIndex from '@/components/nav1/SiteIndex'
// nav2
import SiteStatistics from '@/components/nav2/SiteStatistics'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'sitelogin',
      component: SiteLogin
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/sitemenu',
      name: 'sitemenu',
      component: SiteMenu,
      meta: {
        requrireAuth: true
      },
    },
    {
      path: '/sitemain',
      name: 'sitemain',
      component: SiteMain,
      meta: {
        requrireAuth: true
      },children:[
        // nav1
        {
          path: 'siteindex',
          name: 'siteindex',
          component: SiteIndex,
          meta: {
            requrireAuth: true,
            title: "开柜申请"
          }
        },
        {
          path: 'sitestatistics',
          name: 'sitestatistics',
          component: SiteStatistics,
          meta: {
            requrireAuth: true,
            title: "月度统计"
          }
        },
      ]
    },
  ]
})

router.beforeEach((to, from ,next) => {
  if(to.path == '/'){
    next();
  }else if(to.meta.requrireAuth){
    let user = sessionStorage.getItem("SiteId");
    if(user){
      next();
    }else{
      next({
        path:'/'
      });
    }
  }else{
    next();
  }
})

export default router;