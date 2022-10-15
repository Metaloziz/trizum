import { useState, useEffect } from 'react';

import { Grid, TextField, Typography } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { observer } from 'mobx-react-lite';

import styles from './UserPage.module.scss';

import authService from 'app/services/authService';
import appStore, { EmptyUser } from 'app/stores/appStore';
import gag from 'assets/svgs/user.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import Setting from 'components/setting/Setting';
import { BASE_URL } from 'constants/constants';

const { REACT_APP_MODE: mode } = process.env;

const UserPage = observer(() => {
  const { user, setUser } = appStore;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(user.phone);
  const [email, setEmail] = useState(user.email);
  const [code, setCode] = useState<string>('');
  const [erorr, setErorr] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(150);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 150, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);
  const sec = Math.round(seconds / 10);

  const sendPassword = async () => {
    setShowModal(true);
    // setSeconds(140);
    // setTimerActive(!timerActive);
    const getSMSCode = await authService.sms({ phone: user.phone });
    // console.log('код по смс', getSMSCode);
  };

  // const sendEdit = async () => {
  //   try {
  //     const repl = phone.replaceAll(/\D/g, '');
  //     await authService.editSelf({ phone: repl, smsCode: Number(code), email });
  //     setShowModal(false);
  //     setUser();
  //   } catch (e) {
  //     console.warn(e);
  //     setErorr(true);
  //   }
  // };

  const sendEdit = async () => {
    try {
      const repl = phone.replaceAll(/\D/g, '');
      await authService.editSelf({ phone: repl, email });
      setUser();
    } catch (e) {
      console.warn(e);
      setErorr(true);
    }
  };
  const repeatSMSCode = async () => {
    setSeconds(150);
    setTimerActive(!timerActive);
    const getSMSCode = await authService.sms({ phone });
    console.log('повторный код по смс', getSMSCode);
  };

  const closeWindow = () => {
    setShowModal(false);
    setTimerActive(false);
    setErorr(false);
  };

  function filterWords(
    number: number,
    one: string | number,
    two: string | number,
    five: string | number,
  ) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }
  const userKeys = Object.keys(user);
  const userValues = Object.values(user);
  console.log(userKeys);
  console.log(userValues);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.wrapperUser}>
          <div className={styles.userPic}>
            {user?.avatar !== null ? (
              <Image
                className={styles.avatarImage}
                src={`${BASE_URL}${user?.avatar?.path}`}
                width="320"
                height="320"
                alt="user"
              />
            ) : (
              <Image src={gag} width="126" height="126" alt="user" />
            )}
          </div>
          <div className={styles.userSetting}>
            <Setting />
          </div>
        </div>
      </div>
      <div className={styles.userData}>
        <h2>{`${user.firstName} ${user.middleName} ${user.lastName}`}</h2>
        <div className={styles.labelBlock}>
          <label>Телефон:</label>
          <MuiPhoneNumber
            value={phone}
            onChange={value => setPhone(value as string)}
            defaultCountry="ru"
            onlyCountries={['ru']}
            variant="outlined"
            fullWidth
            size="small"
            countryCodeEditable={false}
            className={styles.input}
          />
        </div>
        <div className={styles.labelBlock}>
          <label>Почта:</label>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            className={styles.input}
          />
        </div>
        <div className={styles.buttonWrapper}>
          {/* <Button onClick={sendPassword}>Сохранить</Button> */}
          <Button onClick={sendEdit}>Сохранить</Button>
        </div>
        {mode === 'development' && (
          <Grid container width="100%">
            {/*
  id;
  firstName;
  middleName: null | string;
  lastName;
  email;
  phone;
  role;
  franchise: FranchiseT = {} as FranchiseT;
  city: null | string;
  birthdate: TimeZoneType;
  sex: null | string;
  status;
  avatar: AvatarT;
  groups: GroupsDataT[];
  canSwitchTo: canSwitchToT[];
  active = false;
  parent: ResponseLoadMeParentT = {} as ResponseLoadMeParentT;
  password: string;
  personalRecord: PersonalRecordT;
            */}
            {userKeys.map((el, index) => (
              <Grid container justifyContent="space-between" key={el}>
                <Grid item xs={2}>
                  <Typography fontWeight={700}>{el}</Typography>
                </Grid>
                <Grid item>{JSON.stringify(userValues[index], null, 2)}</Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      {/*  {showModal ? (
        <div className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.btnClose} onClick={closeWindow}>
              <Image src={buttonClose} width="14" height="14" alt="Х" />
            </div>
            <div className={styles.wrapContent}>
              <div>
                <p>Ваш телефон</p>
                <div className={styles.phoneContainer}>
                  <span>+{phone}</span>
                </div>
                <p>Временный код</p>
              </div>
              <div className={styles.inputContainer}>
                <input type="tel" value={code} onChange={e => setCode(e.target.value)} />
              </div>
              {erorr ? (
                <p className={styles.textErorrRed}>
                  Неверный код
                  <br />
                  После трёх неверных попыток - блокировка.
                </p>
              ) : (
                <div className={styles.blockErorr} />
              )}
              <div>
                <Button onClick={sendEdit}>Отправить</Button>
                <div>
                  {seconds !== 150 && seconds !== 0 ? (
                    <p className={styles.textErorr}>
                      Сообщение отправлено. Повторно вы сможете запросить код через {`${sec} `}
                      {filterWords(sec, 'секунду', 'секунды', 'секунд')}.
                    </p>
                  ) : (
                    <p onClick={repeatSMSCode} className={styles.underlined}>
                      Выслать код повторно
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
       ) : null}

       {showModal ? (
        <div className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.btnClose} onClick={closeWindow}>
              <Image src={buttonClose} width="14" height="14" alt="Х" />
            </div>
            <div className={styles.wrapContent}>
              <div>
                <p>Введите ваш пароль</p>
              </div>
              <div className={styles.inputContainer}>
                <input type="password" value={code} onChange={e => setCode(e.target.value)} />
              </div>
              {erorr ? (
                <p className={styles.textErrorRed}>
                  Неверный пароль
                  <br />
                  После трёх неверных попыток - блокировка.
                </p>
              ) : (
                <div className={styles.blockError} />
              )}
              <div>
                <Button onClick={sendEdit}>Изменить</Button>
              </div>
            </div>
          </div>
        </div>
       ) : null} */}
    </div>
  );
});

export default UserPage;
