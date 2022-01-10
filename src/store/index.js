import { createStoreon } from 'storeon';
import persistState from 'storeon-sessionstorage'

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

const storeonParams = [
  errorFn,
  userInfo,
  modalFn,
  persistState([
    'currentUser',
  ]),
];

const store = createStoreon(storeonParams);
export default store;