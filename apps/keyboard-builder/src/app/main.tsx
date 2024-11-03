import { ReactNode, useEffect, useState, Button } from 'react';
import CreatableSelect from 'react-select/creatable';
import { KeyboardRenderer } from '@keyboard-helper/keyboard-renderer';
import { KCFConverter } from '@kcf/converter';
import JSON5 from 'json5';

import { KCFKeyboard, KCFKey } from '@keyboard-helper/keyboard-schema';

import { ActionMeta, Options, PropsValue, SingleValue } from 'react-select/dist/declarations/src';
import { createPrivateKey } from 'crypto';

import { deserialize, serialize } from '@kcf-hub/kle-serial';
import { KleKeyboard } from '@kcf-hub/kle-serial';
import { clearTransformer } from './transformer/clear.transformer';
import { transposeTransformer } from './transformer/split.transformer';
import { matrixTransformer } from './transformer/matrix.transformer';
import { ledTransformer } from './transformer/led.transformer';
import { labelTransformer } from './transformer/label.transformer';

import sofle from './sofle.keyboard.json';

export function Main() {
  const [kleInput, setKleInput] = useState('');
  const [kleTransformed, setKleTransformed] = useState('');
  const [kcfTransformed, setKcfTransformed] = useState<KCFKeyboard>();

  let kleKeyboard: KleKeyboard | undefined = undefined;
  let kcfKeyboard: KCFKeyboard | undefined = undefined;
  let transformedKcfKeyboard: KCFKeyboard | undefined = undefined;
  let transformedKleKeyboard: KleKeyboard | undefined = undefined;

  // if (kleInput) kleKeyboard = deserialize(JSON5.parse('[' + kleInput + ']'));
  // if (kleKeyboard) kcfKeyboard = KCFConverter.kleToKcf(kleKeyboard);

  kcfKeyboard = KCFConverter.qmkToKcf(sofle as any as KCFKeyboard);

  function onTransformClick(): void {
    console.log('Transform Clicked');

    if (kcfKeyboard) {
      console.log({ kcfKeyboard });
      transformedKcfKeyboard = labelTransformer(transposeTransformer(kcfKeyboard));
      console.log({ transformedKcfKeyboard });
      setKcfTransformed(transformedKcfKeyboard);

      transformedKleKeyboard = KCFConverter.kcfToKle(transformedKcfKeyboard);
      console.log({ transformedKleKeyboard });

      console.log(transformedKleKeyboard instanceof KleKeyboard);
      const transformedKleSerialized = JSON5.stringify(serialize(transformedKleKeyboard), { quote: '"' });
      console.log({ transformedKleSerialized });

      setKleTransformed(transformedKleSerialized);
    }
  }

  return (
    <div className="max-w-full mx-auto">
      <header className="p-4 text-lg font-bold">KCF Builder</header>
      <main className="flex flex-wrap  mt-4">
        <div className="w-full md:w-1/2 px-2">
          <div className="">
            <div className="card mx-auto shadow-lg rounded-lg p-4">
              <div className="mb-4 ">
                <div>
                  <textarea
                    id="textareaInput"
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    rows={4}
                    placeholder="Paste KLE here"
                    value={kleInput}
                    onChange={(event) => setKleInput(event.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="w-100 card mx-auto shadow-lg rounded-lg p-4">
            {kcfKeyboard ? (
              <KeyboardRenderer keyboard={kcfKeyboard}></KeyboardRenderer>
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

                <pre>{JSON.stringify(kleKeyboard, undefined, 2)}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <button className="btn btn-md join-item" onClick={onTransformClick}>
            transform
          </button>
        </div>

        <div className="w-full md:w-1/2 px-2">
          <div className="">
            <div className="card mx-auto shadow-lg rounded-lg p-4">
              <div className="mb-4 ">
                <div>
                  <textarea
                    id="textareaInput"
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    rows={4}
                    placeholder="Paste KLE here"
                    value={kleTransformed}
                    onChange={(event) => setKleTransformed(event.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="w-100 card mx-auto shadow-lg rounded-lg p-4">
            {kcfTransformed ? (
              <KeyboardRenderer keyboard={kcfTransformed}></KeyboardRenderer>
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
                <pre>
                  a{JSON.stringify(transformedKleKeyboard)}b{transformedKcfKeyboard}c a{JSON.stringify(kleKeyboard)}b
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
