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

export type Image = {
  id: number
  url: string
}

export type User = {
  id: number
  city: string
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
