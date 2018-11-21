import api from '@/services/api'

export default {
//    fetchPosts(){
//        return api().get('posts')
//    },
//    addPost (params) {
//        return api().post('posts', params)
//    },
//    editPost(params){
//        return api().put(`posts/${params.id}`, params)
//    },
//    getPost(params){
//        return api().get(`posts/${params.id}`)
//    },
//    deletePost(id){
//        return api().delete(`posts/${id}`)
//    },
    register(formData){
        api().post('api/register', formData)
    },
    login (credentials) {
        return api().post('api/login', credentials)
    }
}