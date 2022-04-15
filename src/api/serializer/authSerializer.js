const authSerializer = (params = {}) => ({
  login: params.phone, // имя (логин)
  password: params.password, // пароль
})

export default authSerializer;