export const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i)

export const validatePrice = (price: string) => price.replace(/[^0-9]/g, '')
