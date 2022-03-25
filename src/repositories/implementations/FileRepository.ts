import { FileIdentity } from "../../entities/FileIdentity";
import { AbstractRepository, EntityRepository } from "typeorm";
import { IFileRepository } from "../interfaces/IFileRepository";

@EntityRepository(FileIdentity)
export class FileRepository extends AbstractRepository<FileIdentity> implements IFileRepository {
  async create(fileIdenty: Partial<FileIdentity>): Promise<FileIdentity> {
    return await this.repository.save(fileIdenty)
  }
}