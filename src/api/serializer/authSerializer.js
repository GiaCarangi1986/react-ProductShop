const authSerializer = (params = {}) => ({
  login: params.username, // имя (логин)
  password: params.password, // пароль
})

export default authSerializer;