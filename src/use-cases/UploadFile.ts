import csv from 'csv-parser'
import * as fs from 'fs'
import { IContactMessageRepository } from 'src/repositories/interfaces/IContactMessageRepository';
import { IFileRepository } from "../repositories/interfaces/IFileRepository";

export type UploadFileOutput = {
  phone: string
  previousMessage: string
  isValid: boolean
}

export type CsvContent = {
  '0': string,
  '1': string
}

export class UploadFiles {

  constructor(
    private readonly _fileRepository: IFileRepository,
    private readonly _contactMessageRepository: IContactMessageRepository
  ) { }

  async execute(csvFile: Express.Multer.File): Promise<UploadFileOutput[]> {
    const response: UploadFileOutput[] = [];

    if (!csvFile) return []

    const file = await this._fileRepository.create({
      file_name: csvFile.filename
    })

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFile.path)
        .pipe(csv({ separator: ';', headers: false }))
        .on('error', error => {
          reject(error);
        })
        .on('data', async (data: CsvContent) => {

          if (data[0]) {
            const isValidPhone = data[0].length === 11
            const isValidMessage = data[1].length <= 160
            const isValidPositionPhone = data[0].indexOf(`9`, 2) === 2
            const previousMessage = data[1].length >= 50 ? data[1].slice(0, 50).concat('...') : data[1]

            response.push({
              phone: data[0],
              isValid: isValidPhone && isValidMessage && isValidPositionPhone,
              previousMessage
            })

            await this._contactMessageRepository.create({
              file_id: file.id,
              message: data[1],
              valid: isValidPhone && isValidMessage && isValidPositionPhone,
              phone: data[0]
            })
          }

        })
        .on('end', () => resolve(response));
    })

    return response
  }

}