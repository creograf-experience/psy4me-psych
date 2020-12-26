const localURL = 'http://192.168.0.102:3100';
const prodURL = 'http://derjava.creograf.ru';

const defaultConfig = {
  IP: `${prodURL}/api`,
  mediaIP: `${prodURL}/photos`,
  tokenName: 'APP_NAMEDevClientToken',
};
// const defaultConfig = { IP: 'PROD_IP', tokenName: 'APP_NAMEClientToken' };
// http://derjava.creograf.ru/api
// http://192.168.0.240:3100/api

export const host = `${defaultConfig.IP}`;
export const mediaHost = `${defaultConfig.mediaIP}`;
export const { tokenName } = defaultConfig;
