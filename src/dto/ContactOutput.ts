export class ContactOutput {
  phone!: string
  previousMessage!: string
  originalMessage?: string
  isValid!: boolean
}

export class ValidateFileOutput {
  name!: string
  countValidMessages!: number
  data!: ContactOutput[]
}