export const PATHS = {
  check_list: { // табл со всеми чеками (для кассира доступны ток отложенные, для остальных - полный список), будет кнопка добавить и т п
    path: '/',
    exact: false,
  },
  auth: { // авторизация
    path: '/auth',
    exact: true,
  },
  crud_operations: { // CRUD операции по работе с категориями, продуктами, поставками
    path: '/crud',
    exact: false,
  },
  reports: { // вкладка с отчетами
    path: '/reports',
    exact: false,
  },
  reports: { // вкладка с отчетами
    path: '/reports',
    exact: false,
  },
  check_operations: { // страница для операция с чеками (создать, редактировать, посмотреть)
    path: '/check_operations',
    exact: false,
  },
}

export const MODAL_TYPES = {
  logout: 'logout',
  settings: 'settings',
  payModal: 'payModal',
  addCheck: 'addCheck',
  sureExit: 'sureExit'
}

export const PAGES_TYPES = {
  addCheck: 'addCheck',
  viewCheck: 'viewCheck',
  editCheck: 'editCheck'
}

export const ERROR_TYPES = {
  excel: 'excel',
  default: 'default',
  logout: 'logout',
  offline: 'offline',
  settings: 'settings'
}

export const ERROR_TEXT = {
  excel: 'Произошла ошибка загрузки таблицы.',
  default: 'Произошла ошибка на сервере.',
  logout: 'Произошла ошибка выхода из аккаунта',
  offline: 'Отсутствует подключение к интернету',
  settings: 'Произошла ошибка сохранения настроек на сервере.'
}

export const DROPDOWN_TYPES = {
  concated_code: 'concated_code',

  line_business: 'line_business',
  line_business_code: 'line_business_code',

  service_element: 'service_element',
  service_element_code: 'service_element_code',

  service_line: 'service_line',
  service_line_code: 'service_line_code',

  service: 'service',
  service_code: 'service_code',

  tariff: 'tariff',
  tariff_code: 'tariff_code',

  element_tariff: 'element_tariff',
  unit: 'unit',
  tariff_type: 'tariff_type',
  flat_rate: 'flat_rate',
  price: 'price',

  created_at: 'created_at',
  archived_at: 'archived_at',
  start_at: 'start_at',
  end_at: 'end_at',

  price_code: 'price_code',
  cost_price: 'cost_price',
  max_discount: 'max_discount',
  readable_freq: 'readable_freq',
}

export const SETTINGS_ITEMS = [
  {
    value: true,
    name: 'concated_code',
    label: 'составной код',
  },
  {
    value: true,
    name: 'line_business',
    label: 'Линия бизнеса (Line of Business)',
  },
  {
    value: true,
    name: 'line_business_code',
    label: 'Код LOB',
  },
  {
    value: true,
    name: 'service_line',
    label: 'Линейка услуг (Service Line)',
  },
  {
    value: true,
    name: 'service_line_code',
    label: 'Код SRV.LINE',
  },
  {
    value: true,
    name: 'service',
    label: 'Услуга (Service)',
  },
  {
    value: true,
    name: 'service_code',
    label: 'Код SRV',
  },
  {
    value: true,
    name: 'service_element',
    label: 'Элемент услуги (Service Element)',
  },
  {
    value: true,
    name: 'service_element_code',
    label: 'Код SRV.ELEMENT',
  },
  {
    value: true,
    name: 'tariff',
    label: 'Тариф (Tariff)',
  },
  {
    value: true,
    name: 'tariff_code',
    label: 'Код Tariff',
  },
  {
    value: true,
    name: 'tariff_element',
    label: 'Элемент тарификации',
  },
  {
    value: true,
    name: 'tariff_unit',
    label: 'Элемент >Единица тарификации (Unit)',
  },
  {
    value: true,
    name: 'tariff_type',
    label: 'Тип тарифа, ежемесячно (Charge Type)',
  },
  {
    value: true,
    name: 'flat_rate',
    label: 'Перерасчет по фактическим дням для flat rate',
  },
  {
    value: true,
    name: 'price',
    label: 'Базовая цена',
  },
  {
    value: true,
    name: 'price_code',
    label: 'Код базовой цены',
  },
  {
    value: true,
    name: 'cost_price',
    label: 'Себестоимость',
  },
  {
    value: true,
    name: 'max_discount',
    label: 'Процент допустимой скидки',
  },
  {
    value: true,
    name: 'readable_freq',
    label: 'Частота сбора информации',
  },
  {
    value: true,
    name: 'created_at',
    label: 'Дата создания',
  },
  {
    value: true,
    name: 'archived_at',
    label: 'Дата архивации',
  },
  {
    value: true,
    name: 'start_at',
    label: 'Дата старта',
  },
  {
    value: true,
    name: 'end_at',
    label: 'Дата завершения',
  },

]

