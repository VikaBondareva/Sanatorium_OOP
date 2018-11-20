import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//import Start from '@/components/pages/StartPage'
import Posts from '@/components/pages/PostsPage'
import NewPost from '@/components/pages/NewPostPage'
import EditPost from '@/components/pages/EditPostPage'

Vue.use(Router)

const routes = [
//    {
//      path: '/', name: 'Start', component: Start
//    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts
    },
    {
        path: '/posts/new',
        name: 'NewPost',
        component: NewPost
    },
    {
        path: 'posts/:id',
        name: 'EditPost',
        component: EditPost
    }
  ]

export default new Router({
    mode: 'history',
    routes: routes
})
