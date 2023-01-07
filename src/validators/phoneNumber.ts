type CodeParamsType = {
  length: number
  mask: string
}

type CodeParamsArrayType = {
  [index: string]: CodeParamsType
}

const CODE_PARAMS: CodeParamsArrayType = {
  '+7': { length: 12, mask: 'xx xxx xxx xx xx' },  // Россия
  '8': { length: 11, mask: 'x xxx xxx xx xx' },

  '+1': { length: 13, mask: 'xx xxx xxxx xx xx' },  // США
  '+49': { length: 13, mask: 'xxx xxx xxx xx xx' },  // Германия
  '+61': { length: 12, mask: 'xxx x xxxx xxxx' },  // Австралия
}

const getCodeParams = (clearedPhone: string) => {
  for (const i in CODE_PARAMS)
    if (clearedPhone.startsWith(i)) return CODE_PARAMS[i]
  return null
}

export const clearPhone = (ph = '') => {
  // const num = '+0123456789'
  // const res = []
  // for(const letter of ph) num.includes(letter) && res.push(letter)
  // return res.join('')
  return ph.replace(/[^0-9|+]/gi, '')
}

const isValid = (ph ='', codeParams: CodeParamsType) => ph.length === codeParams.length
const formatByCodeParams = (ph: string, cp: CodeParamsType) => formatString(ph, cp.mask)
const maskByCodeParams = (ph: string, cp: CodeParamsType) => {
  const maskArray = cp.mask.split(' ')
  if (maskArray.length === 1) return 'XXXXXXXXXXXX'
  
  if (maskArray.length === 2) {
  const phoneFormatted = formatByCodeParams(ph, cp)
  return phoneFormatted.slice(0, maskArray[0].length) + ' ' + maskArray.slice(1).join(' ')
  }

  if (maskArray.length > 2) {
  const phoneFormatted = formatByCodeParams(ph, cp)
  const prefixLen = maskArray[0].length + maskArray[1].length + 1  // +1 на пробел в шаблоне
  return phoneFormatted.slice(0, prefixLen) + ' ' + maskArray.slice(2).join(' ')
  }
}

export const formatPhone = (ph = '') => {
  const phoneCleared = clearPhone(ph)
  const params = getCodeParams(phoneCleared)

  if (params && isValid(phoneCleared, params))
    return formatByCodeParams(phoneCleared, params)

  return phoneCleared ? phoneCleared : 'Номер не предоставлен'
}

const formatString = (s = '', format = '') => {
  const sArr = s.split('').reverse()
  const res = []
  for (const fl of format)
    fl.toLowerCase() === 'x' ? res.push(sArr.pop()) : res.push(fl)

  return res.join('')
}

export const getPhoneMasked = (ph = '') => {
  const phoneCleared = clearPhone(ph)
  const codeParams = getCodeParams(phoneCleared)

  if (codeParams && isValid(phoneCleared, codeParams))
    return maskByCodeParams(phoneCleared, codeParams)

  return 'X XXX XXX XX XX'
}
