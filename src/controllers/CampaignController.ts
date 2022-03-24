import { Response } from "express";
import { Get, JsonController, OnUndefined, Post, Res, UploadedFile } from "routing-controllers";
import 'reflect-metadata'
import { promisify } from "util";
import path from 'path'
import { uploads } from '../config/UploadFile'
import { UploadFileOutput } from "../use-cases/UploadFile";
import { getCustomRepository } from 'typeorm'
import { ContactMessageRepository } from "../repositories/implementations/ContactMessageRepository"
import { FileRepository } from "../repositories/implementations/FileRepository"
import { UploadFiles } from "../use-cases/UploadFile";

@JsonController('/campaign')
export class CampaignController {

  private readonly _contactMessageRepository = getCustomRepository(ContactMessageRepository)
  private readonly _fileRepository = getCustomRepository(FileRepository)

  @OnUndefined(204)
  @Get('/template')
  async getTemplate(@Res() response: Response): Promise<any> {
    const file = path.join(__dirname, '/../template/campanha01.csv');

    await promisify<string, void>(response.download.bind(response))(file)
    return response;
  }

  @Post('/upload')
  async uploadFile(
    @UploadedFile('fileCsv', { options: uploads.options }) csvFile: Express.Multer.File
  ): Promise<UploadFileOutput[]> {
    const uploadFiles = new UploadFiles(
      this._fileRepository,
      this._contactMessageRepository
    )

    return await uploadFiles.execute(csvFile)
  }
}

