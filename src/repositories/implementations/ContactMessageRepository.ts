import { AbstractRepository, EntityRepository } from "typeorm";
import { ContactMessageIdentity } from "../../entities/ContactMessageIdentity";
import { IContactMessageRepository } from "../interfaces/IContactMessageRepository";

@EntityRepository(ContactMessageIdentity)
export class ContactMessageRepository extends AbstractRepository<ContactMessageIdentity> implements IContactMessageRepository {
  async create(contactMessage: Partial<ContactMessageIdentity>): Promise<ContactMessageIdentity> {
    return await this.repository.save(contactMessage)
  }
}