<template lang="pug">
    .container
        .row
            .col-xs-12
                h1
                  | Posts
                h3
                  | This file will list all posts
                section.panel.panel-success(v-if="posts.length")
                  .panel-heading
                    | list of posts
                  table.table
                    tr
                      th Title
                      th Description
                      th Action
                    tr(v-for="(post,indx) in posts", :key="post.title")
                      td {{post.title}}
                      td {{post.description}}
                      td
                        router-link( :to="{ name: 'EditPost', params: { id: post._id } }" )
                          | edit post
                        button.btn.btn-danger.btn-sm( type="button", @click="removePost(post._id)" )
                          | delete
                section.panel.panel-danger( v-if="!posts.length")
                  p
                    | There are no posts... Lets add one now!
                  div
                    router-link( :to="{name: 'NewPost'}")
                      | add new post
</template>

<script>
    import PostsService from '@/services/PostsService'
    export default {
        name: "PostsPage",
        data() {
            return {
                posts: []
            }
        },
        methods: {
            async getPosts() {
                const response = await PostsService.fetchPosts();
                this.posts = response.data.posts;
            },
            async removePost(id){
                await PostsService.deletePost(id);
                this.getPosts();
            }
        },
        mounted() {
            this.getPosts();
        }
    }
</script>