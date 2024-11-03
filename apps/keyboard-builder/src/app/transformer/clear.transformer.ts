import { KCFKeyboard } from '@keyboard-helper/keyboard-schema';

export function clearTransformer(keyboard: KCFKeyboard): KCFKeyboard {
  const transformedKeyboard = structuredClone(keyboard);
  //   transformedKeyboard.layout.forEach((key) => {
  //     key.labels = {};
  //   });
  return transformedKeyboard;
}
