export const prettyDate = (timeISOstring: string) => {
  const date = new Date((timeISOstring).replace(/-/g, '/').replace(/[TZ]/g, ' '))
  const now = new Date()
  
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
