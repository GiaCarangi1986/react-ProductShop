export const PATHS = {
  check_list: { // табл со всеми чеками, будет кнопка добавить и т п
    path: '/',
    exact: false,
  },
  auth: { // авторизация
    path: '/auth',
    exact: true,
  },
  admin_panel: { // админ панель: CRUD операции по работе с категориями, продуктами, поставками + отчетамы
    path: '/admin_panel',
    exact: false,
  },
  check_operations: { // страница для операция с чеками (создать, редактировать, посмотреть)
    path: '/check_operations',
    exact: false,
  },
}

export const MODAL_TYPES = {
  logout: 'logout',
  payModal: 'payModal',
  addCheck: 'addCheck',
  sureExit: 'sureExit',
  sureDelete: 'sureDelete',
  errorModal: 'errorModal'
}

export const PAGES_TYPES = {
  addCheck: 'addCheck',
  viewCheck: 'viewCheck',
  editCheck: 'editCheck',
  payDelayCheck: 'payDelayCheck'
}

export const ERROR_TYPES = {
  default: 'default',
  logout: 'logout',
  offline: 'offline',
}

export const ERROR_TEXT = {
  default: 'Произошла ошибка на сервере.',
  logout: 'Произошла ошибка выхода из аккаунта',
  offline: 'Отсутствует подключение к интернету',
}

export const NAMES = {
  id: 'ID (штрих-код)',
  date_time: 'Дата и время',
  kassir: 'ФИО кассира',
  bonus_pop: 'Кол-во снятых бонусов',
  sum_without_bonus: 'Сумма без бонусов',
  sum: 'Итоговая сумма',
};

export const WIDTH_COL = {
  id: 250,
  date_time: 180,
  kassir: 300,
  bonus_pop: 150,
  sum_without_bonus: 150,
  sum: 150,
}

export const WIDTH_COL_CHECK = {
  name: 250,
  quantity_or_weight: 90,
  price_piece_or_kg: 90,
  total_cost: 90,
  old_product: 80,
}

export const WIDTH_COL_CHECK_TBODY = {
  label: 250,
  count: 90,
  price: 90,
  total_cost: 90,
  old_product: 80,
}

export const TABLE_EVENT_TYPES = {
  search: 'search',
  settings: 'settings',
  scroll: 'scroll',
  changeData: 'changeData',
  allLoaded: 'allLoaded',
}

export const PAGE_SIZE = 15

export const SCREENS = {
  middle: "(max-width: 1200px)",
};

export const FORM_LABELS = {
  start_at: 'Дата начала',
  end_at: 'Дата окончания',
  product: 'Товар',
  count: 'Кол-во, шт',
  weight: 'Вес, кг',
  card: 'Бонусная карта',
  bonus: 'Снять бонусы',
  old_product: 'Применить скидку 50% по сроку годности',
  old_product_err: 'НЕВОЗМОЖНО ПРИМЕНИТЬ ДЛЯ АКЦИОННОГО ТОВАРА',
  maybe_old_product_err: 'НЕВОЗМОЖНО ПРИМЕНИТЬ ДЛЯ ДАННОГО ТОВАРА'
}

export const FORM_FIELDS = {
  start_at: 'start_at',
  end_at: 'end_at',
  product: 'product',
  count: 'count',
  card: 'card',
  bonus: 'bonus',
  old_product: 'old_product',
  delayed_show: 'delayed_show',
  changed_show: 'changed_show',
  password: 'password',
  phone: 'phone'
}

export const UNITS = ['шт', 'кг']

export const SELECT_TYPES = {
  product: 'product',
  card: 'card',
}

export const MODALS_CHECK_TITLE = {
  default: 'Добавление чека',
  update: 'Редактирование чека',
  payModal: 'Информация о совершении покупки',
  checkList: 'Подготовка к оплате',
}

