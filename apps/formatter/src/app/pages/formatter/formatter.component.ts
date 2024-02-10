import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { exampleKeyboardInfo } from './example';
import { KeyboardLayoutRendererComponent } from '../../components/keyboard-layout-renderer/keyboard-layout-renderer.component';

@Component({
  selector: 'keyboard-helper-formatter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, KeyboardLayoutRendererComponent],
  templateUrl: './formatter.component.html',
  styleUrl: './formatter.component.scss',
})
export class FormatterComponent {
  keyboardInfoInputForm = new FormControl<string>(exampleKeyboardInfo);

  keys: ParsedKey[] = [];
  yKeys: ParsedKey[] = [];

  expectedKeys = [
    {
      x: 0,
      y: 0,
      label: 'L06',
    },
    {
      x: 1,
      y: 0,
      label: 'L05',
    },
    {
      x: 2,
      y: 0,
      label: 'L04',
    },
    {
      x: 3,
      y: 0,
      label: 'L03',
    },
    {
      x: 4,
      y: 0,
      label: 'L02',
    },
    {
      x: 5,
      y: 0,
      label: 'L01',
    },
    {
      x: 10,
      y: 0,
      label: 'R01',
    },
    {
      x: 11,
      y: 0,
      label: 'R02',
    },
    {
      x: 12,
      y: 0,
      label: 'R03',
    },
    {
      x: 13,
      y: 0,
      label: 'R04',
    },
    {
      x: 14,
      y: 0,
      label: 'R05',
    },
    {
      x: 15,
      y: 0,
      label: 'R06',
    },
    {
      x: 0,
      y: 1,
      label: 'L12',
    },
    {
      x: 1,
      y: 1,
      label: 'L11',
    },
    {
      x: 2,
      y: 1,
      label: 'L10',
    },
    {
      x: 3,
      y: 1,
      label: 'L09',
    },
    {
      x: 4,
      y: 1,
      label: 'L08',
    },
    {
      x: 5,
      y: 1,
      label: 'L07',
    },
    {
      x: 10,
      y: 1,
      label: 'R07',
    },
    {
      x: 11,
      y: 1,
      label: 'R08',
    },
    {
      x: 12,
      y: 1,
      label: 'R09',
    },
    {
      x: 13,
      y: 1,
      label: 'R10',
    },
    {
      x: 14,
      y: 1,
      label: 'R11',
    },
    {
      x: 15,
      y: 1,
      label: 'R12',
    },
    {
      x: 0,
      y: 2,
      label: 'L20',
    },
    {
      x: 1,
      y: 2,
      label: 'L19',
    },
    {
      x: 2,
      y: 2,
      label: 'L18',
    },
    {
      x: 3,
      y: 2,
      label: 'L17',
    },
    {
      x: 4,
      y: 2,
      label: 'L16',
    },
    {
      x: 5,
      y: 2,
      label: 'L15',
    },
    {
      x: 6,
      y: 2,
      label: 'L14',
    },
    {
      x: 7,
      y: 2,
      label: 'L13',
    },
    {
      x: 8,
      y: 2,
      label: 'R13',
    },
    {
      x: 9,
      y: 2,
      label: 'R14',
    },
    {
      x: 10,
      y: 2,
      label: 'R15',
    },
    {
      x: 11,
      y: 2,
      label: 'R16',
    },
    {
      x: 12,
      y: 2,
      label: 'R17',
    },
    {
      x: 13,
      y: 2,
      label: 'R18',
    },
    {
      x: 14,
      y: 2,
      label: 'R19',
    },
    {
      x: 15,
      y: 2,
      label: 'R20',
    },
    {
      x: 3,
      y: 3,
      label: 'L25',
    },
    {
      x: 4,
      y: 3,
      label: 'L24',
    },
    {
      x: 5,
      y: 3,
      label: 'L23',
    },
    {
      x: 6,
      y: 3,
      label: 'L22',
    },
    {
      x: 7,
      y: 3,
      label: 'L21',
    },
    {
      x: 8,
      y: 3,
      label: 'R21',
    },
    {
      x: 9,
      y: 3,
      label: 'R22',
    },
    {
      x: 10,
      y: 3,
      label: 'R23',
    },
    {
      x: 11,
      y: 3,
      label: 'R24',
    },
    {
      x: 12,
      y: 3,
      label: 'R25',
    },
  ].map((a: any) => {
    return {
      x: a.x,
      y: a.y,
      width: a.w || 1,
      height: a.h || 1,
      color: a.color || '#bbb',
      labels: [a.label || '', '', '', '', '', '', '', '', ''],
    };
  });
  doStuff() {
    const keyboardInfoString = this.keyboardInfoInputForm.value;
    if (!keyboardInfoString) throw new Error('No keyboard info provided');

    const keyboardInfoJson = JSON.parse(keyboardInfoString || '');

    console.log(keyboardInfoJson);

    this.keys = keyboardInfoJson.layouts.LAYOUT_split_3x6_5.layout.map(
      (a: any) => {
        return {
          x: a.x,
          y: a.y,
          width: a.w || 1,
          height: a.h || 1,
          color: a.color || '#bbb',
          labels: [a.label || '', '', '', '', '', '', '', '', ''],
        };
      }
    );
    this.print(this.keys);

    this.yKeys = this.normalizeKeyboardLayout(this.keys);

    this.print(this.yKeys);
  }

