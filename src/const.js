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
  errorModal: 'errorModal',
  productSale: 'productSale'
}

export const POPUP_TYPES = {
  admin_panel: 'admin_panel'
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

export const PAGE_SIZE = 25

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
  maybe_old_product_err: 'НЕВОЗМОЖНО ПРИМЕНИТЬ ДЛЯ ДАННОГО ТОВАРА',
  firstName: 'Имя',
  secondName: 'Фамилия',
  patronymic: 'Отчество (при наличии)',
  email: 'Эл. почта (необязательно)',
  birthDate: 'Дата рождения',
  gender: 'Пол',
  phone: 'Телефон',
  password: 'Пароль',
  salePercent: 'Процент скидки',
  role: 'Роль',
  title: 'Наименование',
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
  phone: 'phone',
  period: 'period',
  firstName: 'firstName',
  secondName: 'secondName',
  patronymic: 'patronymic',
  email: 'email',
  birthDate: 'birthDate',
  gender: 'gender',
  salePercent: 'salePercent',
  role: 'role',
  title: 'title'
}

export const UNITS = ['шт', 'кг']

export const SELECT_TYPES = {
  product: 'product',
  card: 'card',
  gender: 'gender',
  role: 'role'
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
  count: 'Заказываемое кол-во/вес',
  quantity_or_weight: 'Минимальный кол-во/вес',
  name: 'Наименование',
  category: 'Категория',
  manufacturer: 'Производитель',
  price_piece_or_kg: 'Цена 1шт/1кг',
  total_cost: 'Общая стоимость',
}

export const WIDTH_COL_MAKE_DELIVERS = {
  count: 125,
  quantity_or_weight: 90,
  name: 200,
  category: 200,
  manufacturer: 200,
  price_piece_or_kg: 90,
  total_cost: 90,
}

export const WRITEOFF_HEADER = {
  change_count: '',
  name: 'Наименование',
  count: 'Кол-во/вес',
  delete: ''
}

export const WIDTH_COL_WRITEOFF = {
  change_count: 50,
  name: 450,
  count: 50,
  delete: 25
}

export const BEST_SELLERS = {
  fio: 'ФИО',
  sales: 'Продажи, руб.',
  role: 'Должность'
}

export const WIDTH_COL_BEST_SELLERS = {
  fio: 350,
  sales: 100,
  role: 105,
}

export const BONUS_CARD_OWNER = {
  id: 'ID бонусной карты',
  fio: 'ФИО',
  phone: 'Телефон',
  email: 'Эл. почта',
  birthDate: 'День рождения',
  gender: 'Пол',
}

export const WIDTH_COL_BONUS_CARD_OWNER = {
  id: 30,
  fio: 160,
  phone: 100,
  email: 135,
  birthDate: 80,
  gender: 60,
}

export const PRODUCTS = {
  id: 'id товара',
  title: 'Наименование',
  priceNow: 'Цена (без скидки)',
  count: 'Общее кол-во',
  expirationDate: 'Срок годности (сутки)',
  category: 'Категория',
  manufacturer: 'Производитель',
  measurementUnits: 'Ед. измерения',
  sale: 'id акции',
}

export const WIDTH_COL_PRODUCTS = {
  id: 30,
  title: 100,
  priceNow: 45,
  count: 30,
  expirationDate: 30,
  category: 80,
  manufacturer: 80,
  measurementUnits: 25,
  sale: 30,
}

export const USER_LIST = {
  id: 'ID пользователя',
  fio: 'ФИО',
  phone: 'Телефон',
  email: 'Эл. почта',
  password: 'Пароль',
  role: 'Роль',
}

export const WIDTH_COL_USER_LIST = {
  id: 30,
  fio: 160,
  phone: 100,
  email: 135,
  password: 120,
  role: 115,
}

export const SALE_LIST = {
  id: 'ID акции',
  start_date: 'Дата начала',
  end_date: 'Дата окончания',
  discountPercent: 'Размер скидки, %',
  product_count: 'Кол-во продуктов, участвующих в акции',
  status: 'Статус акции'
}

export const WIDTH_COL_SALE_LIST = {
  id: 30,
  start_date: 80,
  end_date: 80,
  discountPercent: 80,
  product_count: 80,
  status: 105
}

export const CATEGORY = {
  id: 'ID категории',
  title: 'Наименование',
}

export const WIDTH_COL_CATEGORY = {
  id: 30,
  title: 200,
}

export const MANUFACTURE = {
  id: 'ID категории',
  title: 'Наименование',
}

export const WIDTH_COL_MANUFACTURE = {
  id: 30,
  title: 200,
}

export const POPULAR_PRODUCTS = {
  title: 'Название',
  manufacturer: 'Производитель',
  category: 'Категория',
  sale_count: 'Кол-во продаж',
}

export const WIDTH_COL_POPULAR_PRODUCTS = {
  title: 200,
  manufacturer: 200,
  category: 200,
  sale_count: 70,
}

export const MAKE_DELIVERS_LINE_ADDING = {
  count: 'count',
  label: 'label',
  category: 'category',
  manufacturer: 'manufacturer',
  price: 'price',
  total_cost: 'total_cost',
}

export const WIDTH_COL_MAKE_DELIVERS_TBODY = {
  count: 90,
  label: 200,
  category: 200,
  manufacturer: 200,
  price: 90,
  total_cost: 90,
}

export const WRITEOFF_LINE_ADDING = {
  label: 'label',
  count: 'count'
}

export const WIDTH_COL_WRITEOFF_TBODY = {
  label: 450,
  count: 50
}

export const USER_ROLE = {
  admin: 'admin',
  main_kassir: 'mainKassir',
  kassir: 'kassir'
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
  category: { // категории - создание, редактр и удаление
    value: 'category',
    title: 'Работа с категориями'
  },
  manufacturer: { // производитель - создание, редактр и удаление
    value: 'manufacturer',
    title: 'Работа с производителями'
  },
  product: { // продукт - создание, редактр и удаление
    value: 'product',
    title: 'Управление продуктами'
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
  revenue: { // выручка за период (+ выручка - прожади; валовая прибыль - доход-расход)
    value: 'revenue',
    title: 'Выручка магазина'
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
      },
      {
        title: ADMIN_CRUD.category.title,
        value: ADMIN_CRUD.category.value
      },
      {
        title: ADMIN_CRUD.manufacturer.title,
        value: ADMIN_CRUD.manufacturer.value
      },
      {
        title: ADMIN_CRUD.product.title,
        value: ADMIN_CRUD.product.value
      },
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
      {
        title: ADMIN_REPORTS.revenue.title,
        value: ADMIN_REPORTS.revenue.value
      },
    ]
  }
]

export const DEFAULT_DATE = '...'

export const SALE_KIND = {
  past: 'прошла',
  present: 'идет',
  future: 'запланирована'
}

export const SALE_KIND_VALUE = {
  past: 'past',
  present: 'present',
  future: 'future'
}

export const HEADER_BASIC = {
  add: 'Добавление',
  update: 'Редактирование'
}

export const ROLES = {
  admin: 'Администратор',
  mainKassir: 'Старший кассир',
  kassir: 'Кассир'
}


export const CRUD_FILTER_TYPES = {
  date: 'date',
  chooseOption: 'chooseOption',
  searchName: 'chooseOption',
}
