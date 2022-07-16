// import model here
const { user } = require('../../models')

// import package here
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    // our validation schema here
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(6).max(6).required()
    })

    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body)

    // if error exist send validation error message
    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    }

    try {
        const emailExist = await user.findOne({
            where: {
                email: req.body.email
            }
        })

        // return console.log(emailExist);
        if (emailExist) {
            return res.status(400).send({
                status: 'failed',
                message: 'Email already existed'
            })
        }

        // we generate salt (random value) with 10 rounds
        const salt = await bcrypt.genSalt(10)
        // we hash password from request with salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: 'user'
        })

       

        const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_KEY)

        res.status(201).send({
            status: 'success',
            data: {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    token
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.login = async (req, res) => {
    // our validation schema here
    const schema = Joi.object({
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(6).max(12).required(),
    })

    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body)

    // if error exist send validation error message
    if (error) {
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    }

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email
            }
        })

        // return console.log(userExist);
        if (!userExist) {
            return res.status(400).send({
                status: 'failed',
                message: 'Email or password is wrong'
            })
        }

        // compare password between entered from client and from database
        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        // check if not valid then return response with status 400 (bad request)
        if (!isValid) {
            return res.status(400).send({
                status: 'failed',
                message: 'Credential is invalid'
            })
        }

        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY)

        res.status(200).send({
            status: 'success',
            data: {
                user: {
                    name: userExist.name,
                    email: userExist.email,
                    role: userExist.role,
                    token
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id

        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        })

        if (!dataUser) {
            return res.status(404).send({
                status: "failed",
            })
        }

        res.send({
            status: "success",
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                    role: dataUser.role,
                },
            },
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            status: "failed",
            message: "Server Error",
        })
    }
}