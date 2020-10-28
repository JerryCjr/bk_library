interface DomainInfo {
  tld: string; // 顶级
  sld?: string; // 二级
  scd?: string; // 二级完整域名
  thld?: string; // 三级
  thcd?: string; // 三级完整域名
}

// 获取domain信息
function getDomainInfo(hostname = location.hostname): DomainInfo {
  if (isIP(hostname) || hostname === 'localhost') {
    return {
      tld: hostname,
    };
  }

  const urlHost = hostname.toLowerCase();
  const arr = urlHost.split('.');

  if (arr && arr.length) {
    let topLevelDomain = ''; // 顶级域名
    let secondLevelDomain = ''; // 二级域名
    let thirdLevelDomain = ''; // 三级域名
    const length = arr.length;
    if (arr.length < 4) {
      switch (arr.length) {
        case 1:
          topLevelDomain = arr[length - 1];
          secondLevelDomain = '';
          thirdLevelDomain = '';
          break;
        case 2:
          topLevelDomain = arr[length - 1];
          secondLevelDomain = arr[length - 2];
          thirdLevelDomain = '';
          break;
        case 3:
          topLevelDomain = arr[length - 1];
          secondLevelDomain = arr[length - 2];
          thirdLevelDomain = arr[length - 3];
          break;
      }
    } else {
      topLevelDomain = arr[length - 1];
      secondLevelDomain = arr[length - 2];
      thirdLevelDomain = arr[length - 3];
    }
    // 顶级域不可能为空 也不可能为undefined
    if (topLevelDomain) {
      const secondCompletedDomain = secondLevelDomain ? `${secondLevelDomain}.${topLevelDomain}` : '';
      const thirdCompletedDomain =
        thirdLevelDomain && secondCompletedDomain ? `${thirdLevelDomain}.${secondCompletedDomain}` : '';
      return {
        tld: topLevelDomain,
        sld: secondLevelDomain,
        scd: secondCompletedDomain,
        thld: thirdLevelDomain,
        thcd: thirdCompletedDomain,
      };
    } else {
      throw new Error(`${topLevelDomain}不合法`);
    }
  } else {
    throw new Error(`${hostname}不合法`);
  }
}

function isIP(str: string): boolean {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g.test(str);
}

export { isIP, getDomainInfo as domain };
