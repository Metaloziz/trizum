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
import gamesStore from 'app/stores/gamesStore';
import Button from 'components/button/Button';
import { DialogTitle } from 'components/franchising-page/ui/Dialog';
import {
  ColorObj,
  GameColorPicker,
} from 'components/game-page/GameCommon/GameModal/GameColorPicker';
import InformationItem from 'components/information-item/InformationItem';
import { InputRadio } from 'components/inputRadio/InputRadio';
import { isError } from 'components/methodist-main/utils/IsError';
import { Dialog } from 'components/rate/ui/Dialog';
import TextEditor from 'components/text-editor/TextEditor';
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
  const [colorCount, setColorCount] = useState<string>(settings?.colorCount?.toString() || '1');
  const [forms, setForms] = useState<string>(settings?.forms?.toString() || '1');
  const [colorsMap, setColorsMap] = useState<string[]>(settings?.colorsMap || ['black']);
  const [levelMaxCompleted, setLevelMaxCompleted] = useState<string>(
    settings?.levelMaxCompleted?.toString() || '1',
  );
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
  const [description, setDescription] = useState<string>(defaultInputTextReader);
  // const [currentRadio, setCurrentRadio] = useState<string>('eachLevel');
  const [colors, setColors] = useState<ColorObj[]>(colorsObj);
  const [size, setSize] = useState(settings?.size?.toString() || '1');
  const [startTiles, setStartTiles] = useState(settings?.startTiles?.toString() || '1');
  const [time, setTime] = useState(settings?.time?.toString() || '10');
  const [levels, setLevels] = useState(settings?.levels?.toString() || '1');
  const [colores, setColores] = useState(settings?.colores?.toString() || '1');

  const levelKeys = Object.keys(GroupLevels);
  const levelOptions = Object.values(GroupLevels).map((el, index) =>
    getOptionMui(levelKeys[index], el),
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
    setColorCount(settings?.colorCount?.toString() || '');
    setForms(settings?.forms?.toString() || '');
    setColorsMap(settings?.colorsMap || ['']);
    setGroupsCount(settings?.groupsCount?.toString() || '');
    setCycleTime(settings?.cycleTime?.toString() || '');
    setWordsCount(settings?.wordsCount?.toString() || '');
    setDigitMax(settings?.digitMax?.toString() || '');
    setErrorAcceptable(settings?.errorAcceptable?.toString() || '');
    setSpeed(settings?.speed?.toString() || '');
    setBlinksCount(settings?.blinksCount?.toString() || '');
    setDescription(settings?.description || '');
    setTime(settings?.time?.toString() || settings?.timeComplete?.toString() || '');
    setLevels(settings?.levels?.toString() || '');
    setColores(settings?.colores?.toString() || '');
    setSize(settings?.size?.toString() || '');
    setStartTiles(settings?.startTiles?.toString() || '');
  };

  useEffect(() => {
    rerenderPreset();
  }, [gamePreset]);

  const onCreatePreset = () => {
    createPresets({
      gameCode: game.code,
      name: template,
      level,
      settings: [
        {
          timeComplete: Number(timeComplete),
          elementsTotal: Number(elementsTotal),
          levelMaxCompleted: Number(levelMaxCompleted),
          wordsCount: Number(wordsCount),
          digitMax: Number(digitMax),
          errorAcceptable: Number(errorAcceptable),
          speed: Number(speed),
          blinksCount: Number(blinksCount),
          cycleTime: Number(cycleTime),
          delay: Number(delay),
          colorCount: Number(colorCount),
          forms: Number(forms),
          groupsCount: Number(groupsCount),
          size: Number(size),
          startTiles: Number(startTiles),
          time: Number(time || timeComplete),
          levels: Number(levels),
          colores: Number(colores),
          description,
          colorsMap,
        },
      ],
    });
  };

  const onEditPreset = () => {
    editPreset({
      gameCode: game.code,
      name: template,
      level,
      status: gamePreset.gamePreset.status,
      settings: [
        {
          timeComplete: Number(timeComplete),
          elementsTotal: Number(elementsTotal),
          levelMaxCompleted: Number(levelMaxCompleted),
          wordsCount: Number(wordsCount),
          digitMax: Number(digitMax),
          errorAcceptable: Number(errorAcceptable),
          speed: Number(speed),
          blinksCount: Number(blinksCount),
          cycleTime: Number(cycleTime),
          delay: Number(delay),
          colorCount: Number(colorCount),
          forms: Number(forms),
          groupsCount: Number(groupsCount),
          size: Number(size),
          startTiles: Number(startTiles),
          time: Number((time > '0' && time) || timeComplete),
          levels: Number(levels),
          colores: Number(colores),
          description,
          colorsMap,
        },
      ],
    });
  };

  const savePreset = async () => {
    if (gamePreset.gamePreset.id) {
      onEditPreset();
    } else {
      onCreatePreset();
    }
    await gamesStore.getPresets();
    if (gamesStore.gamePreset.gamePreset.name) {
      await gamesStore.getPreset(gamesStore.gamePreset.gamePreset.name);
    }
    onClose(false);
  };

  const deletedPreset = () => {
    if (gamePreset.gamePreset.id) {
      deletePreset(gamePreset.gamePreset.id);
      onClose(false);
    }
  };

  return (
    <Dialog maxWidth="xl" fullWidth onClose={() => onClose(false)} open={open}>
      {colorModal && (
        <GameColorPicker
          colors={colors}
          changeColor={changeColor}
          setColor={setColor}
          onClose={() => setColorModal(false)}
        />
      )}
      <DialogTitle onClose={() => onClose(false)}>Настройка параметров</DialogTitle>
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
                {game.code !== GameIdentifiers.shulte && (
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
              {game.code === 'shiftVertical' ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={`Задержка ${delay} сек.`}
                        value={delay}
                        onChange={({ currentTarget: { value } }) => setDelay(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}> */}
                    {/*  <TextField */}
                    {/*    label="Уровень" */}
                    {/*    value={level} */}
                    {/*    onChange={({ currentTarget: { value } }) => setLevel(value)} */}
                    {/*    fullWidth */}
                    {/*    inputProps={{ type: 'number' }} */}
                    {/*    variant="outlined" */}
                    {/*    size="small" */}
                    {/*  /> */}
                    {/* </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Кол-во цветов"
                        value={colorCount}
                        onChange={({ currentTarget: { value } }) => setColorCount(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Формы"
                        value={forms}
                        onChange={({ currentTarget: { value } }) => setForms(value)}
                        fullWidth
                        inputProps={{ type: 'number' }}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </>
              ) : null}
              {game.code === 'shulte' ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Кол-во цветов"
                        value={colorCount}
                        onChange={({ currentTarget: { value } }) => setColorCount(value)}
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
              {game.code === 'game2048' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Размер поля X на Х"
                      value={size}
                      onChange={({ currentTarget: { value } }) => setSize(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во начальных блоков"
                      value={startTiles}
                      onChange={({ currentTarget: { value } }) => setStartTiles(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}

              {game.code === 'battleColors' && (
                <Grid container spacing={2}>
                  {/* </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={`Кол-во уровней в игре ${levels}`}
                      value={levels}
                      onChange={({ currentTarget: { value } }) => setLevels(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Кол-во цветов для игры"
                      value={colores}
                      onChange={({ currentTarget: { value } }) => setColores(value)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              )}
              {game.code === 'mental' && (
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
              <span className={styles.descriptionBlock_header}>память и ритм</span>
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
              disabled={gamePreset?.gamePreset?.status === 'active' || template.length < 1}
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
