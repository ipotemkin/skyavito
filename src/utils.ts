import { Image } from './types'

export const prettyDate = (timeISOstring: string) => {
  const now = new Date()
  const offsetMin = now.getTimezoneOffset()
  const date = new Date(Date.parse(timeISOstring) - offsetMin * 60000)

  const today = now.toDateString()
  const argDate = date.toDateString()
  const diff = new Date(today).getTime() - new Date(argDate).getTime()
  
  const timeStr = date.toLocaleTimeString().slice(0, -3)
  
  return (
    today === argDate && 'Сегодня в ' + timeStr ||
    diff <= 86400000 && 'Вчера в ' + timeStr ||
    date.toLocaleString().slice(0, -3)
  )
}

export const formatString = (text: string, args: string[]) => {
  let res = text
  for (const arg of args) res = res.replace(/{}/, arg)
  return res
}

// генератор списка изображений для объявления
// используется для формирования начального (пустого) списка нужной структуры
export const getImageLst = (count = 5): Image[] => {
  const res = []
  for (let i = 0; i < count; i++) res.push({ id: i, url: '', file: null })
  return res
}

export const getMaxIndex = (images: Image[]) => {
  let maxInd = 0
  images.forEach(image => {
    maxInd = image.id > maxInd ? image.id : maxInd
  })
  return maxInd
}

export const parseJWT = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(base64)
}

export const getUserIdFromJWT = (token: string) => {
  return parseJWT(token).user_id
}

export const getUserEmailFromJWT = (token: string) => {
  return parseJWT(token).email
}

export const getJWTExpTime = (token: string) => {
  return new Date(+parseJWT(token).exp*1000)
}

export const checkJWTExpTime = (token: string) => {
  return new Date() < getJWTExpTime(token)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryErrorStatus = (error: any) => {
  if (error && 'status' in error) return error.status
  return undefined
}

type MonthsType = {
  [index: string]: string
}

const months: MonthsType = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря',
}

export const formatSellsFrom = (date: string) => {
 const date_split = date.split('-')
 const year = date_split[0]
 
 if (date_split.length < 2) return year
 
 const month = date_split[1]
 const msg = months[month] + ' ' + year
 return msg
}

export const titleCase = (text?: string) => {
  if (!text) return text
  return text[0].toUpperCase() + text.slice(1)
}