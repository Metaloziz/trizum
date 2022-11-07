import paid from 'assets/svgs/noun-payment-approved.svg';
import unpaid from 'assets/svgs/noun-payment-denied.svg';
import Image from 'components/image/Image';
import { FC } from 'react';

type Props = {
  isPaid: boolean;
};

export const IsPaidIcon: FC<Props> = ({ isPaid }) =>
  isPaid ? (
    <Image style={{ marginTop: '7px' }} src={paid} alt="open" width={35} height={35} />
  ) : (
    <Image style={{ marginTop: '7px' }} src={unpaid} alt="lock" width={35} height={35} />
  );
