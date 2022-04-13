const checkParamsSerializer = (params = {}) => ({
  changedShow: params.changed_show, // показать только редактированные чеки
  delayedShow: params.delayed_show, // показать только неоплаченные чеки
  dateStart: params?.date_search?.start_at, // дата начала
  dateEnd: params?.date_search?.end_at, // дата окончания
})

export default checkParamsSerializer;