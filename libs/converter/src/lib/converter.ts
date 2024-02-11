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
    const layout = qmkKeyboard.layouts?.[0].layout;
    if (layout) {
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
    }
    return kfcKeyboard;
  }
}
