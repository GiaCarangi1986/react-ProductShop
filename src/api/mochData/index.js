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
          product_count: 2,
          sum: 1000,
          bonus_add: 10,
          bonus_pop: 2,
        },
        {
          id: 3,
          date_time: new Date(),
          kassir: 'Петрова У. С.',
          product_count: 4,
          sum: 4000,
          bonus_add: 8,
          bonus_pop: 21,
        },
        {
          id: 4,
          date_time: new Date(),
          kassir: 'Петрова К. Е.',
          product_count: 1,
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
          product_count: 1,
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
          sale: 0,
        },
        {
          id: 3,
          title: 'Мороженое',
          category: 'Замороженные продукты',
          count: 100,
          price: 190,
          unit: 'шт',
          sale: 0,
        },
        {
          id: 4,
          title: 'Морковь',
          category: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: 0,
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
          sale: 0,
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