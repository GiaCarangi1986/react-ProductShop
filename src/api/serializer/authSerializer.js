const authSendSerializer = (params = {}) => ({
  login: params.phone, // имя (логин)
  password: params.password, // пароль
})

const authGetSerializer = (params = {}) => ({
  firstName: params.firstName, // имя
  id: params.id, // id
  lastName: params.lastName, // фамилия
  role: params.role // роль (наименование)
})

export { authSendSerializer, authGetSerializer };