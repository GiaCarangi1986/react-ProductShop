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

const createCategorySerializer = (params = {}) => {
  const ids = []
  params?.productList.forEach(element => {
    ids.push(element.id)
  });
  return {
    title: params.title, // наименование
    productsID: ids, // список id продуктов для изменения
  }
}


const createCategoryCheckSerializer = (data = []) => {
  const ids = []
  data?.productList.forEach(element => {
    ids.push(element.id)
  });
  return {
    id: +data.id,
    productsID: ids, // список id продуктов для изменения
  }
}

const getCategoryCheckSerializer = (params = []) => {
  const products = []
  params.forEach(element => {
    products.push({
      id: element.id, // id продукта
      title: element.title // название продукта
    })
  });
  return products
}

const getCategoryForEditSerializer = (params = {}) => {
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
    productList: [...productList], // список продуктов, участвующих в акции
  }
}

export {
  getCategorySerializer,
  filterSerializer,
  createCategorySerializer,
  createCategoryCheckSerializer,
  getCategoryCheckSerializer,
  getCategoryForEditSerializer
}