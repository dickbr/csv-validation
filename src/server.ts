import { createConnection } from 'typeorm'
import app from './app'
import connectionConfig from './database/ormconfig'
import 'dotenv/config'

async function main(): Promise<void> {
  await createConnection(connectionConfig)
  const port = process.env.PORT || 5000
  app.listen(port, () =>
    console.log(
      `Server Start On Port ${port}`
    )
  )
}

main().catch(console.log)