export const CHECK_LINES_HEADER = {
  name: 'Наименование',
  quantity_or_weight: 'Кол-во/вес',
  price_piece_or_kg: 'Цена 1шт/1кг',
  total_cost: 'Общая стоимость',
  old_product: 'Старый продукт'
}

export const CHECK_LINE_ADDING = {
  label: 'label',
  count: 'count',
  price: 'price',
  total_cost: 'total_cost',
}

export const MAKE_DELIVERS_HEADER = {
  name: 'Наименование',
  quantity_or_weight: 'Оптимальный кол-во/вес',
  price_piece_or_kg: 'Цена 1шт/1кг',
  total_cost: 'Общая стоимость',
}

export const WIDTH_COL_MAKE_DELIVERS = {
  name: 250,
  quantity_or_weight: 120,
  price_piece_or_kg: 100,
  total_cost: 100,
}

export const MAKE_DELIVERS_LINE_ADDING = {
  label: 'label',
  count: 'count',
  price: 'price',
  total_cost: 'total_cost',
}

export const WIDTH_COL_MAKE_DELIVERS_TBODY = {
  label: 250,
  count: 120,
  price: 100,
  total_cost: 100,
}

export const USER_ROLE = {
  admin: 1,
  main_kassir: 2,
  kassir: 3
}

export const ADMIN_ACTIONS = {
  make_deliveries: { // выводим кол-во средних покупок за последнюю неделю всех продуктов, округленное в большее
    // целое число, рядом заполненный инпут, который пользователь может изменить
    // выглядит как табл добавления чека, правая ее часть, но нельзя удалить строку, можно ток нулевое кол-во выставить
    value: 'make_deliveries',
    title: 'Осуществить поставки продуктов'
  },
  write_off_act: { // пользователь выбирает продукты и кол-во для списания (похоже на добавление чека, ток без бон карты)
    value: 'write_off_act',
    title: 'Списать продукт'
  },
}

export const ADMIN_CRUD = { // оформление бонусных карт новым покупателям (ток добавление и редактирование)
  bonus_card: {
    value: 'bonus_card',
    title: 'Операции с держателями бонусных карт'
  },
  user: { // добавление новых работников (список всех сотрудников - пароли скрыты ***, 
    // редакт инфы и роли и удаление людей - флаг isDelete)
    value: 'user',
    title: 'Работа с пользователями системы'
  },
  sale: { // управление акциями - создание, редактр и удаление
    value: 'sale',
    title: 'Управление акциями'
  },
}

export const ADMIN_REPORTS = { // отчеты
  best_saler: { // продажи продавцом за период - неделя
    value: 'best_saler',
    title: 'Лучшие продавцы'
  },
  popular_product: { // товары с самыми большими продажами
    value: 'popular_product',
    title: 'Популярные товары'
  },
}

export const ADMIN_PANEL = [
  {
    title: 'Действия',
    content: [
      {
        title: ADMIN_ACTIONS.make_deliveries.title,
        value: ADMIN_ACTIONS.make_deliveries.value
      },
      {
        title: ADMIN_ACTIONS.write_off_act.title,
        value: ADMIN_ACTIONS.write_off_act.value
      }
    ]
  },
  {
    title: 'CRUD операции',
    content: [
      {
        title: ADMIN_CRUD.bonus_card.title,
        value: ADMIN_CRUD.bonus_card.value
      },
      {
        title: ADMIN_CRUD.sale.title,
        value: ADMIN_CRUD.sale.value
      },
      {
        title: ADMIN_CRUD.user.title,
        value: ADMIN_CRUD.user.value
      }
    ]
  },
  {
    title: 'Отчеты',
    content: [
      {
        title: ADMIN_REPORTS.best_saler.title,
        value: ADMIN_REPORTS.best_saler.value
      },
      {
        title: ADMIN_REPORTS.popular_product.title,
        value: ADMIN_REPORTS.popular_product.value
      },
    ]
  }
]