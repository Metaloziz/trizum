import React, { FC } from 'react';

import Select from 'react-select';

interface Props {
  value: string;
  id: string;
  onChangeValue?: (key: string, value: string) => void;
  onChange: (key: string, value: any) => void;
}

const options = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
];

export const Field: FC<Props> = ({ id, value, onChange }) => {
  return (
    <Select
      key={id}
      options={options as any}
      value={value}
      onChange={newValue => onChange(id, newValue)}
      isSearchable={false}
      styles={{
        control: prevStyle => ({
          ...prevStyle,
          width: 65,
          height: 65,
          backgroundColor: '#CFD8DC',
          borderRadius: 90,
          marginRight: 15,
          marginLeft: 15,
          zIndex: 2,
          marginBottom: 10
        }),
        indicatorsContainer: () => ({
          display: 'none',
        }),
        container: (prevStyle, prev) => ({
          ...prevStyle,
          zIndex: 1,
        }),
        singleValue: prevStyle => ({
          ...prevStyle,
          textAlign: 'center',
          fontSize: 32,
          fontWeight: '600',
        }),
        menu: prevStyle => ({
          ...prevStyle,
          top: -320,
          backgroundColor: "#E6EEF8",
          maxWidth: 65,
          left: 15,
          paddingBottom: 24,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50
        }),
        menuList: prevStyle => {
          return {
            ...prevStyle,
            maxHeight: 320,
            backgroundColor: "#E6EEF8",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }
        },
        option: (prevStyle, state) => {
          return {
            ...prevStyle,
            textAlign: 'center',
            backgroundColor: state.isSelected ? '#3C228C33' : '#E6EEF8',
            padding: "6px 12px",
            cursor: "pointer"
          };
        },
        
      }}
    />
  );
};
