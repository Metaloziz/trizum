import { LinkT } from 'components/sidebar/LinkT';
import { FC } from 'react';

import NavigationLink from 'components/link/NavigationLink';

interface Props {
  links: LinkT[];
  onClick?: () => void;
  linkClassName?: string;
  activeClassName?: string;
  linkWrapperClassName?: string;
  linkImageClassName?: string;
}

const Navigation: FC<Props> = ({
  links,
  onClick,
  linkClassName,
  linkWrapperClassName,
  linkImageClassName,
  activeClassName,
}) => (
  <nav>
    {links.map((link, i: number) => (
      <NavigationLink
        key={i}
        link={link}
        wrapperClassName={linkWrapperClassName}
        imageClassName={linkImageClassName}
        className={linkClassName}
        onClick={onClick}
        activeClassName={activeClassName}
      />
    ))}
  </nav>
);

export default Navigation;
