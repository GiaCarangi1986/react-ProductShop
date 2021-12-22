import dayjs from './day'

require('dayjs/locale/ru')

const cleanTheDate = (dateStr) => {
  return dayjs(dateStr).locale('ru').format('LLL')
}

export default cleanTheDate