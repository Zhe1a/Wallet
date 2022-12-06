export const getAuthIsLoggedIn = state => state.auth.isLoggedIn;
export const getAuthUser = state => state.auth.username;
export const getAuthError = state => state.auth.error;
export const getAuthBalance = state => state.auth.balance;
export const getAuthRegisterUser = state => state.auth.registerUser;
export const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;