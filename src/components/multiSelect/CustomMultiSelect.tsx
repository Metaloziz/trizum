import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import cn from 'classnames';

import style from './CustomMultiSelect.module.scss';
import * as React from 'react';

import MultiSelectUnstyled, { MultiSelectUnstyledProps } from '@mui/base/MultiSelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';
// import { FormControl } from '@material-ui/core';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  box-sizing: border-box;
  min-height: calc(1em + 18px);
  min-width: 160px;
  max-width:1000px;
  width:100%;
  padding: 8.5px 14px;
  border: rgba(0, 0, 0, 0.23) solid 1px;
  border-radius: 4px;
  
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};

  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
     font-size: 1rem;
     color: rgba(0, 0, 0, 0.54);
     width: 1rem;
     height: 1rem;
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

export const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 100;
  width: 100%;
`;

export type OptionsSelectType = {
  label: string;
  value: string;
};

type CustomMultiSelectPropsType = {
  error?: string;
  options: OptionsSelectType[];
  title?: string;
  classNameContainer?: string;
  id?: string;
  label?: string;
  placeholder?: string;
};

export const CustomMultiSelect = React.forwardRef(
  (
    props: MultiSelectUnstyledProps<string> & CustomMultiSelectPropsType,
    ref: React.ForwardedRef<any>,
  ) => {
    const components: MultiSelectUnstyledProps<string>['components'] = {
      Root: StyledButton,
      Listbox: StyledListbox,
      Popper: StyledPopper,
      ...props.components,
    };
    const { options, error, title, classNameContainer, value, label, id = 'selectMultiId' } = props;

    return (
      <>
        <div className={cn(style.container, classNameContainer)}>
          {title && (
            <div className={style.title}>
              <p>{title}</p>
            </div>
          )}
          <div className={cn(style.content, title ? style.title : '')}>
            <FormControl fullWidth id={id} size="small" error={!!error}>
              <InputLabel className={style.label}>{!value && label}</InputLabel>
              <MultiSelectUnstyled {...props} ref={ref} components={components}>
                {options.map(({ value: valueOption, label: labelOption }) => (
                  <StyledOption key={valueOption} value={valueOption}>
                    {labelOption}
                  </StyledOption>
                ))}
              </MultiSelectUnstyled>
            </FormControl>
          </div>
        </div>
        <div className={cn(style.container, classNameContainer)}>
          {title && <div className={style.title} />}
          <div className={cn(style.content, title ? style.title : '')}>
            <FormHelperText error>{error}</FormHelperText>
          </div>
        </div>
      </>
    );
  },
);
