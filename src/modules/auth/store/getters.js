// export const myGetter = (state) => {
//   return state;
// };

export const currentState = (state) => {
  return state.status;
};
export const userName = (state) => {
  return state.user?.name || "";
};
