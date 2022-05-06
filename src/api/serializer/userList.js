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

export { getUserListSerializer };