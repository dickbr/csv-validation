import { createExpressServer } from 'routing-controllers'
import { CampaignController } from './controllers/CampaignController'

export default createExpressServer({
  controllers: [CampaignController],
  cors: true,

})