export type Member = {
username: any
  id: string
  dateOfBirth: string
  displayName: string
  imageUrl? : string
  created: string
  lastActive: string
  gender: string
  description?: string
  city: string
  country: string
}

export type Photo = {
  id: number
  url: string
  publicId: any
  memberId: string
}

export type EditableMember = {
  displayName: string
  city: string
  country: string
  description?: string
}