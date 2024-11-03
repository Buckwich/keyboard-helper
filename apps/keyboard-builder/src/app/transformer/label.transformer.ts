import { KCFKey, KCFKeyboard } from '@keyboard-helper/keyboard-schema';
import { toMatrix } from './utils';

const printLed = true;
const printMatrix = true;

export function labelTransformer(keyboard: KCFKeyboard): KCFKeyboard {
  const transformedKeyboard = structuredClone(keyboard);

  transformedKeyboard.layout.forEach((key) => {
    if (printLed && key.led !== undefined) key.labels.br = { text: key.led.toString() };

    if (printMatrix && key.row !== undefined && key.col !== undefined)
      key.labels.bl = { text: `${key.row},]${key.col}` };
  });

  return transformedKeyboard;
}
