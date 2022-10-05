import { ChangeEvent, ComponentType, FC } from 'react';

import cn from 'classnames';
import NumberFormat from 'react-number-format';
import { SingleValue } from 'react-select';

import styles from './InformationItem.module.scss';

import InputFile from 'components/input-file/InputFile';
import CustomSelect from 'components/select/CustomSelect';
import TextFieldCalendar from 'components/text-field-calendar/TextFieldCalendar';
import TextField from 'components/text-field/TextField';

type VariantType = 'select' | 'input' | 'calendar' | 'file' | 'phone' | 'inn' | 'numberInput';

type SizeType = 'large' | 'normal';

export interface Option {
  value: any;
  label: string;
}

interface Props {
  title?: string;
  variant: VariantType;
  option?: Option[];
  size?: SizeType;
  placeholder?: string;
  dataAuto?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
  onChangeSelect?: (value: Option) => void;
  onChangeEvent?: (value: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  type?: string;
  value?: string;
  selectValue?: Option;
  minLength?: number;
  maxLength?: number;
}

const InformationItem: FC<Props> = props => {
  const {
    title,
    variant,
    option = [],
    size = 'normal',
    placeholder = '',
    dataAuto = '',
    onChange,
    onChangeEvent,
    onChangeSelect,
    id,
    type,
    className,
    inputClassName,
    value,
    selectValue,
    maxLength,
    minLength,
  } = props;

  let part;
  switch (variant) {
    case 'calendar':
      // part = <TextFieldCalendar dataAuto={dataAuto} value={value} onChange={onChange} />;
      break;
    case 'select':
      part = (
        <CustomSelect
          defaultValue={selectValue}
          options={option}
          placeholder={placeholder}
          onChange={onChangeSelect}
        />
      );
      break;
    case 'file':
      part = <InputFile />;
      break;
    case 'phone':
      part = (
        <NumberFormat
          className={styles.numberFormat}
          // customInput={<TextField /> as unknown as ComponentType<unknown>}
          format="+7 (###) ###-####"
          mask="_"
          id={id}
          onChange={onChangeEvent}
          placeholder={placeholder}
        />
      );
      break;
    case 'numberInput':
      part = (
        <TextField
          value={value || ''}
          className={styles.numberFormat}
          id={id}
          onChange={e => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          type="number"
        />
      );
      break;
    case 'inn':
      part = (
        <NumberFormat
          className={styles.numberFormat}
          format="############"
          mask="_"
          id={id}
          placeholder={placeholder}
        />
      );
      break;
    case 'input':
    default:
      part = (
        <TextField
          onChange={e => onChange && onChange(e.target.value)}
          id={id}
          placeholder={placeholder}
          type={type}
          value={value || ''}
        />
      );
  }

  return (
    <div className={cn(styles.wrapBlockItem, className)}>
      {title && <p>{title}</p>}
      <div className={cn(styles.content, size === 'large' && styles.large, inputClassName)}>
        {part}
      </div>
    </div>
  );
};

InformationItem.defaultProps = {
  title: '',
  option: [],
  size: 'normal',
  placeholder: '',
  dataAuto: '',
  className: '',
  inputClassName: '',
  onChange: () => {},
  onChangeEvent: undefined,
  onChangeSelect: undefined,
  id: '',
  type: '',
  value: '',
};

export default InformationItem;
