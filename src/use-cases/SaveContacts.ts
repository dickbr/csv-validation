import { ContactOutput } from '../dto/ContactOutput';
import { ContactInput } from '../dto/ContactInput';
import { IContactMessageRepository } from '../repositories/interfaces/IContactMessageRepository';
import { IFileRepository } from "../repositories/interfaces/IFileRepository";
import { ValidateFileContent } from './ValidateFileContent';
import { SaveContactInput } from '../dto/SaveContactInput';

export class SaveContacts {

  constructor(
    private readonly _fileRepository: IFileRepository,
    private readonly _contactMessageRepository: IContactMessageRepository
  ) { }

  async execute({ name, data }: SaveContactInput): Promise<void> {

    if (!data.length) throw new Error("Arquivo invalido");

    const file = await this._fileRepository.create({
      file_name: name.concat(Date.now().toString())
    })

    await Promise.all(
      data.map(async ({ phone, originalMessage, isValid }) => {
        if (phone && originalMessage) {
          await this._contactMessageRepository.create({
            file_id: file.id,
            message: originalMessage,
            valid: isValid,
            phone
          })
        }
      })
    )
  }
}