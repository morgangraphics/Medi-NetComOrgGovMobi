const LocalStorage = require('node-localstorage').LocalStorage;
const db = require('./data.json');

const ls = new LocalStorage('./scratch');


const defaults = {
  appointments: {
    date: '',
    message: '',
    status: '',
  },
};

const reset = () => {
  ls.clear();
  const multer = require('multer');
  const upload = multer({ dest: './scratch/uploads' });
  setup();
};

const setup = () => {
  if (ls.getItem('doctors') === null) {
    console.log(db);
    const keys = Object.keys(db);
    keys.forEach((item) => {
      ls.setItem(item, JSON.stringify(db[item]));
    });
    console.log('building db');
  }
};


const getPD = (key, val) => {
  const tdb = JSON.parse(ls.getItem(key));

  let msg = '';
  if (!tdb) {
    msg = { error: 'Key doesn\'t exist' };
  } else {
    if (tdb instanceof Array) {
      const keys = Object.keys(val);
      tdb.forEach((item) => {
        if (item[keys[0]] && item[keys[0]] === val[keys[0]]) {
          msg = item;
        }
      });
    }
  }
  console.log(msg);
  return msg;
};


const get = (key, params) => {
  const tdb = JSON.parse(ls.getItem(key));
  let msg = '';

  if (!tdb) {
    msg = { error: 'Key doesn\'t exist' };
  } else {
    if (typeof params === 'string' || params instanceof String) {
      msg = tdb[params];
    } else {
      console.log('params is something else');
    }
  }
  return msg;
};

const save = (key, params) => {
  const tdb = JSON.parse(ls.getItem(key));
  const tobj = Object.assign({}, params);
  const id = params.userID;
  const idx = params.index;
  delete tobj.userID;
  delete tobj.index;
  let msg = '';

  if (!tdb) {
    msg = { error: 'Key doesn\'t exist' };
  } else {
    if (typeof params === 'string' || params instanceof String) {
      msg = tdb[params];
    } else {
      if (tdb instanceof Array) {
        tdb.forEach((item) => {
        });
      } else {
        const d = Object.assign({}, defaults[key], tobj);
        if (!tdb[id]) { tdb[id] = []; }
        if (!idx || idx === '') {
          tdb[id].push(d);
          console.log('pushing');
        } else {
          tdb[id][idx] = d;
        }
        console.log('tdb = ', tdb);
        ls.setItem(key, JSON.stringify(tdb));
        console.log('getting key =', ls.getItem(key));
        msg = { success: `${key} Saved` };
      }
    }
  }
  return msg;
};

const remove = (key, params) => {
  const tdb = JSON.parse(ls.getItem(key));
  const id = params.userID;
  const idx = params.index;
  let msg = '';

  if (!tdb) {
    msg = { error: 'Key doesn\'t exist' };
  } else {
    if (typeof params === 'string' || params instanceof String) {
      msg = tdb[params];
    } else {
      if (tdb instanceof Array) {
        tdb.forEach((item) => {
          console.log(1, item);
        });
      } else {
        tdb[id].slice(idx);
        ls.setItem(key, JSON.stringify(tdb));
        msg = { success: `${key} Deleted` };
      }
    }
  }
  return msg;
};

const appointments = (action, params) => {
  let msg = '';
  console.log(action);
  switch (action) {
    case 'get':
      msg = get('appointments', params);
      break;
    case 'put':
      msg = save('appointments', params);
      break;
    case 'delete':
      msg = remove('appointments', params);
      break;
    default:
      msg = { error: 'Action not recognized' };
  }
  return msg;
};

const files = (action, params) => {
  let msg = '';
  console.log(action);
  switch (action) {
    case 'get':
      msg = get('files', params);
      break;
    case 'put':
      msg = save('files', params);
      break;
    case 'delete':
      msg = remove('files', params);
      break;
    default:
      msg = { error: 'Action not recognized' };
  }
  return msg;
};

module.exports = {
  setup,
  reset,
  save,
  getPD,
  appointments,
  files,
};
