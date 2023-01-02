export type CardType = {
  id?: number
  image: string
  title: string
  price: number
  place: string
  date: string
  description?: string
  images?: Image[]
  created_on?: string
  user?: User
}

export type CreateAd =  {
  title: string
  price: number
  description?: string
}

export type CreateAdForm =  {
  [index: string]: string
  title: string
  price: string
  description: string
}

export type CreateAdArgs = {
  params: CreateAd
  body: { files: FormData[] }
}

export type AdImageToAdArgs = {
  idx: number
  body: FormData
}

export type Image = {
  id: number
  url: string
  file: Blob | null
}

export type User = {
  id?: number
  email: string
  name?: string
  surname?: string
  phone?: string
  city?: string
  avatar?: string
  sells_from?: string
}

export type UpdateUser = {
  name?: string
  surname?: string
  phone?: string
  city?: string
}

export type Product = {
  image: string
  title: string
  price: string
}

export type ImgBarType = {
  selectedId: number
  imageUrls: string[]
}

export type Review = {
  id: number
  text: string
  created_on: string
  author: User
}

export type Credentials = {
  email: string
  password: string
}

export type Tokens = {
  access_token?: string
  refresh_token?: string
  token_type?: string
}
