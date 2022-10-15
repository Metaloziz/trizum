import {
  Checkbox,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupStatus } from 'app/enums/GroupStatus';
import { AddStatusEnum, EditStatusEnum, StatusEnum } from 'app/enums/StatusTypes';
import gamesStore from 'app/stores/gamesStore';
import Button from 'components/button/Button';
import { DialogTitle } from 'components/franchising-page/ui/Dialog';
import {
  ColorObj,
  GameColorPicker,
} from 'components/game-page/GameCommon/GameModal/GameColorPicker';
import { Dialog } from 'components/rate/ui/Dialog';
import { GameIdentifiers } from 'games';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { getOptionMui } from 'utils/getOption';
import styles from './gameModal.module.scss';

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
];

export const GameModal: FC<PropsT> = observer(props => {
  const { open, onClose, deletePreset } = props;
  const { createPresets, gamePreset, editPreset, game } = gamesStore;
  const settings = gamePreset?.gamePreset?.settings[0];
  const gamePresetName = gamePreset?.gamePreset?.name;

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
  const [errorAcceptable, setErrorAcceptable] = useState<string>(
    settings?.errorAcceptable?.toString() || '1',
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
  // const [currentRadio, setCurrentRadio] = useState<string>('eachLevel');
  const [colors, setColors] = useState<ColorObj[]>(colorsObj);
  const [sound, setSound] = useState(false);
  const levelKeys = Object.keys(GroupLevels);
  const levelOptions = Object.values(GroupLevels).map((el, index) =>
    getOptionMui(levelKeys[index], el),
  );
  const statusTypesKeys = Object.keys(StatusEnum);
  const statusTypesOptions = Object.values(StatusEnum).map((el, index) =>
    getOptionMui(statusTypesKeys[index], el),
  );
  const changeColor = (index: number) => {
    const copy: ColorObj[] = colors.map(el =>
      el.id === index
        ? {
            ...el,
            value: !el.value,
          }
        : el,
    );
    setColors(copy);
  };

  const setColor = useCallback((data: ColorObj[]) => {
    const colorArr = [''];
    data.filter(el => el.value && colorArr.push(el.hex));
    colorArr.shift();
    setColorsMap(colorArr);
  }, []);

  const rerenderPreset = () => {
    setTemplate(gamePresetName);
    setTimeComplete(settings?.timeComplete?.toString() || '');
    setElementsTotal(settings?.elementsTotal?.toString() || '');
    setDelay(settings?.delay?.toString() || '');
    setLevel(gamePreset?.gamePreset?.level);
    setColorsMap(settings?.colorsMap || ['']);
    setGroupsCount(settings?.groupsCount?.toString() || '');
    setCycleTime(settings?.cycleTime?.toString() || '');
    setWordsCount(settings?.wordsCount?.toString() || '');
    setDigitMax(settings?.digitMax?.toString() || '');
    setErrorAcceptable(settings?.errorAcceptable?.toString() || '');
    setSpeed(settings?.speed?.toString() || '');
    setBlinksCount(settings?.blinksCount?.toString() || '');
    setDescription(settings?.description || '');
    setSound(settings?.sound || false);
  };

  useEffect(() => {
    rerenderPreset();
  }, [gamePreset]);

  const addOrEditPreset = () => {
    const params = {
      gameCode: game.code,
      name: template,
      level,
      status,
      settings: [
        {
          timeComplete: Number(timeComplete),
          elementsTotal: Number(elementsTotal),
          wordsCount: Number(wordsCount),
          digitMax: Number(digitMax),
          errorAcceptable: Number(errorAcceptable),
          speed: Number(speed),
          blinksCount: Number(blinksCount),
          cycleTime: Number(cycleTime),
          delay: Number(delay),
          groupsCount: Number(groupsCount),
          sound,
          description,
          colorsMap,
        },
      ],
    };
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
  };

  const deletedPreset = () => {
    if (gamePreset.gamePreset.id) {
      deletePreset(gamePreset.gamePreset.id);
      onClose(false);
    }
  };

  const isTimeComplete =
    game.code !== GameIdentifiers.shulte &&
    game.code !== GameIdentifiers.game2048 &&
    game.code !== GameIdentifiers.mental &&
    game.code !== GameIdentifiers.memoryRhythm;

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
                      {statusTypesOptions}
                    </Select>
                  </FormControl>
                </Grid>
                {isTimeComplete && (
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
                )}
              </Grid>
              {game.code === GameIdentifiers.shiftVertical ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={`Задержка ${cycleTime} сек.`}
                        value={cycleTime}
                        onChange={({ currentTarget: { value } }) => setCycleTime(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Количество уровней в игре"
                        value={elementsTotal}
                        onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Кол-во цветов"
                        value={groupsCount}
                        onChange={({ currentTarget: { value } }) => setGroupsCount(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Формы"
                        value={blinksCount}
                        onChange={({ currentTarget: { value } }) => setBlinksCount(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </>
              ) : null}
              {game.code === GameIdentifiers.shulte ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Кол-во цветов"
                        value={groupsCount}
                        onChange={({ currentTarget: { value } }) => setGroupsCount(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Размер поля X на Х"
                        value={elementsTotal}
                        onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <div className={styles.inputBlock}>
                      <div className={styles.gameModalColorBtn}>
                        <label>Необходимые цвета</label>
                        <button onClick={() => setColorModal(true)}>Выбор цвета</button>
                      </div>
                      <div style={{ display: 'flex' }}>
                        {colorsMap.map(color => (
                          <div
                            key={color}
                            style={{ backgroundColor: `${color}` }}
                            className={styles.colorTemplate}
                          />
                        ))}
                      </div>
                    </div>
                  </Grid>
                </>
              ) : null}
              {game.code === GameIdentifiers.game2048 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Размер поля X на Х"
                      value={groupsCount}
                      onChange={({ currentTarget: { value } }) => setGroupsCount(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во начальных блоков"
                      value={elementsTotal}
                      onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}
              {game.code === GameIdentifiers.battleColors && (
                <Grid container spacing={2}>
                  {/* </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={`Кол-во уровней в игре ${elementsTotal}`}
                      value={elementsTotal}
                      onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во цветов для игры"
                      value={blinksCount}
                      onChange={({ currentTarget: { value } }) => setBlinksCount(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}
              {game.code === GameIdentifiers.mental && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Пауза при появлении цифр в мс"
                      value={delay}
                      onChange={({ currentTarget: { value } }) => setDelay(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Минимальное слагаемое"
                      // value={min}
                      // onChange={({ currentTarget: { value } }) => setMin(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Максимальное слагаемое"
                      value={digitMax}
                      onChange={({ currentTarget: { value } }) => setDigitMax(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Использовать вычитание"
                      // value={digitMax}
                      // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
                      fullWidth
                      // inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Результат не больше, чем по формуле"
                      // value={subtract}
                      // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
                      fullWidth
                      // inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Результат не больше, чем по формуле"
                      // value={restriction}
                      // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
                      fullWidth
                      // inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во слагаемых в 1 задаче"
                      // value={length}
                      // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во задач"
                      // value={count}
                      // onChange={({ currentTarget: { value } }) => setDigitMax(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}
              {game.code === GameIdentifiers.steamEngine && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во успешных нажатий на манометр"
                      value={elementsTotal}
                      onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во снятых единиц за промах"
                      value={errorAcceptable}
                      onChange={({ currentTarget: { value } }) => setErrorAcceptable(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Скорость кручения стрелки манометра в сек."
                      value={speed}
                      onChange={({ currentTarget: { value } }) => setSpeed(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во манометров"
                      value={groupsCount}
                      onChange={({ currentTarget: { value } }) => setGroupsCount(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}

              {game.code === GameIdentifiers.silhouettes && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во фигур для угадывания"
                      value={elementsTotal}
                      onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}

              {game.code === GameIdentifiers.memoryRhythm && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во миганий"
                      value={elementsTotal}
                      onChange={({ currentTarget: { value } }) => setElementsTotal(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            title="Музыка вкл/откл"
                            checked={sound}
                            onChange={() => setSound(!sound)}
                          />
                        }
                        label="Музыка вкл/откл"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              )}
              {/* </section> */}
              {/* <section> */}
              {/*  <span className={styles.title}>Начисление баллов</span> */}
              {/*  <div className={styles.choiceInput}> */}
              {/*    <InputRadio */}
              {/*      value="eachLevel" */}
              {/*      id="eachLevel" */}
              {/*      name="currentRadioValue" */}
              {/*      label="За каждый пройденный уровень" */}
              {/*      onChange={() => setCurrentRadio('eachLevel')} */}
              {/*      checked={currentRadio === 'eachLevel'} */}
              {/*    /> */}
              {/*    <InputRadio */}
              {/*      value="success" */}
              {/*      id="success" */}
              {/*      name="currentRadioValue" */}
              {/*      onChange={() => setCurrentRadio('success')} */}
              {/*      checked={currentRadio === 'success'} */}
              {/*      label="Баллы за прыжок (начисляется если был прыжок и уровень пройден после прыжка)" */}
              {/*    /> */}
              {/*    <InputRadio */}
              {/*      value="error" */}
              {/*      id="error" */}
              {/*      name="currentRadioValue" */}
              {/*      onChange={() => setCurrentRadio('error')} */}
              {/*      checked={currentRadio === 'error'} */}
              {/*      label="Если ошибка, после прыжка, игру возвращаем на предыдущий уровень (штрафа нет)" */}
              {/*    /> */}
              {/*  </div> */}
              {/*  <div className={styles.conditionBlock}> */}
              {/*    <div> */}
              {/*      Если выполняет <InformationItem variant="numberInput" /> уровня подряд за */}
              {/*      <InformationItem variant="numberInput" /> */}
              {/*    </div> */}
              {/*    <div> */}
              {/*      и <InformationItem variant="numberInput" />% ошибок, то система ПРЕДЛАГАЕТ */}
              {/*      поднять на */}
              {/*    </div> */}
              {/*    <div> */}
              {/*      <InformationItem variant="numberInput" /> */}
              {/*      уровней один раз. */}
              {/*    </div> */}
              {/*  </div> */}
              {/* </section> */}
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
            {gamePreset?.gamePreset?.status === 'active' && (
              <span>Нельзя изменять активные настройки</span>
            )}
            <Button
              disabled={gamePreset?.gamePreset?.status === 'active' || template?.length < 1}
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
