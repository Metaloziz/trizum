import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Login.module.scss';
import appStore from 'app/stores/appStore';

export type LoginInfo = {
  phone: string;
  password: string;
};

export const Login: FC = () => {
  const { loginWithPassword } = appStore;

  const schema = yup.object().shape({
    phone: yup.string().required('обязательно поле'),
    password: yup.string().required('обязательно поле'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<LoginInfo>({
    resolver: yupResolver(schema),
    defaultValues: { phone: '+76660003334', password: 'Base76660003334' },
  });

  const { loginError } = appStore;

  const onSubmit = handleSubmit(loginData => {
    loginWithPassword({
      phone: loginData.phone.replace(/\D/g, ''),
      password: loginData.password,
    });
  });

  const maxVal = 12;

  return (
    <div className={style.modal}>
      <div className={style.content}>
        <div className={style.wrapContent}>
          <p className={style.modalTitle}>Авторизация</p>
          <form>
            <div className={style.body}>
              <div>
                <p className={style.modalSubtitle}>Ваш номер телефона</p>
                <input
                  {...register('phone')}
                  onChange={e => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                    if (e.currentTarget.value[0] !== '+') {
                      e.currentTarget.value = '+' + e.currentTarget.value;
                    }
                    if (e.currentTarget.value.length > maxVal) {
                      e.currentTarget.value = e.currentTarget.value.slice(0, 11);
                    }
                    if (e.currentTarget.value[0] === '8') {
                      e.currentTarget.value = e.currentTarget.value.replace('8', '+7');
                    }
                  }}
                />
                <p className={style.textErrorRed}>{errors.phone?.message}</p>
              </div>

              <div>
                <p className={style.modalSubtitle}>Пароль</p>
                <input {...register('password')} type="password" />
                <p className={style.textErrorRed}>{errors.password?.message}</p>
              </div>
              <button type="submit" className={style.modalButton} onClick={onSubmit}>
                Войти
              </button>
            </div>
          </form>
          {loginError && <p className={style.textErrorRed}>Неверный логин или пароль</p>}
        </div>
      </div>
    </div>
  );
};
