import { createStoreon } from 'storeon';
import persistState from 'storeon-sessionstorage'
import { PAGE_SIZE } from '../const';

const errorFn = store => {
  store.on('@init', () => ({ errorPopup: null }));
  store.on('error/toggle', ({ }, { errorPopup }) => ({ errorPopup }));
  store.on('error/close', () => ({ errorPopup: null }));
}

const userInfo = (store) => {
  store.on('@init', () => ({ currentUser: null }));
  store.on('user/save', ({ }, { ...params }) => ({ currentUser: { ...params } }));
  store.on('user/update', ({ currentUser }, params) => {
    const newCurrentUser = {
      ...currentUser,
      ...params
    };
    store.dispatch('user/save', newCurrentUser);
  });
  store.on('user/reset', () => ({ currentUser: null }));
}

const modalFn = store => {
  store.on('@init', () => ({ modal: null }));
  store.on('modal/toggle', ({ }, { modal, ...params }) => ({
    modal,
    ...params
  }));
  store.on('modal/close', () => ({ modal: null }));
};

const checkFilters = (store) => {
  store.on('@init', () => ({ filters: { page: 1, pageSize: PAGE_SIZE, search: '', ordering: '' } }))
  store.on('params/save', ({ }, { ...params }) => ({ filters: { ...params } }));
  store.on('params/update', ({ filters }, params) => {
    const newFilters = {
      ...filters,
      ...params
    };
    store.dispatch('params/save', newFilters);
  });
  store.on('params/reset', ({ filters }) => {
    const newFilters = {
      page: filters.page,
      pageSize: filters.pageSize,
      search: '',
      ordering: '',
    };
    store.dispatch('params/save', newFilters);
  });
}

const catchErrorsApi = (store) => {
  store.on('@init', () => ({ response: null }))
  store.on('catch/api', ({ }, response) => {
    const status = response?.status || null
    if (status && status === 401) {
      store.dispatch('user/reset')
    }
  })
}

const storeonParams = [
  errorFn,
  userInfo,
  modalFn,
  catchErrorsApi,
  checkFilters,
  persistState([
    'currentUser',
  ]),
];

const store = createStoreon(storeonParams);
export default store;