import { KCFKey, KCFKeyboard } from '@keyboard-helper/keyboard-schema';
import { getMatrixSize } from './utils';

export function transposeTransformer(keyboard: KCFKeyboard): KCFKeyboard {
  const transformedKeyboard = structuredClone(keyboard);

  const { minX, maxX, minY, maxY } = getMatrixSize(transformedKeyboard.layout);

  const halfX = (maxX + minX) / 2;

  const leftHalf = transformedKeyboard.layout.filter((key) => key.x <= halfX);
  const rightHalf = transformedKeyboard.layout.filter((key) => key.x > halfX);
  const { minX: leftMinX } = getMatrixSize(leftHalf);
  leftHalf.forEach((key) => {
    key.x -= leftMinX;
  });

  const { minX: rightMinX } = getMatrixSize(rightHalf);
  rightHalf.forEach((key) => {
    key.x -= rightMinX;
    key.y += maxY + 3;
  });

  transformedKeyboard.layout = [...leftHalf, ...rightHalf];
  //   transformedKeyboard.layout = myNormalizer(transformedKeyboard.layout);

  return transformedKeyboard;
}

function splitAndStack(array: string[][]): string[][] {
  const result: string[][] = [];

  for (const row of array) {
    // Split each row in half
    const midIndex = Math.ceil(row.length / 2);
    const firstHalf = row.slice(0, midIndex);
    const secondHalf = row.slice(midIndex);

    // Push each half as a separate row
    result.push(firstHalf);
    result.push(secondHalf);
  }

  return result;
}

function myNormalizer(keys: KCFKey[]): KCFKey[] {
  const newKeys = JSON.parse(JSON.stringify(keys));
  let currentRow = 0;

  for (let i = 1; i < newKeys.length; i++) {
    const currentKey = newKeys[i];
    const previousKey = newKeys[i - 1];

    if (currentKey.y === previousKey.y) {
      currentKey.row = currentRow;
      continue;
    }

    //distance calculation point to point
    const distance = Math.sqrt(
      Math.pow(currentKey.x - (previousKey.x + previousKey.w - 1), 2) +
        Math.pow(currentKey.y - (previousKey.y + previousKey.h - 1), 2)
    );
    if (distance > 2) {
      currentRow++;
    }
    currentKey.row = currentRow;
    // console.log({ i, l: currentKey.labels.mc?.text, row: currentRow, d: distance, currentKey, previousKey });
  }

  return newKeys.map((key: KCFKey & { row: number }) => ({
    ...key,
    y: key.row ?? 0,
    currentRow: undefined,
  }));
}
