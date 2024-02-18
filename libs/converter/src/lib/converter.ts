import { KCFKeyboard, QMKKeyboard } from '@keyboard-helper/keyboard-schema';

export class KCFConverter {
  public keyboard: KCFKeyboard;

  constructor(kfcKeyboard?: KCFKeyboard, qmkKeyboard?: QMKKeyboard) {
    this.keyboard = {
      layout: [],
    };
    if (kfcKeyboard) {
      this.keyboard = kfcKeyboard;
    }

    if (qmkKeyboard) {
      const importedKeyboard = KCFConverter.qmkToKfc(qmkKeyboard);
      this.keyboard = importedKeyboard;
    }
  }
  public static qmkToKfc(qmkKeyboard: QMKKeyboard): KCFKeyboard {
    const kfcKeyboard: KCFKeyboard = {
      layout: [],
    };
    const layouts = Object.keys(qmkKeyboard.layouts ?? {});
    if (layouts.length > 1) {
      console.warn(
        'Multiple layouts detected, only the first layout will be used. Support for multiple layouts will be added in the future.',
        { layouts }
      );
    }
    const layout = qmkKeyboard.layouts?.[layouts[0]].layout;
    if (!layout) {
      console.error('No layout found in the QMK keyboard');

      return kfcKeyboard;
    }

    layout.forEach((key) => {
      kfcKeyboard.layout.push({
        x: key.x,
        y: key.y,
        w: key.w ?? 1,
        h: key.h ?? 1,
        r: key.r,
        rx: key.rx,
        ry: key.ry,
        labels: {
          mc: { text: key.label || '' },
        },
      });
    });

    return kfcKeyboard;
  }
}
