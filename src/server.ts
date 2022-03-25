import { createConnection } from 'typeorm'
import app from './app'
import connectionConfig from './database/ormconfig'
import 'dotenv/config'

console.log('heroku port******', process.env.PORT)
createConnection(connectionConfig).then(() => {
  const port = process.env.PORT || 5000
  app.listen(port, () =>
    console.log(
      `Server Start On Port ${port}`
    )
  )
}).catch(console.log)


