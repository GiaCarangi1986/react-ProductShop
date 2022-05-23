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

const createManufacturerCheckSerializer = (data = []) => {
  const ids = []
  data?.productList.forEach(element => {
    ids.push(element.id)
  });
  return {
    id: +data.id,
    productsID: ids, // список id продуктов для изменения
  }
}

const createManufacturerSerializer = (params = {}) => {
  const ids = []
  params?.productList.forEach(element => {
    ids.push(element.id)
  });
  return {
    title: params.title, // наименование
    productsID: ids, // список id продуктов для изменения
  }
}

const getManufacturerForEditSerializer = (params = {}) => {
  const productList = []
  params?.productList.forEach(element => {
    productList.push({
      id: element.id,
      label: element.title
    })
  });
  return {
    id: params.id, // id
    title: params.title, // наименование
    productList: [...productList], // список продуктов данного проиводителя
  }
}

export {
  filterSerializer,
  getManufacturerSerializer,
  createManufacturerCheckSerializer,
  createManufacturerSerializer,
  getManufacturerForEditSerializer
}