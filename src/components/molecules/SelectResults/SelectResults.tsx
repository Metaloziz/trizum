import React, { FC } from 'react';

import Select, { CSSObjectWithLabel, SingleValue } from 'react-select';

import { ValueLabelT } from 'components/results/Results';

type Props = {
  options: ValueLabelT[];
  onChange: (value: SingleValue<ValueLabelT>) => void;
  minWidth?: string;
  className?: string;
};

const SelectResults: FC<Props> = props => {
  const { options, minWidth, onChange, className } = props;

  const selectStyles = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      background: '#E6EEF8',
      borderRadius: '30px',
      border: 'none',
      padding: '0 6px',
      height: '30px !important',
      minHeight: '30px',
      width: '100%',
      minWidth: minWidth || '300px',
      maxWidth: '360px',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    indicatorSeparator: () => ({ borderColor: 'transparent' }),
    dropdownIndicator: (base: CSSObjectWithLabel) => ({
      ...base,
      color: '#979797',
      padding: '0 5px 0 0',
    }),
    indicatorsContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: '0',
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      color: '#000',
      fontWeight: '600',
      fontFamily: 'Montserrat',
      fontSize: '11px',
    }),
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      height: '30px',
      padding: '0 10px',
    }),
    input: (base: CSSObjectWithLabel) => ({
      ...base,
      height: '30px',
      fontWeight: '600',
      fontSize: '11px',
      padding: '0',
      margin: '0',
    }),
    menuList: (base: CSSObjectWithLabel) => ({
      ...base,
      background: '#E6EEF8',
      fontWeight: '600',
      fontSize: '11px',
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      fontWeight: '600',
      fontFamily: 'Montserrat',
      fontSize: '11px',
    }),
    option: (
      base: CSSObjectWithLabel,
      { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean },
    ) => ({
      ...base,
      color: isSelected ? '#292EF9' : '#000',
      backgroundColor: isFocused ? '#fff' : '#E6EEF8',
    }),
  };

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      styles={selectStyles}
      onChange={onChange}
      className={className || ''}
      placeholder="Выбрать значение..."
    />
  );
};

export default SelectResults;
