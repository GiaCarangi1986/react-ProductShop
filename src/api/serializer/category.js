const getCategorySerializer = (params = []) => {
  const serList = []
  params.forEach(el => {
    serList.push({
      id: el.id, // id
      title: el.title, // наименование
    })
  })
  return serList
}

const filterSerializer = (filters = {}) => {
  return {
    search: filters?.search || ''
  }
}

export { getCategorySerializer, filterSerializer }