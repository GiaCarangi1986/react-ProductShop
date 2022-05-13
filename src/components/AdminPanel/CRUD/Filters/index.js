import ChooseOption from './ChooseOption'
import Date from './Date'
import SearchName from './SearchName'

import { CRUD_FILTER_TYPES } from '../../../../const'

const Filter = ({ types = [] }) => {
  // тут у контейнера ограничинить длину и скролл горизонтальный повесить
  return (
    <div>
      {types.includes(CRUD_FILTER_TYPES.date) && <Date />}
      {types.includes(CRUD_FILTER_TYPES.chooseOption) && <ChooseOption />}
      {types.includes(CRUD_FILTER_TYPES.searchName) && <SearchName />}
    </div>
  )
}

export default Filter
