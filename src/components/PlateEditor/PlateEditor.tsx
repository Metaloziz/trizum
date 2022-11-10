import { Plate, PlateProvider, TEditableProps } from '@udecode/plate';
import { plugins } from './plugins/plugins';
import { ToolbarButtons } from './toolbar/ToolbarButtons';
import { MyValue } from './types';
import React, { ReactElement } from 'react';
import './PlateEditor.css';

type PlateEditorType = {
  onChange?: (value: MyValue) => void;
  value?: MyValue;
  readOnly?: boolean;
  hiddenToolbar?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  spellCheck?: boolean;
  initialValue?: MyValue;
  className?: string;
};

export const PlateEditor = (props: PlateEditorType): ReactElement => {
  const {
    value,
    onChange,
    hiddenToolbar,
    initialValue,
    className,
    readOnly = false,
    placeholder = '',
    spellCheck = true,
    autoFocus = false,
  } = props;

  const editableProps: TEditableProps<MyValue> = {
    spellCheck,
    autoFocus,
    readOnly,
    placeholder,
  };

  return (
    <div className={`plate-container ${className}`}>
      <PlateProvider<MyValue>
        initialValue={initialValue}
        value={value}
        onChange={onChange}
        plugins={plugins}
      >
        {!hiddenToolbar && <ToolbarButtons />}

        <Plate<MyValue> editableProps={editableProps} />
      </PlateProvider>
    </div>
  );
};
