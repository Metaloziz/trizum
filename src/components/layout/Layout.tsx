import { FC, ReactNode } from 'react';
import DefaultLayout from './default/DefaultLayout';

interface Props {
  children?: ReactNode;
  layout?: FC;
}

const Layout: FC<Props> = ({ children, layout: LayoutComponent }) => (
  <>{LayoutComponent ? <LayoutComponent>{children}</LayoutComponent> : <DefaultLayout>{children}</DefaultLayout>}</>
);

export default Layout;
