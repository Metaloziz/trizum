import {
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { GroupLevels } from 'app/enums/GroupLevels';
import { StatusEnum } from 'app/enums/StatusTypes';
import gamesStore from 'app/stores/gamesStore';
import { EditOrCreatePresetParamsT, SoundT } from 'app/types/GameTypes';
import Button from 'components/button/Button';
import { DialogTitle } from 'components/franchising-page/ui/Dialog';
import {
  ColorObj,
  GameColorPicker,
} from 'components/game-page/GameCommon/GameModal/GameColorPicker';
import { ArgusSettings } from 'components/game-page/GameCommon/GameSettings/ArgusSettings';
import { BattlerColorsSettings } from 'components/game-page/GameCommon/GameSettings/BattlerColorsSettings';
import { FirefliesSettings } from 'components/game-page/GameCommon/GameSettings/FirefliesSettings';
import { Game2048Settings } from 'components/game-page/GameCommon/GameSettings/Game2048Settings';
import { MemoryRhythmSettings } from 'components/game-page/GameCommon/GameSettings/MemoryRhythmSettings';
import { MentalSettings } from 'components/game-page/GameCommon/GameSettings/MentalSettings';
import { ShiftVerticalSettings } from 'components/game-page/GameCommon/GameSettings/ShiftVerticalSettings';
import { ShulteSettings } from 'components/game-page/GameCommon/GameSettings/ShulteSettings';
import { SilhouettesSettings } from 'components/game-page/GameCommon/GameSettings/SilhouettesSettings';
import { SteamEngine } from 'components/game-page/GameCommon/GameSettings/SteamEngine';
import { Dialog } from 'components/rate/ui/Dialog';
import { GameIdentifiers } from 'games';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { fieldSizeOptions } from 'utils/fieldSize';
import { getOptionMui } from 'utils/getOption';
import styles from './gameModal.module.scss';
import { getSizeArea } from 'utils/gameUtils/getSizeArea';
import { filterGameStatus } from 'utils/gameStatusFilter';
import { GameDifferenceSettings } from '../GameSettings/GameDifferenceSettings';

type PropsT = {
  open: boolean;
  onClose: (value: boolean) => void;
  deletePreset: (id: string) => void;
};
const defaultInputTextReader = 'И нет сомнений, что некоторые особенности внутренней политики...';

const colorsObj = [
  { label: 'Зелёный', value: false, hex: '#076d4d', id: 0 },
  { label: 'Чёрный', value: true, hex: '#000000', id: 1 },
  { label: 'Красный', value: false, hex: '#e30d00', id: 2 },
  { label: 'Синий', value: false, hex: '#699deb', id: 3 },
  { label: 'Фиолетовый', value: false, hex: '#c3b8f9', id: 4 },
  { label: 'Оранжевый', value: false, hex: '#f88e36', id: 5 },
  { label: 'Розовый', value: false, hex: '#e99aff', id: 6 },
  { label: 'Коричневый', value: false, hex: '#441d00', id: 7 },
  { label: 'Жёлтый', value: false, hex: '#fff900', id: 8 },
  { label: 'Голубой', value: false, hex: '#00c1ee', id: 9 },
];

export const GameModal: FC<PropsT> = observer(props => {
  const { open, onClose, deletePreset } = props;
  const { createPresets, gamePreset, editPreset, game } = gamesStore;
  const gamePresetName = gamePreset?.gamePreset?.name;
  const settings = gamePreset?.gamePreset?.settings[0];

  const [colorModal, setColorModal] = useState<boolean>(false);
  const [template, setTemplate] = useState<string>(gamePresetName || '');
  const [timeComplete, setTimeComplete] = useState<string>(
    settings?.timeComplete?.toString() || '10',
  );
  const [delay, setDelay] = useState<string>(settings?.delay?.toString() || '1');
  const [level, setLevel] = useState<string>(gamePreset?.gamePreset?.level);
  const [levelMaxCompleted, setLevelMaxCompleted] = useState<string>(
    settings?.levelMaxCompleted?.toString() || '0',
  );
  const [colorsMap, setColorsMap] = useState<string[]>(settings?.colorsMap || ['black']);
  const [wordsCount, setWordsCount] = useState<string>(settings?.wordsCount?.toString() || '1');
  const [digitMax, setDigitMax] = useState<string>(settings?.digitMax?.toString() || '1');
  const [digitMin, setDigitMin] = useState<string>(settings?.digitMin?.toString() || '1');
  const [errorAcceptable, setErrorAcceptable] = useState<string>(
    settings?.errorAacceptable?.toString() || '1',
  );
  const [speed, setSpeed] = useState<string>(settings?.speed?.toString() || '1');
  const [blinksCount, setBlinksCount] = useState<string>(settings?.blinksCount?.toString() || '1');
  const [cycleTime, setCycleTime] = useState<string>(settings?.cycleTime?.toString() || '1');
  const [groupsCount, setGroupsCount] = useState<string>(settings?.groupsCount?.toString() || '1');
  const [elementsTotal, setElementsTotal] = useState<string>(
    settings?.elementsTotal?.toString() || '1',
  );
  const [status, setStatus] = useState<string>(gamePreset.gamePreset.status || 'draft');
  const [description, setDescription] = useState<string>(defaultInputTextReader);
  const [colors, setColors] = useState<ColorObj[]>(colorsObj);
  const [sound, setSound] = useState<boolean>(settings?.sound === 1);
  const [area, setArea] = useState<number | string>(settings?.area ? 1 : 0);

  const levelKeys = Object.keys(GroupLevels);
  const levelOptions = Object.values(GroupLevels).map((el, index) =>
    getOptionMui(levelKeys[index], el),
  );
  const statusTypesKeys = Object.keys(StatusEnum);
  const statusTypesOptions = Object.values(StatusEnum).map((el, index) =>
    getOptionMui(statusTypesKeys[index], el),
  );

  const sizeOptions = fieldSizeOptions().map(el => getOptionMui(el.value, el.label));
  const changeColor = (index: number) => {
    setColors(
      colors.map(el =>
        el.id === index
          ? {
              ...el,
              value: !el.value,
            }
          : el,
      ),
    );
  };

  const setColor = useCallback((data: ColorObj[]) => {
    const colorArr = [''];
    data.filter(el => el.value && colorArr.push(el.hex));
    colorArr.shift();
    setColorsMap(colorArr);
  }, []);

  const rerenderPreset = () => {
    setTemplate(gamePresetName);
    setStatus(gamePreset.gamePreset.status || 'draft');
    setTimeComplete(settings?.timeComplete?.toString() || '60');
    setElementsTotal(settings?.elementsTotal?.toString() || '');
    setDelay(settings?.delay?.toString() || '');
    setLevel(gamePreset?.gamePreset?.level);
    setColorsMap(settings?.colorsMap || ['']);
    setGroupsCount(settings?.groupsCount?.toString() || '');
    setCycleTime(settings?.cycleTime?.toString() || '');
    setWordsCount(settings?.wordsCount?.toString() || '');
    setDigitMax(settings?.digitMax?.toString() || '');
    setDigitMin(settings?.digitMin?.toString() || '');
    setErrorAcceptable(settings?.errorAacceptable?.toString() || '');
    setSpeed(settings?.speed?.toString() || '');
    setBlinksCount(settings?.blinksCount?.toString() || '');
    setDescription(settings?.description || '');
    setSound(settings?.sound === 1);
    setArea(settings?.area ? 1 : 0);
  };

  const addOrEditPreset = () => {
    const params = {
      gameCode: game.code,
      name: template,
      level,
      status,
      settings: [
        {
          timeComplete: Number(timeComplete),
          timeMax: 3600,
          elementsTotal: Number(elementsTotal),
          wordsCount: Number(wordsCount),
          digitMin: Number(digitMin),
          digitMax: Number(digitMax),
          errorAcceptable: Number(errorAcceptable),
          speed: Number(speed),
          blinksCount: Number(blinksCount),
          cycleTime: Number(cycleTime),
          delay: Number(delay),
          groupsCount: Number(groupsCount),
          sound: ((sound && 1) || 0) as SoundT,
          description,
          colorsMap,
          area: area === 0,
        },
      ],
    } as EditOrCreatePresetParamsT;
    gamePreset?.gamePreset?.id ? editPreset(params) : createPresets(params);
  };

  const savePreset = async () => {
    addOrEditPreset();
    await gamesStore.getPresets();
    if (gamesStore.gamePreset.gamePreset.name) {
      await gamesStore.getPreset(gamesStore.gamePreset.gamePreset.name);
    }
    onClose(false);
  };

  const closeModal = () => {
    setTemplate('');
    setTimeComplete('');
    setElementsTotal('');
    setDelay('');
    setLevel('');
    setColorsMap(['black']);
    setGroupsCount('');
    setCycleTime('');
    setWordsCount('');
    setDigitMax('');
    setErrorAcceptable('');
    setSpeed('');
    setBlinksCount('');
    setDescription('');
    setSound(false);
    onClose(false);
    setArea(0);
  };

  const deletedPreset = () => {
    if (gamePreset.gamePreset.id) {
      deletePreset(gamePreset.gamePreset.id);
      onClose(false);
    }
  };

  useEffect(() => {
    rerenderPreset();
  }, [gamePreset, onClose]);
  const gameStatusOption = filterGameStatus(gamePreset?.gamePreset?.id, status, statusTypesOptions);

  return (
    <Dialog maxWidth="xl" fullWidth onClose={closeModal} open={open}>
      {colorModal && (
        <GameColorPicker
          colors={colors}
          changeColor={changeColor}
          setColor={setColor}
          onClose={() => setColorModal(false)}
        />
      )}
      <DialogTitle onClose={closeModal}>Настройка параметров</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <div className={styles.gameModalWrapper}>
            <div className={styles.gameModalWrapper_settings}>
              <Grid xs={12} direction="row" container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label=" Наименование шаблона"
                    value={template}
                    onChange={({ currentTarget: { value } }) => setTemplate(value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Уровень</InputLabel>
                    <Select
                      value={level}
                      label="Уровень"
                      onChange={({ target: { value } }) => setLevel(value)}
                    >
                      {levelOptions}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Статус</InputLabel>
                    <Select
                      value={status}
                      label="Статус"
                      onChange={({ target: { value } }) => setStatus(value)}
                    >
                      {gameStatusOption}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={`Время выполнения ${timeComplete} сек.`}
                    value={timeComplete}
                    onChange={({ currentTarget: { value } }) => setTimeComplete(value)}
                    fullWidth
                    inputProps={{ type: 'number' }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              {game.code === GameIdentifiers.shiftVertical && (
                <ShiftVerticalSettings
                  setGroupsCount={setGroupsCount}
                  setBlinksCount={setBlinksCount}
                  setElementsTotal={setElementsTotal}
                  elementsTotal={elementsTotal}
                  groupsCount={groupsCount}
                  blinksCount={blinksCount}
                  colorsOptions={sizeOptions.slice(0, 2)}
                  sizeOptions={sizeOptions}
                  cycleTime={cycleTime}
                  setCycleTime={setCycleTime}
                />
              )}
              {game.code === GameIdentifiers.shulte && (
                <ShulteSettings
                  sizeOptions={sizeOptions}
                  groupsCount={groupsCount}
                  elementsTotal={elementsTotal}
                  digitMax={digitMax}
                  digitMin={digitMin}
                  setDigitMax={setDigitMax}
                  setDigitMin={setDigitMin}
                  colorsMap={colorsMap}
                  setColorModal={setColorModal}
                  setElementsTotal={setElementsTotal}
                  setGroupsCount={setGroupsCount}
                />
              )}
              {game.code === GameIdentifiers.game2048 && (
                <Game2048Settings
                  sizeOptions={sizeOptions}
                  digitMax={digitMax}
                  setDigitMax={setDigitMax}
                  groupsCount={groupsCount}
                  elementsTotal={elementsTotal}
                  setElementsTotal={setElementsTotal}
                  setGroupsCount={setGroupsCount}
                  templateCode={gamePreset.gamePreset.id}
                  gameCode={game.code}
                />
              )}
              {game.code === GameIdentifiers.battleColors && (
                <BattlerColorsSettings
                  setElementsTotal={setElementsTotal}
                  elementsTotal={elementsTotal}
                  setBlinksCount={setBlinksCount}
                  blinksCount={blinksCount}
                />
              )}
              {game.code === GameIdentifiers.mental && (
                <MentalSettings
                  delay={delay}
                  setDelay={setDelay}
                  setDigitMax={setDigitMax}
                  digitMax={digitMax}
                />
              )}
              {game.code === GameIdentifiers.steamEngine && (
                <SteamEngine
                  elementsTotal={elementsTotal}
                  setElementsTotal={setElementsTotal}
                  setGroupsCount={setGroupsCount}
                  groupsCount={groupsCount}
                  errorAcceptable={errorAcceptable}
                  setErrorAcceptable={setErrorAcceptable}
                  speed={speed}
                  setSpeed={setSpeed}
                  sizeOptions={sizeOptions.slice(0, 8)}
                  area={area}
                  setArea={setArea}
                  sizeArea={getSizeArea}
                />
              )}

              {game.code === GameIdentifiers.silhouettes && (
                <SilhouettesSettings
                  setElementsTotal={setElementsTotal}
                  elementsTotal={elementsTotal}
                  digitMax={digitMax}
                  setDigitMax={setDigitMax}
                  sizeOptions={sizeOptions.slice(0, 4)}
                />
              )}

              {game.code === GameIdentifiers.memoryRhythm && (
                <MemoryRhythmSettings
                  blinksCount={blinksCount}
                  setBlinksCount={setBlinksCount}
                  levelMaxCompleted={levelMaxCompleted}
                  setLevelMaxCompleted={setLevelMaxCompleted}
                  digitMax={digitMax}
                  setDigitMax={setDigitMax}
                  sound={sound}
                  setSound={setSound}
                />
              )}
              {game.code === GameIdentifiers.fireflies && (
                <FirefliesSettings
                  elementsTotal={elementsTotal}
                  setElementsTotal={setElementsTotal}
                  digitMax={digitMax}
                  setDigitMax={setDigitMax}
                  levelMaxCompleted={levelMaxCompleted}
                  setLevelMaxCompleted={setLevelMaxCompleted}
                  speed={speed}
                  setSpeed={setSpeed}
                />
              )}
              {game.code === GameIdentifiers.argus && (
                <ArgusSettings
                  speed={speed}
                  setSpeed={setSpeed}
                  elementsTotal={elementsTotal}
                  setElementsTotal={setElementsTotal}
                  setErrorAcceptable={setErrorAcceptable}
                  errorAcceptable={errorAcceptable}
                  digitMax={digitMax}
                  setDigitMax={setDigitMax}
                  delayOptions={fieldSizeOptions().map(el =>
                    getOptionMui(el.value + '000', el.label + '000'),
                  )}
                />
              )}
              {game.code === GameIdentifiers.difference && (
                <GameDifferenceSettings
                  speed={speed}
                  setSpeed={setSpeed}
                  elementsTotal={elementsTotal}
                  setElementsTotal={setElementsTotal}
                  setErrorAcceptable={setErrorAcceptable}
                  errorAcceptable={errorAcceptable}
                  digitMax={digitMax}
                  setDigitMax={setDigitMax}
                  delayOptions={fieldSizeOptions().map(el =>
                    getOptionMui(el.value + '000', el.label + '000'),
                  )}
                />
              )}
            </div>
            <div className={styles.descriptionBlock}>
              <span className={styles.descriptionBlock_header}>{game.name}</span>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Описание"
                  value={description}
                  onChange={({ currentTarget: { value } }) => setDescription(value)}
                  fullWidth
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              {/* <TextEditor */}
              {/*  onChange={date => { */}
              {/*    let allText = ''; */}
              {/*    date?.blocks?.forEach((item: any) => { */}
              {/*      allText += item.text; */}
              {/*    }); */}
              {/*    setDescription(allText); */}
              {/*  }} */}
              {/*  defaultText={description} */}
              {/* /> */}
            </div>
          </div>
        </Stack>
        <div className={styles.btnBlock}>
          <div className={styles.btnBlock_btn}>
            {gamePreset?.gamePreset?.status === 'archive' && (
              <span>Не возможно удалить архивные настройки</span>
            )}
            {!!gamePreset?.usedInWorks?.length && (
              <span>Настройки используются в домашнем задании</span>
            )}
            <Button
              onClick={deletedPreset}
              variant="reset"
              disabled={
                gamePreset?.gamePreset?.status === 'archive' || !!gamePreset?.usedInWorks?.length
              }
            >
              Удалить настройки
            </Button>
          </div>
          <div className={styles.btnBlock_btn}>
            {/* {gamePreset?.gamePreset?.status === 'active' && ( */}
            {/*  <span>Нельзя изменять активные настройки</span> */}
            {/* )} */}
            <Button
              disabled={
                // gamePreset?.gamePreset?.status === 'active' ||
                template?.length < 1
              }
              onClick={savePreset}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
