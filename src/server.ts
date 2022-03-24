import { createConnection } from 'typeorm'
import app from './app'
import connectionConfig from './database/ormconfig'
import 'dotenv/config'

async function main(): Promise<void> {
  await createConnection(connectionConfig)
  app.listen(process.env.PORT, () =>
    console.log(
      `Server Start On Port ${process.env.PORT}`
    )
  )
}

main().catch(console.log)