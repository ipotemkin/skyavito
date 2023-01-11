import { frontendEnv } from './env'

export const API_URL = frontendEnv === 'PRODUCTION' ? '/api/' : 'http://localhost:8090/'

export const NO_IMAGE_PIC = '/no-image-icon-23500.jpg'

export const NO_AVATAR_PIC = '/user.png'

export const ASC = 'sorting=new'

export const SORTING = ASC
