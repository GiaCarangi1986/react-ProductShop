import { processingResult } from '../../utils'
import { NAMES } from '../../const'

const checkSerializer = (res) => {
  if (res) {
    const checkList = [...res.results].map(item => {
      return processingResult(item);
    });

    const checks = {
      count: res.count,
      results: checkList,
      next: res.next,
      previous: res.previous,
      cols_names: NAMES,
      count_all: res.count_all || null
    }
    return checks;
  }

  return null;
}

export default checkSerializer;