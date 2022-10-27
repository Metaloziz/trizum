import Box from '@mui/material/Box';

import Tabs from '@mui/material/Tabs';
import groupStore from 'app/stores/groupStore';
import { ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';
import cn from 'classnames';
import styles from 'components/classes-page/ClassesMainPage.module.scss';
import { FC } from 'react';

type Props = {
  groups: ResponseGroups[];
  selectedGroup: ResponseOneGroup;
  getOneGroup: typeof groupStore.getOneGroup;
};

export const GroupsButtons: FC<Props> = ({ selectedGroup, groups, getOneGroup }) => (
  <div className={styles.tabsWrapper}>
    <Box sx={{ flexGrow: 1, display: 'flex', height: 700 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {!!groups.length &&
          groups.map(group => (
            <div
              className={cn(styles.button, selectedGroup?.id === group.id && styles.button_active)}
              key={group.id}
              title={group.name}
              onClick={() => getOneGroup(group.id)}
            >
              <span>{group.name}</span>
            </div>
          ))}
      </Tabs>
    </Box>
  </div>
);
