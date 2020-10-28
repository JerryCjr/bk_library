// 匹配到白名单 访问参数不会被记录下来 保护用户信息安全

const whiteList = [
  /user\/login/,
  /login/
];

export {
  whiteList
};
