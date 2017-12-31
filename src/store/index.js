import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutators';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

/**
 * Wrappers for Managing State
 *
 */

const db = [
  {
    name: 'Dr. John  Doe, M.D.',
    userName: 'DrDre',
    password: 'secret',
    acls: ['doctor', 'admin'],
    userType: '',
    userID: '114233',
    mfa: true,
  },
  {
    name: 'Jane Doe',
    userName: 'Patient 0',
    password: 'secret',
    acls: ['patient'],
    userType: '',
    userID: 'A000',
    mfa: false,
  },
];

let state = {};
state = {
  isLoggedIn: false,
  isAuhenticated: false,
  activeUser: {},
  userType: {
    doctor: db[0],
    patient: db[1],
  },
  currentPatientID: '',
  patients: {},
  history: [],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
  //    ? [createLogger()]
    ? []
    : [],
});
