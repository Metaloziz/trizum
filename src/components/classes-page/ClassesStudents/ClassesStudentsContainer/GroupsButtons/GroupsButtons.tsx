import Box from '@mui/material/Box';

import Tabs from '@mui/material/Tabs';
import groupStore from 'app/stores/groupStore';
import { ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';
import cn from 'classnames';
import styles from 'components/classes-page/ClassesMainPage.module.scss';
import { FC, SyntheticEvent, useState } from 'react';

type Props = {
  groups: ResponseGroups[];
  selectedGroup: ResponseOneGroup;
  getOneGroup: typeof groupStore.getOneGroup;
};

export const GroupsButtons: FC<Props> = ({ selectedGroup, groups, getOneGroup }) => {
  // не используется, но в Tabs без них ошибка в консоли-----
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //---------------------------------------------------------

  return (
    <div className={styles.tabsWrapper}>
      <Box sx={{ flexGrow: 1, display: 'flex', height: 700 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {!!groups.length &&
            groups.map(group => (
              <div
                key={group.id}
                className={cn(
                  styles.button,
                  selectedGroup?.id === group.id && styles.button_active,
                )}
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
};
