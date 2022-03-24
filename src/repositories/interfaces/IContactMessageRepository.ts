import { ContactMessageIdentity } from "../../entities/ContactMessageIdentity";

export interface IContactMessageRepository {
  create: (contactMessage: Partial<ContactMessageIdentity>) => Promise<ContactMessageIdentity>
}