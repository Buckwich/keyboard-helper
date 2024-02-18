import { ReactNode, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { KeyboardRenderer } from '@keyboard-helper/keyboard-renderer';
import { KCFConverter } from '@kcf/converter';
import JSON5 from 'json5';
import { RadioButtonSelect } from './radio-select';
import { KCFKeyboard, KCFKey } from '@keyboard-helper/keyboard-schema';
import { toCode, toComment } from './to-code';
import { ActionMeta, Options, PropsValue, SingleValue } from 'react-select/dist/declarations/src';
import { getKeyboards, getKeymapsForKeyboard, validateUrl } from './api';

type Option = { value: string; label: string };

export function Main() {
  const [keyboards, setKeyboards] = useState<
    { label: string; path: string; value: string; keymapListUrl: string }[] | null
  >(null);
  useEffect(() => {
    getKeyboards()
      .then((response) => {
        setKeyboards(
          response.map(({ name, path }: { name: string; path: string }) => {
            return {
              value: `https://raw.githubusercontent.com/qmk/qmk_firmware/master/${path}`,
              label: name,
            };
          })
        );
      })
      .catch((error) => console.error(error));
  }, []);

  const [keyboardUrlValue, setKeyboardUrlValue] = useState<Option | null>(null);
  const [keymapUrlValue, setKeymapUrlValue] = useState<Option | null>(null);

  const [keymaps, setKeymaps] = useState<Option[]>([]);
  useEffect(() => {
    setKeymaps([]);
    setKeymapUrlValue(null);
    setKeymapTextAreaValue('');
    if (!keyboardUrlValue?.value) return;
    if (keyboardUrlValue.label === keyboardUrlValue.value) return; //this is a manual added entry, no predefined keymaps exist
    getKeymapsForKeyboard(keyboardUrlValue.label).then((response) => {
      setKeymaps(
        response.map(({ name, path }: { name: string; path: string }) => {
          console.log({ name, path });
          return {
            value: `https://raw.githubusercontent.com/qmk-helper/qmk-database/master/keymaps/${keyboardUrlValue.label}/${name}.keymap.json`,
            label: name,
          };
        })
      );
    });
  }, [keyboardUrlValue]);
  const [keyboardTextAreaValue, setKeyboardTextAreaValue] = useState('');
  const [keymapTextAreaValue, setKeymapTextAreaValue] = useState('');

  const [configAlgorithmValue, setConfigAlgorithmValue] = useState('row');

  async function handleKeyboardSelectChange(option: SingleValue<Option>, actionMeta: ActionMeta<Option>) {
    setKeyboardUrlValue(option);

    if (!option) return;

    if (!validateUrl(option.value)) {
      //TODO: show error message
      console.error('Invalid URL: ', option.value);
      return;
    }

    //TODO: show loading indicator
    const keyboard = await fetch(option.value);
    setKeyboardTextAreaValue(await keyboard.text());
  }

  async function handleKeymapSelectChange(option: SingleValue<Option>, actionMeta: ActionMeta<Option>) {
    setKeymapUrlValue(option);

    if (!option) return;

    if (!validateUrl(option.value)) {
      //TODO: show error message
      console.error('Invalid URL: ', option.value);
      return;
    }

    //TODO: show loading indicator
    const keyboard = await fetch(option.value);
    setKeymapTextAreaValue(await keyboard.text());
  }

  let keyboard = undefined;
  try {
    keyboard = KCFConverter.qmkToKfc(JSON5.parse(keyboardTextAreaValue));
  } catch (e) {
    keyboard = undefined;
    // console.log(e);
  }

  let keymap: { layers: string[][] } | undefined = undefined;
  try {
    keymap = JSON5.parse(keymapTextAreaValue);
  } catch (e) {
    keymap = undefined;
    // console.log(e);
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
            <InputOrUrlCard
              options={keyboards ?? []}
              selectValue={keyboardUrlValue}
              onSelectValueChange={handleKeyboardSelectChange}
              content={keyboardTextAreaValue}
              onContentChange={setKeyboardTextAreaValue}
              // onButtonClick={importKeyboard}
              texts={{
                selectPlaceholder: 'Select a keyboard or paste a URL',
                selectCreateLabel: (inputValue) => `Use Url "${inputValue}"`,
                textAreaPlaceholder: 'Paste contents of your keyboard info.json file here',
                dividerText: 'OR',
                // buttonText: 'Import',
              }}
            ></InputOrUrlCard>
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
            <InputOrUrlCard
              content={keymapTextAreaValue}
              onContentChange={setKeymapTextAreaValue}
              options={keymaps}
              selectValue={keymapUrlValue}
              onSelectValueChange={handleKeymapSelectChange}
              // onButtonClick={importKeymap}
              texts={{
                selectPlaceholder: 'Select a keymap or paste a URL',
                selectCreateLabel: (inputValue) => `Use Url "${inputValue}"`,
                textAreaPlaceholder: 'Paste contents of your keymap info.json file here',
                dividerText: 'OR',
                // buttonText: 'Import',
              }}
            ></InputOrUrlCard>
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

const InputOrUrlCard = ({
  options,
  content,
  onContentChange,
  selectValue,
  onSelectValueChange,
  // onButtonClick,
  texts,
}: {
  options: Options<Option>;
  content: string;
  onContentChange: (content: string) => void;
  selectValue: PropsValue<Option>;
  onSelectValueChange: (option: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;

  // onButtonClick: (e: PressEvent) => void;
  texts: {
    selectPlaceholder: string;
    selectCreateLabel: (inputValue: string) => ReactNode;
    textAreaPlaceholder: string;
    dividerText: string;
    // buttonText: string;
  };
}) => {
  return (
    <div className="card mx-auto shadow-lg rounded-lg p-4">
      <div className="mb-4 ">
        {/* <div className="join flex">
          <div className="flex-1 "> */}
        <CreatableSelect
          isClearable
          formatCreateLabel={texts.selectCreateLabel}
          placeholder={texts.selectPlaceholder}
          options={options}
          value={selectValue}
          onChange={onSelectValueChange}
          // styles={{
          //   control: (provided, state) => ({
          //     ...provided,
          //     height: '100%',
          //     borderBottomRightRadius: 0,
          //     borderTopRightRadius: 0,
          //     borderTopLeftRadius: '8px',
          //     borderBottomLeftRadius: '8px',
          //   }),
          //   container: (provided, state) => ({
          //     ...provided,
          //     height: '100%',
          //   }),
          // }}
        ></CreatableSelect>
        {/* </div> */}
        {/* <Button className="btn btn-md join-item" onPress={onButtonClick}>
            {texts.buttonText}
          </Button> */}
        {/* </div> */}

        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 border-t"></div>
          <div className="">{texts.dividerText}</div>
          <div className="flex-1 border-t "></div>
        </div>

        <div>
          <textarea
            id="textareaInput"
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            placeholder={texts.textAreaPlaceholder}
            value={content}
            onChange={(event) => onContentChange(event.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Main;
