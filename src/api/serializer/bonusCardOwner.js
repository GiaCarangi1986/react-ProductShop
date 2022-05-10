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

const getBonusCardOwnerForEditSerializer = (params = {}) => {
  return {
    id: params.id, // id
    firstName: params.firstName, // имя
    secondName: params.secondName, // фамилия
    patronymic: params.patronymic, // отчество
    phone: params.phone, // телефон
    email: params?.email || '', // почта
    birthDate: params.birthDate, // день рождения
    gender: {
      value: params.gender?.id,
      label: params.gender?.title
    }, // пол
  }
}

const createBonusCardOwnerSerializer = (params = {}) => ({
  FIO: `${params.secondName} ${params.firstName} ${params.patronymic}`, // ФИО
  phone: params.phone, // телефон
  email: params?.email || null, // почта
  birthDate: params.birthDate, // день рождения
  genderFK: params.gender?.value, // пол
})

export { getBonusCardOwnerSerializer, createBonusCardOwnerSerializer, getBonusCardOwnerForEditSerializer };