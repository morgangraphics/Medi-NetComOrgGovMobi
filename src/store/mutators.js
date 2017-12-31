/**
 * AAA Security in plavce here. HTTP2 etc. ...
 * This is a pretty signigant amout of work to implement
 * We fake it here for brevity
 * @param {object} state $state object
 * @param
 */
export const authorizeAuthenticate = (state, username) => {
  state.isLoggedIn = true;
  state.history.push(`${username} authorized`);
};

/**
 * Set Active User
 * @param {object} state $state object
 * @param {int} id    Article ID
 */
export const setActiveUser = (state, userType) => {
  state.activeUser = Object.assign({}, state.userType[userType]);
  state.activeUser.userType = state.activeUser.acls[0];
  delete state.activeUser.password;
  state.history.push(`setting active user for ${state.activeUser.userID}`);
};

/**
 * Set Active User
 * @param {object} state $state object
 * @param {int} id    Article ID
 */
export const logout = (state) => {
  state.history.push(`logging out for ${state.activeUser.userID}`);
  state.activeUser = {}
  state.isLoggedIn = false;
  state.isAuhenticated = false;
};

export const setPatientID = (state, id) => {
  state.currentPatientID = id;
  //state.history.push(`${username} authorized`);
};

export const savePatientAppointment = (state, id, date) => {
  if (!state.patient[id]) { state.patient[id] = {}; }
  if (!state.patient[id].appointments) { state.patient[id].appointments = []; }
  state.patient[id].appointments.push(date);
  //state.history.push(`${username} authorized`);
};
