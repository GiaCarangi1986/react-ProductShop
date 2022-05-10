const getUserListSerializer = (params = []) => {
  const serList = []
  params.forEach(el => {
    serList.push({
      id: el.id, // id
      fio: el.FIO, // ФИО
      phone: `+${el.phone}`, // телефон
      email: el.email, // почта
      password: el.password, // пароль
      role: el.role, // роль
    })
  })
  return serList
}

const createUserSerializer = (params = {}) => ({
  FIO: `${params.secondName} ${params.firstName} ${params.patronymic}`, // ФИО
  phone: params.phone, // телефон
  email: params?.email || null, // почта
  password: params.password, // пароль
  roleFK: params.role?.value, // роль
})

const getUserForEditSerializer = (params = {}) => {
  return {
    id: params.id, // id
    firstName: params.firstName, // имя
    secondName: params.secondName, // фамилия
    patronymic: params.patronymic, // отчество
    phone: params.phone, // телефон
    email: params?.email || '', // почта
    password: params.password, // пароль
    role: {
      value: params.gender?.id,
      label: params.gender?.title
    }, // роль
  }
}

export { getUserListSerializer, createUserSerializer, getUserForEditSerializer };