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
      cols_names: NAMES,
    }
    return checks;
  }

  return null;
}

export default checkSerializer;