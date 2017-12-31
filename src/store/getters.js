/**
 * Gets current article from $store
 * @param  {object} state $state object
 * @return {int}       current article ID
 */
export const getActiveUser = ((state) => {
  state.history.push('getting current User', state.activeUser.userID);
  return state.activeUser;
});

/**
 * Gets current article from $store
 * @param  {object} state $state object
 * @return {int}       current article ID
 */
export const isLogdIn = ((state) => {
  state.history.push('getting login State', state.activeUser.userID);
  return state.isLoggedIn;
});

/**
 * Gets current article from $store
 * @param  {object} state $state object
 * @return {int}       current article ID
 */
export const getCurrentPatientID = ((state) => {
  state.history.push('getting login State', state.activeUser.userID);
  return state.currentPatientID;
});
