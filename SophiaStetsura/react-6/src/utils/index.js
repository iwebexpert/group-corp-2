import botPhrases from './botPhrases';
import timeIsNow from './timeIsNow';
import initStore, { history } from './store';

const { store, persistor } = initStore();

export {
  botPhrases,
  timeIsNow,
  store,
  persistor,
  history,
};