import React, { FC } from 'react';
import { MenuItem, Select } from '@mui/material';
import styles from './field.module.scss';
import { View } from 'react-native';

type SelectOption = {
  label: string;
  value: string;
};

interface Props {
  options: SelectOption[];
  value: string;
  id: string;
  onChangeValue: (key: string, value: string) => void;
}

export const Field: FC<Props> = ({ id, options = [], value = '', onChangeValue: changeValue }) => {
  return (
    <View>
      <Select
        defaultValue="0"
        className={styles.bullCowsSelect}
        classes={{ nativeInput: styles.lkj }}
        IconComponent={() => <></>}
        onChange={({target: {value}}) => changeValue(id,value)}
        value={value}
      >
        {options.map(item => (
          <MenuItem key={`${id}-${item.value}`} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </View>
  );
};
