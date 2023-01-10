export const getImageLst = (images: string[], count = 5) => {
    const imageLst = []
    const len = images.length
    const maxLen = len == 0 ? count : len
    
    for (let i = 0; i < maxLen; i++)
      imageLst.push({ id: i, imageUrl: images[i] || undefined })
  
    return imageLst
  }
  