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
    defaultValues: { phone: '79101001010', password: '123123' },
  });

  const onSubmit = handleSubmit(loginData => {
    loginWithPassword(loginData);
  });

  return (
    <div className={style.modal}>
      <div className={style.content}>
        <div className={style.wrapContent}>
          <p className={style.modalTitle}>Авторизация</p>
          <form>
            <div className={style.body}>
              <div>
                <p className={style.modalSubtitle}>Ваш номер телефона</p>
                <input {...register('phone')} />
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
        </div>
      </div>
    </div>
  );
};
