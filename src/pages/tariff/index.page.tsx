import { useState, ChangeEvent } from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import {
  newstatus,
  tariff,
  month,
} from '@components/moks-data/moks-data-tariff';
import TextEditor from '@components/text-editor/TextEditor';
import styles from './Tariff.module.scss';

const IndexPage = () => {
  const [currentRadioValue, setCurrentRadioValue] = useState('twoChildren');
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };

  return (
    <div className={styles.traffic}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div>
            <div className={styles.inputBlock}>
              <input type="text" placeholder={'имя тарифа'} />
            </div>
            <div className={styles.infoBlock}>
              <div>
                <InformationItem
                  title={'Статус'}
                  variant={'select'}
                  option={newstatus}
                />
                <InformationItem
                  title={'Дата начала действия'}
                  variant={'calendar'}
                />
                <InformationItem
                  title={'Дата окончания действия'}
                  variant={'calendar'}
                />
                <InformationItem
                  title={'Тариф после'}
                  variant={'select'}
                  option={tariff}
                />
              </div>
              <div>
                <InformationItem title={'Старая цена'} variant={'input'} />
                <InformationItem title={'Новая цена'} variant={'input'} />
                <InformationItem title={'Код тарифа'} variant={'input'} />
              </div>
            </div>
          </div>
          <div className={styles.editorInfo}>
            <h3>Описание</h3>
            <div className={styles.editorBlock}>
              <div className={styles.editorWrapper}>
                <TextEditor />
              </div>
              <div className={styles.choiceTariff}>
                <div className={styles.inputTariff}>
                  <div>
                    <input
                      type={'radio'}
                      value={'twoChildren'}
                      id={'twoChildren'}
                      name={'currentRadioValue'}
                      onChange={handlerRadioChange}
                      checked={currentRadioValue === 'twoChildren'}
                    />
                  </div>
                  <label htmlFor={'twoChildren'}>
                    Тариф для второго ребёнка
                  </label>
                </div>
                <div className={styles.inputTariff}>
                  <div>
                    <input
                      type={'radio'}
                      value={'registration'}
                      id={'registration'}
                      name={'currentRadioValue'}
                      onChange={handlerRadioChange}
                      checked={currentRadioValue === 'registration'}
                    />
                  </div>
                  <label htmlFor={'registration'}>
                    Тариф для новых клиентов (активируется при регистрации)
                  </label>
                </div>
                <div className={styles.inputTariff}>
                  <div>
                    <input
                      type={'radio'}
                      value={'firstPayment'}
                      id={'firstPayment'}
                      name={'currentRadioValue'}
                      onChange={handlerRadioChange}
                      checked={currentRadioValue === 'firstPayment'}
                    />
                  </div>
                  <label htmlFor={'firstPayment'}>
                    Тариф для новых клиентов (предполагается при первой оплате)
                  </label>
                </div>
                <div className={styles.selectTraffic}>
                  <InformationItem
                    title={'Сколько месяцев действует'}
                    variant={'select'}
                    option={month}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.addTariff}>
          <div>
            <button>+</button>
          </div>
        </div>
      </div>
      <div className={styles.btnTraffic}>
        <CustomButton>Сохранить</CustomButton>
      </div>
    </div>
  );
};

export default IndexPage;