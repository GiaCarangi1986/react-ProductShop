import { dateFotmattedForMakeDelivery } from '../../utils/date';

const getBonusCardOwnerSerializer = (params = []) => {
  const serList = []
  params.forEach(el => {
    serList.push({
      id: el.id, // id
      fio: el.FIO, // ФИО
      phone: `+${el.phone}`, // телефон
      email: el.email, // почта
      birthDate: dateFotmattedForMakeDelivery(el.birthDate), // день рождения
      gender: el.gender, // пол
    })
  })
  return serList
}

export { getBonusCardOwnerSerializer };