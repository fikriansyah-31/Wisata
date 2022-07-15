const express = require('express')
// const wisata = require('../../models/wisata')
const router = express.Router()

// Controller:
const { register, login, checkAuth } = require('../controllers/auth')
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { addWisata } = require('../controllers/wisata')





// Authentication
const { auth } = require('../middlewares/auth')
// Upload file
const { uploadFile } = require('../middlewares/uploadFile')


// Route:
// Auth
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

// Wisata
router.post('/wisata', addWisata)

// User
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', auth, updateUser)
router.delete('/user/:id', auth, deleteUser)




module.exports = router