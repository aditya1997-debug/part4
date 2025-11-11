const dotenv = require('dotenv')
dotenv.config()
const logger = require('./logger')
const jwt = require('jsonwebtoken')


const errorHandler = (error, request, response, next) => {
  // console.log('error handler middleware loaded')
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'MongooseError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}


const tokenExtractor = (request, response, next) => {
  // console.log('Middleware tokenExtractor called')
  const authorization = request.get('authorization')
  // console.log('Middleware tokenExtractor:', authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    // console.log('Extracted token:', request.token)
  }
  next()

}

const userExtractor = (request, response, next) => {
  // console.log('Middleware userExtractor called')

  const verify_token = jwt.verify(request.token, process.env.SECRET)
  // console.log('Verified Token:', verify_token)
  request.user = verify_token.id
  // console.log('Extracted user id:', request.user)
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}