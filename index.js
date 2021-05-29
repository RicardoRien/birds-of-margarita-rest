require('dotenv').config()
const server = require('./api/server')

const PORT = process.env.PORT || 8888

server.listen(PORT, () => {
  console.log(`\n ---- Server is running at http://localhost:${PORT} ---- \n`);
})
