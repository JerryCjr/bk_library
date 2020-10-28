import {
  forEachValue,
  isPromise,
  isObject
} from './util';
// TODO: 考虑下不同module之间getter定义重名咋处理; 重名的mutation，actions
// TODO: Consider namespace to resolve

const _state = Symbol('_state');
const _mutations = Symbol('_mutations');
const _actions = Symbol('_actions');
const _getters = Symbol('_getters');

class Minax {
  constructor({
    modules,
    debug
  }) {
    this[_state] = Object.create(null);
    this[_mutations] = Object.create(null);
    this[_actions] = Object.create(null);
    this[_getters] = Object.create(null);

    this.log = function (...args) {
      if (debug) {
        console.log(`[Minax] -`, ...args);
      }
    };

    this._subscribers = [];

    forEachValue(modules, (module, moduleName) => {
      this.log(`[load module] - ${moduleName}`);

      // state
      this[_state][moduleName] = module.state;

      // getters
      forEachValue(module.getters || {}, (getter, getterName) => {
        Object.defineProperty(this[_getters], getterName, {
          get: () => {
            return getter(this[_state][moduleName], this[_getters]);
          }
        });
      });

      // actions
      forEachValue(module.actions || {}, (action, actionName) => {
        this[_actions][actionName] = (...args) => {
          let r = action({
            state: this[_state][moduleName],
            rootState: this[_state],
            commit: this.commit.bind(this),
            dispatch: this.dispatch.bind(this),
            getters: this[_getters]
          }, ...args);
          if (!isPromise(r)) {
            r = Promise.resolve(r);
          }
          return r;
        };
      });

      forEachValue(module.mutations || {}, (mutation, mutationName) => {
        this.log(`[load mutation] - ${mutationName} on ${moduleName}`);
        this[_mutations][mutationName] = payload => {
          mutation(this[_state][moduleName], payload);
        };
      });
    });
  }

  get state() {
    return this[_state];
  }

  get getters() {
    return this[_getters];
  }

  dispatch(type, payload) {
    return this[_actions][type](payload);
  }

  commit(type, payload) {
    this.log(`[commit] - ${type} with ${payload ? isObject(payload) ? JSON.stringify(payload) : payload : 'empty payload'}`);
    this[_mutations][type](payload);
    try {
      const mutation = {
        type,
        payload
      };
      this._subscribers.forEach(sub => sub(mutation, this.state));
    } catch (error) {
      console.error(error);
    }
  }

  subscribe(fn) {
    return genericSubscribe(fn, this._subscribers);
  }
}

function genericSubscribe(fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return () => {
    const i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

export default Minax;
