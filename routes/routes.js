const express = require('express')
const User = require("../models/user")
const router = express.Router()

router.get('/', (req, res) => {
    User.find().exec((err, users) => {
        if(err){
            res.json({message: err.message})
        }
        else{
            res.render('index', {
                title: "Home Page",
                users: users,
            })
        }
    })
})
router.get('/add', (req, res) => {
    res.render('add_user', {title: "Bukan website"})
})
router.post('/add', (req,res) => {
    const user = new User({
        name: req.body.nama,
        kode: req.body.kode,
        mapel: req.body.mapel
    })
    user.save((err) => {
        if(err){
            res.json({message: err.message, type: 'danger'})
        }
        else {
            req.session.message = {
                type: 'success',
                message: 'user berhasil ditambah'
            }
        res.redirect('/')
        }
    })
})
module.exports = router