import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import {
  Button,
  ComboBox,
  DropZone,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import styles from './main.module.css';
import { MyComboBox } from './my-combo-box';

/* eslint-disable-next-line */
export interface MainProps {}

export function Main(props: MainProps) {
  return (
    <div className="max-w-full mx-auto">
      <header className="p-4 text-lg font-bold">Main Header</header>
      <main className="flex flex-wrap -mx-2 mt-4">
        <div className="w-full md:w-1/2 px-2">
          <div className="p-4">
            <InputOrUrlCard></InputOrUrlCard>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="p-4">Column 2 Content</div>
        </div>
      </main>
    </div>
  );
}

const InputOrUrlCard = () => {
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
                  'border-bottom-right-radius': 0,
                  'border-top-right-radius': 0,
                  'border-top-left-radius': '8px',
                  'border-bottom-left-radius': '8px',
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
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Main;