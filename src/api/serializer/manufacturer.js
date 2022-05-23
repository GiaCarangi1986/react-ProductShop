const filterSerializer = (filters = {}) => {
  return {
    search: filters?.search || ''
  }
}

const getManufacturerSerializer = (params = []) => {
  const serList = []
  params.forEach(el => {
    serList.push({
      id: el.id, // id
      title: el.title, // наименование
    })
  })
  return serList
}

export { filterSerializer, getManufacturerSerializer }