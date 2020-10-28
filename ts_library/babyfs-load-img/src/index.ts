import { convert, escapeRe, options } from './utils';

const isEnabled = (): boolean => {
  const key = '@key@';
  const value = '1';
  const re = new RegExp(`(?:^|; )${key}=${value}(?:;|$)`);

  document.cookie = `${key}=${value};path=/`;

  const enabled = re.test(document.cookie);

  if (enabled) {
    remove(key);
  }

  return enabled;
};

const get = (key: string): string | null => {
  if (!key) {
    return null;
  }

  const reKey = new RegExp(`(?:^|; )${escapeRe(key)}(?:=([^;]*))?(?:;|$)`);
  const match = reKey.exec(document.cookie);

  if (match === null) {
    return null;
  }

  return match[1];
};

const set = (
  key: string,
  value: string,
  opts: options = {
    path: '/',
    domain: '',
  },
): void => {
  const attrsString = convert(opts);
  const newCookie = `${key}=${value}${attrsString}`;
  document.cookie = newCookie;
};

const remove = (key: string, options?: options): void => {
  let opts: options = { expires: new Date(-1) };

  if (options) {
    opts = { ...options, ...opts };
  }
  return set(key, 'a', opts);
};

export { isEnabled, get, set, remove };
