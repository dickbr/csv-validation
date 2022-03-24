import { ContactOutput } from '../dto/ContactOutput';
import { ContactInput } from '../dto/ContactInput';
import { IContactMessageRepository } from '../repositories/interfaces/IContactMessageRepository';
import { IFileRepository } from "../repositories/interfaces/IFileRepository";

export class SaveContacts {

  constructor(
    private readonly _fileRepository: IFileRepository,
    private readonly _contactMessageRepository: IContactMessageRepository
  ) { }

  async execute({ name, data }: ContactInput): Promise<ContactOutput[]> {

    if (!data.length) return []

    const file = await this._fileRepository.create({
      file_name: name.concat(Date.now().toString())
    })

    return await Promise.all(
      data.map(async ([phone, message]: any): Promise<ContactOutput> => {
        const isValidPhone = phone?.length === 11
        const isValidMessage = message?.length <= 160
        const isValidPositionPhone = phone?.indexOf(`9`, 2) === 2
        const previousMessage = message?.length >= 50 ? message?.slice(0, 50).concat('...') : message

        if (phone && message) {
          await this._contactMessageRepository.create({
            file_id: file.id,
            message,
            valid: isValidPhone && isValidMessage && isValidPositionPhone,
            phone
          })
        }

        return {
          phone,
          isValid: isValidPhone && isValidMessage && isValidPositionPhone,
          previousMessage
        }
      })
    )
  }

}