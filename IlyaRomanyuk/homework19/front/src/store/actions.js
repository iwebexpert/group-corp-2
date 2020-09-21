import asyncActions from './actions/asyncActions';
import syncActions from './actions/syncActions';
const actions = { ...asyncActions, ...syncActions }
export default actions;