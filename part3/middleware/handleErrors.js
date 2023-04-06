module.exports = (error, request, response, next) => {
  console.log(error) // esto se puede enviar a un servicio de logs

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else {
    response.status(500).end()
  }
}
