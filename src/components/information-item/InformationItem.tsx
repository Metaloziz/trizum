import { FC } from 'react';
import InputFile from '@components/input-file/InputFile';
import CustomSelect from '@components/select/CustomSelect';
import TextFieldCalendar from '@components/text-field-calendar/TextFieldCalendar';
import TextField from '@components/text-fild/TextFild';
import styles from './InformationItem.module.scss';

type VariantType = 'select' | 'input' | 'calendar' | 'file';

type SizeType = 'large' | 'normal';

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  variant: VariantType;
  option?: Option[];
  size?: SizeType;
  placeholder?: string;
}

const InformationItem: FC<Props> = ({
  title,
  variant,
  option = [],
  size = 'normal',
  placeholder = '',
}) => {
  const finalStyle = `${styles.content} ${
    size === 'large' ? styles.large : ''
  }`;
  return (
    <div className={styles.wrapBlockItem}>
      <div>
        <p>{title}</p>
      </div>
      <div className={finalStyle}>
        {variant === 'select' && (
          <CustomSelect options={option} placeholder={placeholder} />
        )}
        {variant === 'input' && <TextField />}
        {variant === 'calendar' && <TextFieldCalendar />}
        {variant === 'file' && <InputFile />}
      </div>
    </div>
  );
};

export default InformationItem;
