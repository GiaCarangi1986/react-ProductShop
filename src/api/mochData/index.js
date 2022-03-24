export const ERROR_MESSAGE = {
  uncorrect_login_data: 'Неверный логин и/или пароль',
  uncorrect_getting_check_list: 'Список чеков не удалось получить',
  uncorrect_logout: 'Не удалось разлогинить пользователя',
  uncorrect_getting_product_list: 'Список продуктов не удалось получить',
  uncorrect_getting_card_list: 'Список бонусынх карт не удалось получить',
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
          kassir: 'Курочкина Е. С.',
          sum: 1000,
          bonus_add: 10,
          bonus_pop: 2,
        },
        {
          id: 3,
          date_time: new Date(),
          kassir: 'Петрова У. С.',
          sum: 4000,
          bonus_add: 8,
          bonus_pop: 21,
        },
        {
          id: 4,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 5,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 6,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 7,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 8,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 9,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 10,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 11,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 12,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 13,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 14,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
        {
          id: 15,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          sum: 130,
          bonus_add: 0,
          bonus_pop: 2,
        },
      ],
      count: 1,
      next: [
        {
          id: 2,
          date_time: new Date(),
          kassir: 'Курочкина Е. С.',
          sum: 50,
          bonus_add: 0,
          bonus_pop: 1,
        },
      ],
      previous: [

      ],
      count_all: 2,
    }
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_getting_check_list] },
      status: 404,
    }
  }
}

export const ProductList = (status = 2) => {
  if (status === 1) {
    return { // лист продуктов
      results: [
        {
          id: 1,
          title: 'Чипсы',
          category: 'Снеки',
          count: 100,
          price: 90,
          unit: 'шт',
          sale: false,
        },
        {
          id: 3,
          title: 'Мороженое',
          category: 'Замороженные продукты',
          count: 100,
          price: 19,
          unit: 'шт',
          sale: true,
        },
        {
          id: 4,
          title: 'Морковь',
          category: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
        },
      ],
      count: 1,
      next: [
        {
          id: 2,
          title: 'Сухарики',
          category: 'Снеки',
          count: 50,
          price: 50,
          unit: 'шт',
          sale: true,
        },
      ],
      previous: [

      ],
      count_all: 4,
    }
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_getting_product_list] },
      status: 404,
    }
  }
}

export const CardList = (status = 2) => {
  if (status === 1) {
    return { // лист бонусных карт
      results: [
        {
          id: 1,
          bonus: 4.2,
          FIO: 'Курочкина Елизавета Сергеевна'
        },
        {
          id: 3,
          bonus: 63,
          FIO: 'Иванов Николай Федорович'
        },
        {
          id: 4,
          bonus: 0,
          FIO: 'Кузнецов Федор Андреевич'
        },
      ],
      count: 1,
      next: [
        {
          id: 2,
          bonus: 10,
          FIO: 'Максимова Юлия Александровна'
        },
      ],
      previous: [

      ],
      count_all: 4,
    }
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_getting_card_list] },
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