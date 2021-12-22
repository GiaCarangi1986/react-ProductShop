import { createStoreon } from 'storeon';

const errorFn = store => {
  store.on('@init', () => ({ errorPopup: null }));
  store.on('error/toggle', ({ }, { errorPopup }) => ({ errorPopup }));
  store.on('error/close', () => ({ errorPopup: null }));
}

const storeonParams = [
  errorFn,
];

const store = createStoreon(storeonParams);
export default store;