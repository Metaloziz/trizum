import React, { FC, useEffect } from 'react';
import { AppRoutes } from '../../../app/enums/AppRoutes';
import { Roles } from '../../../app/stores/appStore';
import { OneGamePresent, PresetsGameSettings } from '../../../app/types/GameTypes';
import Button from '../../../components/button/Button';
import { GameDesc } from '../../../components/game-page/GameCommon/GameDesc';
import { PlayButton } from '../../../components/game-page/GameCommon/PlayButton';
import InformationItem from '../../../components/information-item/InformationItem';
import { Option } from '../../../components/select-mui/CustomSelect';
import { RedirectCurrentPageButton } from '../../../components/test-page/RedirectArticlesPageButton/RedirectCurrentPageButton';
import styles from '../Game.module.scss';

type Props = {
  gameViewSize: number;
  role: Roles;
  option: Option[];
  onChangeSelect: (data: any) => void;
  onClick: () => void;
  gamePreset: OneGamePresent;
  onRef: (ref: any) => void;
  onEnd: (result: any) => void;
  settings: PresetsGameSettings;
  started: boolean;
  onStart: () => void;
  gam: { name: string; title: string } | { name: string; prevImg: any; title: string };
  GameComponent: any;
  setIsCurrentGameView: (value: boolean) => void;
};

export const CurrentGame: FC<Props> = ({ GameComponent, ...props }) => {
  useEffect(() => {
    props.setIsCurrentGameView(true);

    // return props.setIsCurrentGameView(false);
  }, []);

  const foo = () => {
    props.setIsCurrentGameView(false);
  };

  return (
    <div className={styles.wrapGameBlock}>
      <RedirectCurrentPageButton
        className={styles.redirectButton}
        title="К списку игр"
        onClick={foo}
        rout={AppRoutes.Games}
      />
      <section>
        <div style={{ minWidth: `${props.gameViewSize + 100}px` }}>
          {(props.role === Roles.Methodist || props.role === Roles.Admin) && (
            <div className={styles.wrapGameBlock_header}>
              <div className={styles.wrapGameBlock_header_select}>
                <InformationItem
                  variant="select"
                  size="normal"
                  placeholder="Шаблон"
                  option={props.option}
                  onChangeSelect={props.onChangeSelect}
                />
              </div>
              <div className={styles.wrapGameBlock_header_select}>
                <InformationItem variant="select" size="normal" placeholder="Год" />
              </div>
              <div className={styles.wrapGameBlock_header_select}>
                <InformationItem variant="select" size="normal" placeholder="Месяц" />
              </div>
              <div className={styles.wrapGameBlock_header_select}>
                <InformationItem variant="select" size="normal" placeholder="Группа" />
              </div>
              <Button onClick={props.onClick}>
                {props.gamePreset?.gamePreset?.id ? 'Изменить настройки' : 'Создать настройки'}
              </Button>
            </div>
          )}
        </div>

        <div className={styles.wrapGame}>
          <div className={styles.wrapGame_overlay}>
            <GameComponent
              onRef={props.onRef}
              width={props.gameViewSize}
              onEnd={props.onEnd}
              {...props.settings}
              colors={props.settings?.colorsMap?.length || 1}
            />
            {!props.started && <PlayButton onStart={props.onStart} />}
          </div>
        </div>
      </section>
      <GameDesc started={props.started} gameTitle={props.gam.title} />
    </div>
  );
};
