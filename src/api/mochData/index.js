export const ERROR_MESSAGE = {
  uncorrect_getting_check_list: 'Список чеков не удалось получить',
  uncorrect_logout: 'Не удалось разлогинить пользователя',
  uncorrect_getting_product_list: 'Список продуктов не удалось получить',
  uncorrect_getting_card_list: 'Список бонусынх карт не удалось получить',
  uncorrect_getting_history_check_list: 'Список историй изменений чека не удалось получить',
}

export const ProductList = (status = 2) => {
  if (status === 1) {
    return { // лист продуктов
      results: [
        {
          id: 1,
          title: 'Чипсы',
          manufacturer: 'Снеки',
          count: 100,
          price: 90,
          unit: 'шт',
          sale: false,
          maybeOld: true
        },
        {
          id: 3,
          title: 'Мороженое',
          manufacturer: 'Замороженные продукты',
          count: 100,
          price: 19,
          unit: 'шт',
          sale: true,
          maybeOld: true
        },
        {
          id: 4,
          title: 'Морковь',
          manufacturer: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
          maybeOld: false
        },
        {
          id: 5,
          title: 'Морковь',
          manufacturer: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
          maybeOld: true
        },
        {
          id: 6,
          title: 'Морковь',
          manufacturer: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
          maybeOld: true
        },
        {
          id: 7,
          title: 'Морковь',
          manufacturer: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
          maybeOld: true
        },
        {
          id: 8,
          title: 'Морковь',
          manufacturer: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
          maybeOld: true
        },
        {
          id: 9,
          title: 'Морковь',
          manufacturer: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
          maybeOld: true
        },
        {
          id: 10,
          title: 'Морковь',
          manufacturer: 'Овощи',
          count: 100,
          price: 130,
          unit: 'кг',
          sale: false,
          maybeOld: true
        },
      ],
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
          bonus: 1000,
          FIO: 'Кузнецов Федор Андреевич'
        },
      ],
    }
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_getting_card_list] },
      status: 404,
    }
  }
}

export const HistoryCheck = (status = 2) => { // когда сервер буду писать у запросов сделать все camelCase
  if (status === 1) {
    return {
      // results: [
      //   {
      //     id: '1',
      //     date_time: '26.03.2022 10:16:31', // новый чек создастся по этому с те ми полями, но заменим list, date, price
      //     bonus_count: 20, // новая цена с бонусами - если <0 -> 0
      //     cardId: '1',
      //     childCheckId: null,
      //     kassirId: 1,
      //     kassirName: 'Курочкина Е. С.', // только при получении, при отправке - id
      //     paid: false,
      //     totalCost: 50,
      //     linesCheckList: [
      //       {
      //         count: 1,
      //         id: 1,
      //         label: 'Сухарики', // здесь отдавать еще название продукта! + здесь наверное будет идти title -> сериалайзер
      //         old_product: false,
      //         price: 20
      //       },
      //       {
      //         count: 1,
      //         id: 2,
      //         label: 'Макароны', // здесь отдавать еще название продукта!
      //         old_product: false,
      //         price: 30
      //       },
      //     ]
      //   },
      // ],
      results: [
        {
          id: '1',
          date_time: '26.03.2022 10:16:31', // новый чек создастся по этому с теми же полями, но заменим list, date, price
          bonus_count: 1, // новая цена с бонусами - если <0 -> 0
          cardId: '1',
          parentCheckId: '2',
          kassirId: 1,
          kassirName: 'Курочкина Е. С.', // только при получении, при отправке - id
          paid: true,
          totalCost: 1545,
          linesCheckList: [
            {
              count: 12,
              id: 1,
              label: 'Сухарики', // здесь отдавать еще название продукта! + здесь наверное будет идти title -> сериалайзер
              old_product: false,
              price: 20,
              maybeOld: true,
              sale: false,
            },
            {
              count: 5,
              id: 2,
              label: 'Макароны', // здесь отдавать еще название продукта!
              old_product: false,
              price: 201,
              maybeOld: true,
              sale: false,
            },
            {
              count: 3,
              id: 3,
              label: 'Колбаса', // здесь отдавать еще название продукта!
              old_product: true,
              price: 100,
              maybeOld: true,
              sale: false,
            },
          ]
        },
        {
          id: '2',
          date_time: '26.03.2022 15:16:31',
          bonus_count: 1,
          cardId: '1',
          parentCheckId: '3',
          kassirId: 1,
          kassirName: 'Курочкина Е. С.', // только при получении, при отправке - id
          totalCost: 1345,
          paid: true,
          linesCheckList: [
            {
              count: 2,
              id: 1,
              label: 'Сухарики', // здесь отдавать еще название продукта!
              old_product: false,
              price: 20,
              maybeOld: true,
              sale: false,
            },
            {
              count: 5,
              id: 2,
              label: 'Макароны', // здесь отдавать еще название продукта!
              old_product: false,
              price: 201,
              maybeOld: true,
              sale: false,
            },
            {
              count: 3,
              id: 3,
              label: 'Колбаса', // здесь отдавать еще название продукта!
              old_product: true,
              price: 100,
              maybeOld: true,
              sale: false,
            },
          ]
        },
        {
          id: '3',
          date_time: '26.03.2022 16:16:31',
          bonus_count: 1,
          cardId: '1',
          parentCheckId: null,
          kassirId: 2,
          totalCost: 1144,
          kassirName: 'Петрова А. А.', // только при получении, при отправке - id
          paid: true, // false в случае отложенного чека - тогда показываем оплатить и отложить, но там поставится старое время!
          // этот атрибут для того, чтобы понимать, что редачить, если фалсе, то оплатить и если делаем строки в 0 кол-во, то типо оплатить 0 и прост удаляется, то есть не новый, а в этот добавим атрибут
          linesCheckList: [
            {
              count: 2,
              id: 1,
              label: 'Сухарики', // здесь отдавать еще название продукта!
              old_product: false,
              price: 20,
              maybeOld: true,
              sale: false
            },
            {
              count: 4,
              id: 2,
              label: 'Макароны', // здесь отдавать еще название продукта!
              old_product: false,
              price: 201,
              maybeOld: true,
              sale: false,
            },
            {
              count: 3,
              id: 3,
              label: 'Колбаса', // здесь отдавать еще название продукта!
              old_product: true,
              price: 100,
              maybeOld: true,
              sale: false,
            },
          ]
        },
      ],
    }
  }
  throw {
    response: {
      data: { non_field_errors: [ERROR_MESSAGE.uncorrect_getting_card_list] },
      status: 404,
    }
  }
}