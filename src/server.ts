import { createConnection } from 'typeorm'
import app from './app'
import connectionConfig from './database/ormconfig'
import 'dotenv/config'

createConnection(connectionConfig).then(() => {
  const port = process.env.PORT || 3001
  console.log('server starting')
  app.listen(port, () =>
    console.log(
      `Server Start On Port ${port}`
    )
  )
}).catch(console.log)


