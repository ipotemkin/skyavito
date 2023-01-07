// символ для маски номера X/x

type CodeParamsType = {
  mask: string
}

type CodeParamsArrayType = {
  [index: string]: CodeParamsType
}

const CODE_PARAMS: CodeParamsArrayType = {
  '+7': { mask: 'xx xxx xxx xx xx' },  // Россия
  '8': { mask: 'x xxx xxx xx xx' },

  '+1': { mask: 'xx xxx xxxx xx xx' },  // США
  '+49': { mask: 'xxx xxx xxx xx xx' },  // Германия
  '+61': { mask: 'xxx x xxxx xxxx' },  // Австралия
}

const getCodeParams = (clearedPhone: string) => {
  for (const i in CODE_PARAMS)
    if (clearedPhone.startsWith(i)) return CODE_PARAMS[i]
  return null
}

export const clearPhone = (ph = '') => {
  if (!ph) return ''
  return ph.replace(/[^0-9|+]/gi, '')
}

// сичтаем количество символов маски
const xCount = (mask = '') => mask.split(/x/gi).length - 1

// получаем спиок фрагментов маски
const getXArr = (mask = '') => mask.match(/(x+)/gi) || []

// получаем разделители из маски
const getSepArr = (mask = '') => mask.split(/x+/gi)

const isValid = (ph = '', codeParams: CodeParamsType) => ph.length === xCount(codeParams.mask)

const formatByCodeParams = (ph: string, cp: CodeParamsType) => formatString(ph, cp.mask)

const maskByCodeParams = (ph: string, cp: CodeParamsType) => {
  const sep = getSepArr(cp.mask)

  // const maskArray = cp.mask.split(' ')
  const maskArray = getXArr(cp.mask) as string[]

  if (maskArray.length === 1) return 'XXXXXXXXXXXX'

  const phoneFormatted = formatByCodeParams(ph, cp)

  if (maskArray.length === 2) {
  return phoneFormatted.slice(0, maskArray[0].length) + (sep[0] || sep[1]) + joinXArr(cp.mask, 1)
  }

  if (maskArray.length > 2) {
  const prefixLen = maskArray[0].length + maskArray[1].length + 1  // +1 на пробел в шаблоне
  return phoneFormatted.slice(0, prefixLen) + (sep[0] ? sep[1] : sep[2]) + joinXArr(cp.mask, 2)
  }
}

const joinXArr = (mask: string, start: number, end?: number) => {
  const xArr = getXArr(mask)
  const len = xArr.length
  const sepArr = getSepArr(mask)

  // сдвиг индекса разделителей маски
  const offset = sepArr[0] ? 0 : 1

  const res = []
  for (let i = start; i < (end || len); i++) {
    res.push(xArr[i] + sepArr[i+offset])
  }
  return res.join('')
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
