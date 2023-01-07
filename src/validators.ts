export const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i)

export const validatePrice = (price: string) => price.replace(/[^0-9]/g, '')

// phone =====================================================================

export const clearPhone = (ph = '') => {
  const num = '+0123456789'
  const res = []
  for(const letter of ph) num.includes(letter) && res.push(letter)
  return res.join('')
}

const isValid8 = (ph = '') => ph.startsWith('8') && ph.length === 11

const isValid7 = (ph = '') => ph.startsWith('+7') && ph.length === 12

const format8 = (ph = '') => formatString(ph, 'x xxx xxx xx xx')

const format7 = (ph = '') => formatString(ph, 'xx xxx xxx xx xx')

export const formatPhone = (ph = '') => {
  const res = clearPhone(ph)
  if (isValid8(res)) return format8(res)
  if (isValid7(res)) return format7(res)  
  return res
}

const formatString = (s = '', format = '') => {
  const s_lst = s.split('').reverse()
  const res = []
  for (const fl of format)
    fl.toLowerCase() === 'x' ? res.push(s_lst.pop()) : res.push(fl)
  
  return res.join('')
}

export const getPhoneMasked = (ph = '') => {
  const mask = ' XXX XX XX'
  const res = clearPhone(ph)

  if (isValid8(res)) return format8(res).slice(0, 5) + mask

  if (isValid7(res)) return format7(res).slice(0, 6) + mask

  return '8 XXX XXX XX XX'
}
