interface options {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  [propName: string]: any;
}

function convert(opts: options): string {
  let res = '';

  for (const key in opts) {
    if (opts.hasOwnProperty(key)) {
      switch (key) {
        case 'expires':
          const expiresValue = opts[key];
          if (expiresValue !== undefined) {
            res += `;${key}=${expiresValue.toUTCString()}`;
          }
          break;

        case 'secure':
          if (opts[key]) {
            res += `;${key}`;
          }
          break;

        default:
          res += `;${key}=${opts[key]}`;
          break;
      }
    }
  }

  if (opts && !opts.hasOwnProperty('path')) {
    res += ';path=/';
  }

  return res;
}

function escapeRe(str: string): string {
  return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
}

export { options, convert, escapeRe };
