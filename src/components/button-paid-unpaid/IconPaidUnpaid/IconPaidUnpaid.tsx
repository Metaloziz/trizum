import cn from 'classnames';
import { IsPaidIcon } from 'components/button-paid-unpaid/IsPaidIcon/IsPaidIcon';
import { FC } from 'react';

import style from '../ButtonPaidUnpaid.module.scss';

type Props = {
  isPaid: boolean;
};

export const IconPaidUnpaid: FC<Props> = ({ isPaid }) => (
  <div
    className={cn(style.Button, !isPaid && style.closed)}
    style={{ padding: '12px 58px 12px 18px' }}
  >
    <span className={style.icon}>
      <IsPaidIcon isPaid={isPaid} />
    </span>
    {isPaid ? 'Оплачено' : 'Не оплачено'}
  </div>
);
