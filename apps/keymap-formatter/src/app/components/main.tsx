import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Button } from 'react-aria-components';

import { KeyboardRenderer } from '@keyboard-helper/keyboard-renderer';
import { KCFConverter } from '@kcf/converter';
import JSON5 from 'json5';
import { RadioButtonSelect } from './radio-select';
import { KCFKeyboard, KCFKey } from '@keyboard-helper/keyboard-schema';
import { toCode, toComment } from './to-code';

export function Main() {
  const [keyboardTextAreaValue, setKeyboardTextAreaValue] = useState('');
  const [keymapTextAreaValue, setKeymapTextAreaValue] = useState('');

  const [configAlgorithmValue, setConfigAlgorithmValue] = useState('row');

  const handleKeyboardTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeyboardTextAreaValue(event.target.value);
  };
  const handleKeymapTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeymapTextAreaValue(event.target.value);
  };

  let keyboard = undefined;
  try {
    keyboard = KCFConverter.qmkToKfc(JSON5.parse(keyboardTextAreaValue));
  } catch (e) {
    keyboard = undefined;
    console.log(e);
  }

  let keymap: { layers: string[][] } | undefined = undefined;
  try {
    keymap = JSON5.parse(keymapTextAreaValue);
  } catch (e) {
    keymap = undefined;
    console.log(e);
  }

  if (keyboard && keymap) {
    if (keyboard.layout.length === keymap.layers[0].length) {
      keyboard.layout.forEach((key, index) => {
        key.labels.mc = {
          ...key.labels.mc,
          text: keymap?.layers[0][index] || '',
        };
      });
    }
  }

  let normalizedKeyboard: KCFKeyboard | undefined = undefined;
  if (keyboard) normalizedKeyboard = JSON.parse(JSON.stringify(keyboard)) as KCFKeyboard;
  if (normalizedKeyboard) {
    switch (configAlgorithmValue) {
      case 'row':
        normalizedKeyboard.layout = myNormalizer(normalizedKeyboard.layout);

        break;
      case 'round':
        normalizedKeyboard.layout = normalizedKeyboard.layout.map((key, index) => {
          return {
            ...key,
            x: Math.round(key.x),
            y: Math.round(key.y),
          };
        });
        break;
      case 'floor':
        normalizedKeyboard.layout = normalizedKeyboard.layout.map((key, index) => {
          return {
            ...key,
            x: Math.floor(key.x),
            y: Math.floor(key.y),
          };
        });
        break;
      case 'ceil':
        normalizedKeyboard.layout = normalizedKeyboard.layout.map((key, index) => {
          return {
            ...key,
            x: Math.ceil(key.x),
            y: Math.ceil(key.y),
          };
        });
        break;
      default:
        normalizedKeyboard = keyboard;
        break;
    }
  }

  return (
    <div className="max-w-full mx-auto">
      <header className="p-4 text-lg font-bold">KCF Formatter</header>
      <main className="flex flex-wrap  mt-4">
        <div className="w-full md:w-1/2 px-2">
          <div className="">
            <InputOrUrlCard value={keyboardTextAreaValue} setValue={handleKeyboardTextAreaChange}></InputOrUrlCard>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="w-100 card mx-auto shadow-lg rounded-lg p-4">
            {keyboard ? (
              <KeyboardRenderer keyboard={keyboard}></KeyboardRenderer>
            ) : (
              <div>
                <p>
                  To get started, please select your preferred keyboard or import a QMK info.json file from any URL. You
                  can also paste the json content directly into the provided field.
                </p>
                <p>
                  You can either select a keyboard from the list or paste a URL to a QMK info.json. Alternatively you
                  can just paste the contents of the file directly.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="">
            <InputOrUrlCard value={keymapTextAreaValue} setValue={handleKeymapTextAreaChange}></InputOrUrlCard>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="w-100 card mx-auto shadow-lg rounded-lg p-4">
            {normalizedKeyboard && <KeyboardRenderer keyboard={normalizedKeyboard}></KeyboardRenderer>}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="w-100 card mx-auto shadow-lg rounded-lg p-4">
            <h1>Config</h1>
            <h2>Normalisation Algorithm</h2>
            <RadioButtonSelect
              selectedOption={configAlgorithmValue}
              setSelectedOption={setConfigAlgorithmValue}
              options={[
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Row based',
                  value: 'row',
                },
                {
                  label: 'Rounding',
                  value: 'round',
                },
                {
                  label: 'Floorign',
                  value: 'floor',
                },
                {
                  label: 'Ceiling',
                  value: 'ceil',
                },
              ]}
              formName={'configAlgorithm'}
            ></RadioButtonSelect>
          </div>
        </div>{' '}
        <div className="w-full md:w-1/2 px-2">
          <div className="w-100 card mx-auto shadow-lg rounded-lg p-4">
            <h1>Code</h1>
            <pre>{toCode(normalizedKeyboard?.layout || [])}</pre>
          </div>
          <div className="w-100 card mx-auto shadow-lg rounded-lg p-4">
            <h1>Comment</h1>
            <pre>{toComment(normalizedKeyboard?.layout || [])}</pre>
          </div>
        </div>
      </main>
    </div>
  );
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

const InputOrUrlCard = ({ value, setValue }: any) => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more predefined options here
  ];

  return (
    <div className="card mx-auto shadow-lg rounded-lg p-4">
      <div className="mb-4 ">
        <div className="join flex">
          <div className="flex-1 ">
            <CreatableSelect
              formatCreateLabel={(inputValue) => `Use Url "${inputValue}"`}
              placeholder="Select a keyboard or paste a URL"
              options={options}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: '100%',
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                }),
                container: (provided, state) => ({
                  ...provided,
                  height: '100%',
                }),
              }}
            ></CreatableSelect>
          </div>
          <Button className="btn btn-md join-item">Import</Button>
        </div>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 border-t"></div>
          <div className="">OR</div>
          <div className="flex-1 border-t "></div>
        </div>

        <div>
          <textarea
            id="textareaInput"
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            placeholder="Paste contents of your keyboard info.json file here"
            value={value}
            onChange={setValue}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Main;
