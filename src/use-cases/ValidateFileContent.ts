import { ContactOutput, ValidateFileOutput } from '../dto/ContactOutput';
import { ContactInput } from '../dto/ContactInput';

export class ValidateFileContent {

  async execute({ data, name }: ContactInput): Promise<ValidateFileOutput | undefined> {

    if (!data.length) return undefined
    let countValidMessages = 0
    const outputData = await Promise.all(
      data.map(async ([phone, message]: any): Promise<ContactOutput> => {
        const isValidPhone = phone?.length === 11
        const isValidMessage = message?.length <= 160
        const isValidPositionPhone = phone?.indexOf(`9`, 2) === 2
        const previousMessage = message?.length >= 50 ? message?.slice(0, 50).concat('...') : message
        const isValid = isValidPhone && isValidMessage && isValidPositionPhone

        countValidMessages = isValid ? countValidMessages + 1 : countValidMessages
        return {
          phone,
          isValid,
          originalMessage: message,
          previousMessage
        }
      })
    )

    return {
      name,
      countValidMessages,
      data: outputData
    }
  }

}