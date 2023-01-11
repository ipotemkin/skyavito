import { Image } from '../../../types'

export const difference = (lst1: string[], lst2: string[]): string[] => {
  const set2 = new Set(lst2)
  return lst1.filter(x => !set2.has(x))
}

export const getUrlsFromImages = (data: Image[]): string[] => {
  const res: string[] = []
  data.forEach((image: Image) => {
    if (!image.url.startsWith('data:')) res.push(image.url)
  })
  return res
}

export const getImagesToSave = (data: Image[]): Image[] => 
  data.filter((image: Image) => image.url.startsWith('data:'))