export const FILTERS_KEYS = {
  concated_code: 'concated_code',
  line_business: 'unq_line_business',
  line_business_code: 'code_line_business',

  service: 'unq_service',
  service_code: 'code_service',

  service_line: 'unq_service_line',
  service_line_code: 'code_service_line',

  service_element: 'unq_service_el',
  service_element_code: 'code_service_element',
  tariff: 'unq_tariff',
  tariff_code: 'code_tariff',

  tariff_element: 'unq_tariff_el',
  tariff_unit: 'unq_unit',
  tariff_type: 'unq_charge_type',
  price: 'price',
  flat_rate: 'flat_rate',

  created_at: 'created_at',
  archived_at: 'archived_at',
  start_at: 'start_at',
  end_at: 'end_at',

  price_code: 'price_code',
}

export const FILTERS = {
  flat_rate: 'element__flat_rate',
  line_business: 'service__service__line__line_business__id__in',
  line_business_code: 'service__service__line__line_business__code__in',

  service: 'service__service__id__in',
  service_code: 'service__service__code__in',

  service_line: 'service__service__line__id__in',
  service_line_code: 'service__service__line__code__in',

  service_element: 'service__id__in',
  service_element_code: 'service__code__in',

  tariff: 'id__in',
  tariff_code: 'code__in',

  tariff_element: 'element__id__in',
  tariff_type: 'element__charge_type__id__in',
  tariff_unit: 'element__unit__id__in',
  concated_code: 'concat_code',
  price: 'element__price',

  max_discount: 'element__max_discount',
  cost_price: 'element__cost_price',
  readable_freq: 'element__update_frequency__readable_freq'
}

export const FILTERS_TITLE = {
  line_business: 'service__service__line__line_business__title',
  service: 'service__service__title',
  service_line: 'service__service__line__title',
  tariff: 'title',
  tariff_element: 'element__title',
  service_element: 'service__title',
  line_business_code: 'service__service__line__line_business__code',
  service_line_code: 'service__service__line__code',
  service_code: 'service__service__code',
  service_element_code: 'service__code',
  tariff_code: 'code',
  tariff_type: 'element__charge_type__charge_type',
  flat_rate: 'element__flat_rate',
  price: 'element__price',
  concated_code: 'concat_code',
  tariff_unit: 'element__unit__unit',
  created_at: 'created_at',
  archived_at: 'archived_at',
  max_discount: 'element__max_discount',
  cost_price: 'element__cost_price',
  readable_freq: 'element__update_frequency__readable_freq'
}

export const INIT_VALUES_ADD_TARIFF = {
  line_business: undefined,
  line_business_code: 0,
  service_line: undefined,
  service_line_code: 0,
  service: undefined,
  service_code: 0,
  service_element: undefined,
  service_element_code: 0,
  tariff: '',
  tariff_code: 0,
  tariff_element: undefined,
  tariff_unit: undefined,
  tariff_type: undefined,
  flat_rate: undefined,
  price: 0,
  is_available: true,
  id: null,

  cost_price: 0,
  max_discount: 0,
  frequency_info: undefined,
  comment: '',
}

