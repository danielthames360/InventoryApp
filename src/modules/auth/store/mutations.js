// export const myMutation = (state) => {

// };

export const signInUser = (state, { user }) => {
  state.user = user;
  state.status = "authenticated";
};

export const logout = (state) => {
  state.user = null;
  state.status = "not-authenticated";
};
