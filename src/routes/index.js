const express = require('express')
// const wisata = require('../../models/wisata')
const router = express.Router()

// Controller:
const { register, login, checkAuth } = require('../controllers/auth')

const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { addWisata, getWisatas, getWisata, updateWisatas, deleteWisatas} = require('../controllers/wisata')

// Authentication
const { auth } = require('../middlewares/auth')
// Upload file
const { uploadFiles } = require('../middlewares/uploadFiles')


// Route:

// Auth
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

// Wisata
router.post('/wisata', auth, uploadFiles( 'photo'), addWisata)
router.get('/wisatas', getWisatas)
router.get('/wisata/:id', auth, getWisata)
router.patch('/wisata/:id', auth, uploadFiles( 'photo'), updateWisatas)
router.delete('/wisata/:id', auth, deleteWisatas)

// User
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', auth, updateUser)
router.delete('/user/:id', auth, deleteUser)




module.exports = router