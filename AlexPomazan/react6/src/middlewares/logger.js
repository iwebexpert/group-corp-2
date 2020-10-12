export const loggerMiddware = (store) => (next) => (action) => {
  console.group("---loggerMiddware---");
  console.log("Action", action);
  console.log("Store (before)", store.getState());
  const result = next(action);
  console.log("Store (after)", store.getState());
  console.log("Result", result);
  console.groupEnd();
  return result;
};
