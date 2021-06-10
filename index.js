require('dotenv').config()
const app = require('./api/app')

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`\n ---- Server is running at http://localhost:${PORT} ---- \n`);
})
