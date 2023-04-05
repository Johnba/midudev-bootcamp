// Middleware
const logger = (request, response, next) => {
  console.log('--------- JB --------')
  console.log('request method: ', request.method)
  console.log('request path: ', request.path)
  console.log('request body: ', request.body)
  console.log('---------------------')
  next()
}

// app.use(logger)

module.exports = logger
