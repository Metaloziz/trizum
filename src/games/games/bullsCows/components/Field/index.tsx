import React, { FC } from 'react';

import Select from 'react-select';

type SelectOption = {
  label: string;
  value: string;
};

interface Props {
  options: SelectOption[];
  value?: string;
  id: string;
  onChangeValue?: (key: string, value: string) => void;
  onChange: (key: string, value: any) => void;
}

export const Field: FC<Props> = ({ id, options, value, onChange }) => {
  return (
    <Select
      key={id}
      options={options as any}
      value={value}
      onChange={newValue => onChange(id, newValue)}
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
        }),
        indicatorsContainer: () => ({
          display: 'none',
        }),
        container: (prevStyle, prev) => ({
          ...prevStyle,
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
          console.log({prevStyle})
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
