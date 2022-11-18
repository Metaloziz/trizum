import { Roles } from 'app/enums/Roles';
import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import Balance from 'components/balance/Balance';
import Requisites from 'components/requisites/Requisites';
import Custom404 from 'pages/404.page';
import styles from 'pages/pay/Payment.module.scss';

const Pay = observer(() =>
  appStore.role !== Roles.Student ? (
    <Custom404 />
  ) : (
    <div className={styles.innerContent}>
      <Balance />
      <Requisites />
    </div>
  ),
);

export default Pay;
