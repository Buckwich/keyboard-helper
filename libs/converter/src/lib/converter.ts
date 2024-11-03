import { KCFKeyboard, KCFLabels, QMKKeyboard } from '@keyboard-helper/keyboard-schema';
import { KleKey, KleKeyboard } from '@kcf-hub/kle-serial';
export class KCFConverter {
  public keyboard: KCFKeyboard;

  constructor(kcfKeyboard?: KCFKeyboard, qmkKeyboard?: QMKKeyboard) {
    this.keyboard = {
      layout: [],
    };
    if (kcfKeyboard) {
      this.keyboard = kcfKeyboard;
    }

    if (qmkKeyboard) {
      const importedKeyboard = KCFConverter.qmkToKcf(qmkKeyboard);
      this.keyboard = importedKeyboard;
    }
  }
  public static qmkToKcf(qmkKeyboard: QMKKeyboard): KCFKeyboard {
    const kcfKeyboard: KCFKeyboard = {
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

      return kcfKeyboard;
    }

    layout.forEach((key) => {
      kcfKeyboard.layout.push({
        x: key.x,
        y: key.y,
        w: key.w ?? 1,
        h: key.h ?? 1,
        r: key.r ?? 0,
        rx: key.rx ?? 0 ?? 0,
        ry: key.ry ?? 0,
        labels: {
          mc: { text: key.label || '' },
        },
      });
    });

    return kcfKeyboard;
  }

  public static kcfToQmk(kcfKeyboard: KCFKeyboard): QMKKeyboard {
    const qmkKeyboard: QMKKeyboard = {
      layouts: {
        LAYOUT: {
          layout: [],
        },
      },
    };
    if (!kcfKeyboard || !kcfKeyboard.layout) {
      console.error('No layout found in the KCF keyboard');
      return qmkKeyboard;
    }

    const layout = [];
    kcfKeyboard.layout.forEach((key) => {
      let matrix;

      if (key.row !== undefined && key.col !== undefined) {
        matrix = [key.row, key.col];
      }
      layout.push({
        x: key.x,
        y: key.y,
        w: key.w ?? 1,
        h: key.h ?? 1,
        r: key.r ?? 0,
        rx: key.rx ?? 0,
        ry: key.ry ?? 0,
        label: key.labels?.mc?.text || '',
        matrix,
      });
    });

    return qmkKeyboard;
  }

  static kleToKcf(kleKeyboard: KleKeyboard): KCFKeyboard {
    const kcfKeyboard: KCFKeyboard = {
      layout: [],
    };
    if (!kleKeyboard || !kleKeyboard.keys) {
      return kcfKeyboard;
    }

    kleKeyboard.keys.forEach((key) => {
      kcfKeyboard.layout.push({
        x: key.x,
        y: key.y,
        w: key.width ?? 1,
        h: key.height ?? 1,
        r: key.rotation_angle ?? 0,
        rx: key.rotation_x ?? 0,
        ry: key.rotation_y ?? 0,
        labels: KCFConverter.kleLabelsToKcf(key.labels),
      });
    });
    return kcfKeyboard;
  }

  static kcfToKle(kcfKeyboard: KCFKeyboard): KleKeyboard {
    const kleKeyboard: KleKeyboard = new KleKeyboard();

    kcfKeyboard.layout.forEach((key) => {
      const newKey = new KleKey();
      newKey.x = key.x;
      newKey.y = key.y;
      newKey.width = key.w;
      newKey.height = key.h;

      kleKeyboard.keys.push(newKey);
    });

    return kleKeyboard;
  }
  static kcfLabelsToKle(labels: KCFLabels): string[] {
    return Object.values(labels).map((label) => label.text);
  }

  private static kleLabelsToKcf(labels: string[]): KCFLabels {
    return {
      tl: {
        text: labels[0],
      },
      tc: {
        text: labels[1],
      },
      tr: {
        text: labels[2],
      },
      ml: {
        text: labels[3],
      },
      mc: {
        text: labels[4],
      },
      mr: {
        text: labels[5],
      },
      bl: {
        text: labels[6],
      },
      bc: {
        text: labels[7],
      },
      br: {
        text: labels[8],
      },
      fl: {
        text: labels[9],
      },
      fc: {
        text: labels[10],
      },
      fr: {
        text: labels[11],
      },
    };
  }
}