  format(keys: ParsedKey[]): string {
    return keys.map((key) => `x:${key.x}, y:${key.y}`).join('\n');
  }

  print(keys: ParsedKey[]) {
    console.log(
      keys.map((key) => ({ x: key.x, y: key.y, label: key.labels[0] }))
    );
  }

  myNormalizer(keys: ParsedKey[]): ParsedKey[] {
    const newKeys = JSON.parse(JSON.stringify(keys));
    let currentRow = 0;

    for (let i = 1; i < newKeys.length; i++) {
      let currentKey = newKeys[i];
      let previousKey = newKeys[i - 1];

      if (currentKey.y === previousKey.y) {
        currentKey.row = currentRow;
        continue;
      }

      //distance calculation point to point
      const distance = Math.sqrt(
        Math.pow(currentKey.x - previousKey.x, 2) +
          Math.pow(currentKey.y - previousKey.y, 2)
      );
      if (distance > 2) {
        currentRow++;
      }
      currentKey.row = currentRow;
    }

    return newKeys.map((key: ParsedKey & { row: number }) => ({
      ...key,
      y: key.row,
    }));
  }

  normalizeKeyboardLayout(keys: ParsedKey[]): ParsedKey[] {
    // First, find the minimum y value for each row to normalize the y positions
    const minYValuesForRow: { [key: number]: number } = {};
    keys.forEach((key) => {
      // Assume each distinct y value indicates a separate row and round it to treat close values as the same row
      const roundedY = Math.round(key.y);
      if (
        minYValuesForRow[roundedY] === undefined ||
        minYValuesForRow[roundedY] > key.y
      ) {
        minYValuesForRow[roundedY] = key.y;
      }
    });

    // Normalize y positions and adjust x positions
    const normalizedKeys = keys.map((key) => {
      const roundedY = Math.round(key.y);
      const normalizedY = Object.keys(minYValuesForRow).indexOf(
        roundedY.toString()
      );
      return {
        ...key,
        x: Math.round(key.x), // Assuming normalization implies aligning x positions to the nearest integer
        y: normalizedY,
      };
    });

    return normalizedKeys;
  }

  normalizeKeyboardLayoutB(keys: ParsedKey[]): ParsedKey[] {
    // Sort keys by y, then x to ensure correct ordering
    const sortedKeys = keys.sort((a, b) => a.y - b.y || a.x - b.x);

    // Normalize y positions
    let currentY = 0;
    let lastY = sortedKeys[0].y;
    for (let i = 0; i < sortedKeys.length; i++) {
      if (sortedKeys[i].y !== lastY) {
        currentY++;
        lastY = sortedKeys[i].y;
      }
      sortedKeys[i].y = currentY;
    }

    // Adjust x positions within each row
    const normalizedKeys: ParsedKey[] = [];
    let currentRow = 0;
    let xCounter = 0;
    sortedKeys.forEach((key) => {
      if (key.y !== currentRow) {
        currentRow = key.y;
        xCounter = 0;
      }
      normalizedKeys.push({
        x: xCounter,
        y: currentRow,
        labels: key.labels,
        width: key.width,
        height: key.height,
        color: key.color,
      });
      xCounter++;
    });

    return normalizedKeys;
  }

  normalizeKeyboardLayoutC(keys: ParsedKey[]): ParsedKey[] {
    // Assuming keys that are next to each other are on the same row
    // Starting conditions
    let currentRow = 0;
    let lastY = keys[0].y; // Initialize with the first key's y
    const epsilon = 0.1; // Small value to determine significant change in y

    // Normalize keys
    const normalizedKeys = keys.map((key, index) => {
      if (index > 0 && Math.abs(key.y - lastY) >= epsilon) {
        // Significant change in y, indicating a new row
        currentRow++;
        lastY = key.y; // Update lastY to the current key's y for future comparisons
      }

      // Normalize x to be sequential starting from 0 in each row, y to be the currentRow
      return {
        x:
          index > 0 && Math.abs(key.y - lastY) < epsilon
            ? keys[index - 1].x + 1
            : 0,
        y: currentRow,
        labels: key.labels,
        width: key.width,
        height: key.height,
        color: key.color,
      };
    });

    return normalizedKeys;
  }
  alignY(keys: ParsedKey[]): ParsedKey[] {
    //deep clone the array
    const newKeys = JSON.parse(JSON.stringify(keys));

    let currentY = newKeys[0].y;
    for (let i = 1; i < newKeys.length; i++) {
      if (Math.abs(newKeys[i].y - currentY) < 1) {
        currentY = newKeys[i].y;
        newKeys[i].y = newKeys[i - 1].y;
      }
    }
    return newKeys;
  }
}

interface ParsedKey {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  labels: string[];
}
