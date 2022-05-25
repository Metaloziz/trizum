import Image from 'next/image';
import { FC, useState } from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';
import closeCalendar from '@svgs/button.svg';
import styles from './TextFieldCalendar.module.scss';

interface Props {
  dataAuto: string;
}

const TextFieldCalendar: FC<Props> = ({ dataAuto }) => {
  const [title, setTitle] = useState<string>('');
  const deleteTitle = () => {
    setTitle('');
  };
  return (
    <div className={styles.textFieldCalendar}>
      <div className={styles.inputCalendar}>
        <input
          type={'text'}
          value={title}
          onChange={() => {
            console.log('change');
          }}
        />
        <div className={styles.closeCalendar} onClick={deleteTitle}>
          <Image src={closeCalendar} alt={'close'} width={12} height={12} />
        </div>
      </div>
      <div>
        <CustomCalendar setTitle={setTitle} dataAuto={dataAuto} />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
