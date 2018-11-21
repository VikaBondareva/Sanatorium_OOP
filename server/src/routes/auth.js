const {User} = require('../models/user-model')
//const AuthenticationController = require('../controllers/AuthenticationController')
//const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const express = require('express')
const router= express.Router()
//const isAuthenticated = require('../policies/isAuthenticated')
//
//module.exports=(app)=>{
//    app.post('/api/register',
//            AuthenticationControllerPolicy.register,
//            AuthenticationController.register)
//    app.post('/api/login', 
//            AuthenticationController.login)
//}

router.post('/api/register', (req,res)=>{
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            patronymic: req.body.patronymic,
            email: req.body.email,
            password: req.body.password
        })
        user.save((err, data)=>{
            if(err){
                console.log(err)
            } else{
                res.send({
                    success: true,
                    message: `User with ID_${data._id} saved successfully!`
                })
            }
        })
})

//router.post('/posts', (req, res)=>{
//    const post = new Post({
//        title: req.body.title,
//        description: req.body.description
//    })
//    post.save((err, data)=>{
//        if(err){
//            console.log(err)
//        } else{
//            res.send({
//                success: true,
//                message: `Post with ID_${data._id} saved successfully!`
//            })
//        }
//    })
//})
//
//router.get('/posts', (req,res)=>{
//    Post.find({}, 'title description', (err,posts)=>{
//        if(err){
//            res.sendStatus(500)
//        } else {
//            res.send({posts: posts})
//        }
//    }).sort({ _id: -1})
//})
//
//router.put('/posts/:id', (req,res)=>{
//    Post.findById(req.params.id, 'title description', (err,post)=>{
//        if(err){
//           console.log(err)
//        } else {
//            if(req.body.title){
//                post.title=req.body.title
//            }
//            if(req.body.description){
//                post.description=req.body.description
//            }
//            post.save(err=>{
//                if (err) {
//                    res.sendStatus(500)
//                } else {
//                    res.sendStatus(200)
//                }
//            })
//        }
//    })
//})
//
//router.get('/posts/:id', (req, res) => {
//  Post.findById(req.params.id, 'title description', (err, post) => {
//    if (err) {
//      res.sendStatus(500)
//    } else {
//      res.send(post)
//    }
//  })
//})
//
//router.delete('/posts/:id', (req, res) => {
//  Post.remove({ _id: req.params.id }, err => {
//    if (err) {
//      res.sendStatus(500)
//    } else {
//      res.sendStatus(200)
//    }
//  })
//})

module.exports=router