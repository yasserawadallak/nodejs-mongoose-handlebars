const express = require('express')
const router = express.Router()
const moongose = require('mongoose')
require("../models/Category")
const Category = moongose.model('category')

router.get('/', (req, res) => {
    res.redirect('/admin/category')
})

router.get('/posts', (req, res) =>{
    res.send('Pagina de posts')
})  

 
router.get('/category', (req, res) =>{
    Category.find({}).lean().then((Category) => {
        res.render('admin/category', {Category: Category})
    }).catch((err) => {
        req.flash('error_msg', 'Where is the categorys?')
        res.redirect('/admin')
    })

})

router.get('/category/add', (req, res) =>{
    res.render('admin/addcategory')
})

router.post('/category/add', (req, res) =>{

    var error = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null ){
        error.push({text: "Invalid name"})
    }


    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        error.push({text: 'Invalid slug'})
    }

    if(req.body.name.length < 2){
        error.push({text: 'Name was too small'})
    }

    if(error.length > 0 ){
        res.render('admin/addcategory', {error: error})
    } else{
            
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }
        new Category(newCategory).save().then(() => {
            req.flash('success_msg', 'Category successfully created')
            console.log('Category was createad')
            res.redirect('/admin/category')
        }).catch((err) => {
            req.flash('error_msg', 'Something goes wrong')
            console.log('Something goes wrong' + err)
            res.redirect('/admin/category')
        })
    }

})

router.get('/category/edit/:id', (req, res) => {
    Category.findOne({_id:req.params.id}).lean().then((Category) =>{
        res.render('admin/editcategory', {Category: Category})
        }).catch((err) => {
            res.flash('error_msg', 'No match found' + err)
            res.redirect('/admin/category')
    })

})

router.post('/category/edit', (req, res) => {
    Category.findOne({_id: req.body.id}).then((Category) => {

        Category.name = req.body.name
        Category.slug = req.body.slug

        Category.save().then(() => {
            req.flash('success_msg', 'Category successfully edited')
            res.redirect('/admin/category')
        }).catch((err) => {
            req.flash('error_msg', 'An internal error ocorroed')
        })

    }).catch((err) => {
        req.flash('error_msg', 'Cant finish your edition' + err)
    })
})

router.post('/category/delete', (req, res) => {
    Category.deleteOne  ({_id: req.body.id}).then(() => {
        console.log('Category deleted')
        req.flash('success_msg', 'Category successfuly deleted')
        res.redirect('/admin/category')
    }).catch((err) => {
        console.log('Something goes wrong')
        req.flash('error_msg', 'Something goes wrong' + err)
        req.redirect('/admin/category')
    })
})

router.get('/posts', (req,res) => {
    res.render('admin/posts')

})
router.get('/posts/add', (req,res) => {})
router.get('/posts/edit/:id', (req,res) => {})
router.get('/posts/delete', (req,res) => {})

module.exports = router 