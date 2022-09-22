import { FC, useState } from 'react';
import { LoginWithPassword } from 'pages/login/loginWithPassword/LoginWithPassword';
import LoginWithSMS from 'pages/login/LoginWithSMS/LoginWithSMS';
import Button from 'components/button/Button';
import style from './Login.module.scss';

export const Login: FC = () => {
  const [value, setValue] = useState<boolean | null>(null);

  if (value === null) {
    return (
      <div className={style.container}>
        <h2>Войти через:</h2>
        <Button size="large" type="submit" onClick={() => setValue(false)}>
          SMS
        </Button>
        <Button size="large" onClick={() => setValue(true)}>
          Пароль
        </Button>
      </div>
    );
  }

  return value ? <LoginWithPassword /> : <LoginWithSMS />;
};
