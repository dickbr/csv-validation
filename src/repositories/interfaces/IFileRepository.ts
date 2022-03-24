import { FileIdentity } from "../../entities/FileIdentity";

export interface IFileRepository {
  create: (fileIdenty: Partial<FileIdentity>) => Promise<FileIdentity>
}