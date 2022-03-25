import { createConnection } from 'typeorm'
import app from './app'
import connectionConfig from './database/ormconfig'
import 'dotenv/config'

console.log(process.env.PORT)
async function main(): Promise<void> {
  console.log(process.env.PORT)
  await createConnection(connectionConfig)
  const port = process.env.PORT || 5000
  app.listen(port, () =>
    console.log(
      `Server Start On Port ${port}`
    )
  )
}

main().catch(console.log)