export const DEPENDENT_SELECTS = {
  line_business: {
    selects: ['service_line', 'service', 'service_element'],
    codes: ['service_line_code', 'service_code', 'service_element_code'],
  },
  service_line: {
    selects: ['service', 'service_element'],
    codes: ['service_code', 'service_element_code'],
  },
  service: {
    selects: ['service_element'],
    codes: ['service_element_code'],
  },
  tariff_type: {
    selects: ['tariff_element'],
    codes: [],
  },
  tariff_unit: {
    selects: ['tariff_element'],
    codes: [],
  },
}

export const TABLE_HISTORY_HEAD = {
  action_on_model: {
    key: 'action_on_model_col',
    style: {
      margin: '',
      width: '75px',
    },
    title: 'Действие'
  },
  changed: {
    key: 'changed_col',
    style: {
      margin: '',
      width: '180px',
    },
    title: 'Дата/время изменения'
  },
  changeFormat: {
    key: 'change_format_col',
    style: {
      margin: '',
      width: '560px',
    },
    title: 'Изменяемые данные модели'
  },
  model: {
    key: 'model_col',
    style: {
      margin: '',
      width: '150px',
    },
    title: 'Измененное поле'
  },
  record_id: {
    key: 'record_id_col',
    style: {
      margin: 'auto',
      width: '80px',
    },
    title: 'ID записи'
  },
  user: {
    key: 'user_col',
    style: {
      margin: '',
      minWidth: '145px',
    },
    title: 'Автор изменения'
  },
}

export const HISTORY_COLS_POSITION = ['changed', 'model', 'user', 'record_id', 'action_on_model', 'changeFormat']

export const ACTIONS = {
  update: 'Изменение',
  create: 'Создание',
  delete: 'Удаление',
}

export const SORT_TYPES = {
  ascending: 'ascending',
  descending: 'descending',
};

export const NAMES = { // примерная структура столбцов
  id: 'ID (штрих-код)',
  date_time: 'Дата и время',
  kassir: 'ФИО кассира',
  bonus_add: 'Кол-во начисленных бонусов',
  bonus_pop: 'Кол-во снятых бонусов',
  sum_without_bonus: 'Сумма без бонусов',
  sum: 'Итоговая сумма',
};

export const WIDTH_COL = {
  id: 250,
  date_time: 180,
  kassir: 300,
  bonus_add: 150,
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

export const PAGE_SIZE = 100

export const BASE_FILTERS = ['page', 'pageSize', 'search']

export const SPECIAL_FILTERS = ['service__service__is_available', 'ordering', 'last_key', 'serviceAvailable']

export const CHOSEN_KEYS = ['code__in', 'id__in', 'element__flat_rate']

export const USER_PERMISSIONS = {
  view_user: 'view_user',
  add_tariff: 'add_tariff'
}

export const CODES_KEYS_FILTERS = ['code_tariff', 'code_service_element', 'code_service_line', 'code_service', 'code_line_business']
export const UNQ_KEYS_FILTERS = ['unq_line_business', 'unq_tariff_el', 'unq_tariff_el', 'unq_tariff_el', 'unq_tariff', 'unq_service', 'unq_service_line', 'unq_service_el']
export const SPECIFIC_KEYS_FILTER = ['unq_charge_type', 'unq_unit', 'flat_rates']

export const EMPTY_PARAMS = {}

export const BASE_TIME = [
  {
    time: 1,
    label: 'Минута',
    name: 'minute'
  },
  {
    time: 60,
    label: 'Час',
    name: 'hour',
  },
  {
    time: 1440,
    label: 'День',
    name: 'day',
  },
  {
    time: 10080,
    label: 'Неделя',
    name: 'week',
  },
  {
    time: 43200,
    label: 'Месяц',
    name: 'month',
  },
]

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
}

export const FORM_FIELDS = {
  start_at: 'start_at',
  end_at: 'end_at',
  product: 'product',
  count: 'count',
  card: 'card',
  bonus: 'bonus',
  old_product: 'old_product',
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

export const USER_ROLE = {
  admin: 1,
  main_kassir: 2,
  kassir: 3
}