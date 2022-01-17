export const ERROR_MESSAGE = {
  uncorrect_login_data: 'Неверный логин и/или пароль',
  uncorrect_getting_status: 'Список чеков не удалось получить',
  uncorrect_logout: 'Не удалось разлогинить пользователя',
}

const CORRECT_USER_DATA = {
  username: 'kassir',
  password: '1234',
}

export const LoginUser = (data) => {
  if (data.username === CORRECT_USER_DATA.username && data.password === CORRECT_USER_DATA.password) {
    return {
      first_name: 'Елизавета',
      last_name: 'Курочкина',
      type: 1, // 1 - обычный кассир, 2- старший кассир, 3- админ
      id: 1, // на беке буду проверять id и type
    }
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_login_data] },
      status: 404,
    }
  }
}

export const CheckList = (status = 2) => {
  if (status === 1) {
    return { // лист чеков
      results: [
        {
          id: 1,
          date_time: new Date(),
          sum: 1000,
          kassir: 'Курочкина Е. С.',
          bonus_add: 10,
          bonus_pop: 2,
          product_count: 2,
        },
      ],
      count: 1,
      next: [
        {
          id: 2,
          date_time: new Date(),
          sum: 50,
          kassir: 'Курочкина Е. С.',
          bonus_add: 0,
          bonus_pop: 1,
          product_count: 1,
        },
      ],
      previous: [

      ],
      count_all: 2,
    }
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_getting_status] },
      status: 404,
    }
  }
}

export const LogoutUser = (status = 1) => {
  if (status === 1) {
    return {}
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_logout] },
      status: 404,
    }
  }
}