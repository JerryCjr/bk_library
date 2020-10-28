# babyfs-trace-log

> babyfs-trace-log

## Build Setup

``` bash
# install dependencies
npm install babyfs-trace-log

# serve development program
npm run dev

# build for production
npm run prod
```

## Example

```javascript
  const instance = new Logline('ur_namespace');

  // 记录日志
  instance.info('this is a info log', null);
  instance.warn('this is a warn log', {
    name: 'this is a test'
  });
  instance.error('this is a error log');
  instance.critical('this is a critical log');

  Logline.get(logs => {console.log(logs);}); // 获取日志
  Logline.keep(0.5) // 保留半天的日志
  Logline.keep() // 清除日志
  Logline.clean() // 删除数据库

```
