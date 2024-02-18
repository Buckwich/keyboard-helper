import JSON5 from 'json5';

export async function getKeyboards() {
  console.log('fetching keyboards');
  //   return [
  //     {
  //       name: '0_sixty/base',
  //       path: 'keyboards/0_sixty/base/info.json',
  //     },
  //     {
  //       name: '0_sixty/underglow',
  //       path: 'keyboards/0_sixty/underglow/info.json',
  //     },
  //     {
  //       name: '0xc7/61key',
  //       path: 'keyboards/0xc7/61key/info.json',
  //     },
  //     {
  //       name: '0xcb/1337',
  //       path: 'keyboards/0xcb/1337/info.json',
  //     },
  //   ];
  return fetchJson('https://raw.githubusercontent.com/qmk-helper/qmk-database/master/keyboards.json');
}

export async function getKeymapsForKeyboard(keyboardName: string) {
  return fetchJson(
    `https://raw.githubusercontent.com/qmk-helper/qmk-database/master/keymaps/${keyboardName}/keymaps.json`
  );
}

export async function getKeyboardInfo(keyboardPath: string) {
  return fetchJson5(`https://raw.githubusercontent.com/qmk/qmk_firmware/master/${keyboardPath}`);
}

//base functions
export async function fetchJson5(url: string) {
  const response = await fetch(url);
  const content = await response.text();
  return JSON5.parse(content);
}

export async function fetchJson(url: string) {
  const response = await fetch(url);
  return await response.json();
}

export function validateUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
