import gamesStore from 'app/stores/gamesStore';
import Button from 'components/button/Button';
import {
  ColorObj,
  GameColorPicker,
} from 'components/game-page/GameCommon/GameModal/GameColorPicker';
import InformationItem from 'components/information-item/InformationItem';
import { InputRadio } from 'components/inputRadio/InputRadio';
import { Dialog } from 'components/rate/ui/Dialog';
import TextEditor from 'components/text-editor/TextEditor';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './gameModal.module.scss';

type PropsT = {
  open: boolean;
  onClose: (value: boolean) => void;
  deletePreset: (id: string) => void;
};
const defaultInputTextReader =
  'И нет сомнений, что некоторые особенности внутренней политики, превозмогая сложившуюся непростую экономическую ситуацию, ограничены исключительно образом мышления. Вот вам яркий пример современных тенденций - существующая теория позволяет оценить значение системы массового участия!';

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
    settings?.timeComplete?.toString() || '0',
  );
  const [delay, setDelay] = useState<string>(settings?.delay?.toString() || '0');
  const [level, setLevel] = useState<string>(settings?.level?.toString() || '0');
  const [colorCount, setColorCount] = useState<string>(settings?.colorCount?.toString() || '0');
  const [forms, setForms] = useState<string>(settings?.forms?.toString() || '0');
  const [colorsMap, setColorsMap] = useState<string[]>(settings?.colorsMap || ['']);
  // const [sizeX, setSizeX] = useState<string>(settings?.sizeX?.toString() || '0');
  // const [sizeY, setSizeY] = useState<string>(settings?.sizeY?.toString() || '0');
  const [levelMaxCompleted, setLevelMaxCompleted] = useState<string>(
    settings?.levelMaxCompleted?.toString() || '0',
  );
  const [wordsCount, setWordsCount] = useState<string>(settings?.wordsCount?.toString() || '0');
  const [digitMax, setDigitMax] = useState<string>(settings?.digitMax?.toString() || '0');
  const [errorAcceptable, setErrorAcceptable] = useState<string>(
    settings?.errorAcceptable?.toString() || '0',
  );
  const [speed, setSpeed] = useState<string>(settings?.speed?.toString() || '0');
  const [blinksCount, setBlinksCount] = useState<string>(settings?.blinksCount?.toString() || '0');
  const [cycleTime, setCycleTime] = useState<string>(settings?.cycleTime?.toString() || '0');

  const [elementsTotal, setElementsTotal] = useState<string>(
    settings?.elementsTotal?.toString() || '0',
  );
  const [description, setDescription] = useState<string>(defaultInputTextReader);
  const [currentRadio, setCurrentRadio] = useState<string>('eachLevel');
  const [colors, setColors] = useState<ColorObj[]>(colorsObj);

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
    setTimeComplete(settings?.timeComplete?.toString());
    setElementsTotal(settings?.elementsTotal?.toString());
    setDelay(settings?.delay?.toString() || '');
    setLevel(settings?.level?.toString() || '');
    setColorCount(settings?.colorCount?.toString() || '');
    setForms(settings?.forms?.toString() || '');
    // setSizeY(settings?.sizeY?.toString() || '');
    // setSizeX(settings?.sizeX?.toString() || '');
    setColorsMap(settings?.colorsMap || ['']);
  };

  useEffect(() => {
    rerenderPreset();
  }, [gamePreset]);

  const onCreatePreset = () => {
    createPresets({
      gameCode: game.code,
      name: template,
      settings: [
        {
          timeComplete: Number(timeComplete),
          elementsTotal: Number(elementsTotal),
          levelMaxCompleted: Number(levelMaxCompleted),
          gameCode: '',
          wordsCount: Number(wordsCount),
          digitMax: Number(digitMax),
          templateCode: 0,
          errorAcceptable: Number(errorAcceptable),
          speed: Number(speed),
          blinksCount: Number(blinksCount),
          cycleTime: Number(cycleTime),
          delay: Number(delay),
          level: Number(level),
          colorCount: Number(colorCount),
          forms: Number(forms),
          // sizeX: Number(sizeX),
          // sizeY: Number(sizeY),
          colorsMap,
        },
      ],
    });
  };

  const onEditPreset = () => {
    editPreset({
      name: template,
      settings: [
        {
          timeComplete: Number(timeComplete),
          elementsTotal: Number(elementsTotal),
          levelMaxCompleted: Number(levelMaxCompleted),
          gameCode: '',
          wordsCount: Number(wordsCount),
          digitMax: Number(digitMax),
          templateCode: 0,
          errorAcceptable: Number(errorAcceptable),
          speed: Number(speed),
          blinksCount: Number(blinksCount),
          cycleTime: Number(cycleTime),
          delay: Number(delay),
          level: Number(level),
          colorCount: Number(colorCount),
          forms: Number(forms),
          // sizeX: Number(sizeX),
          // sizeY: Number(sizeY),
          colorsMap,
        },
      ],
    });
  };

  const savePreset = () => {
    if (gamePreset.gamePreset.id) {
      onEditPreset();
    } else {
      onCreatePreset();
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
      <div className={styles.gameModalWrapper}>
        <div className={styles.gameModalWrapper_settings}>
          <section>
            <span className={styles.title}>
              Наименование шаблона
              <div className={styles.inputBlock}>
                <InformationItem
                  variant="input"
                  value={template}
                  className={styles.presetNameInput}
                  onChange={setTemplate}
                  placeholder="Шаблон 1"
                />
              </div>
            </span>
            <span className={styles.title}>Настройка уровней</span>
            {/* <div className={styles.inputBlock}> */}
            {/*  <div> */}
            {/*    <InformationItem */}
            {/*      title="Необходимое количество баллов" */}
            {/*      variant="numberInput" */}
            {/*      value={elementsTotal} */}
            {/*      onChange={setElementsTotal} */}
            {/*    /> */}
            {/*  </div> */}
            {/* </div> */}
            <div className={styles.inputBlock}>
              <div>
                <InformationItem
                  title="Время выполнения"
                  variant="numberInput"
                  value={timeComplete}
                  onChange={setTimeComplete}
                />
              </div>
            </div>
            {game.code === 'verticalShift' ? (
              <>
                <div className={styles.inputBlock}>
                  <div>
                    <InformationItem
                      title="Задержка"
                      variant="numberInput"
                      value={delay}
                      onChange={setDelay}
                    />
                  </div>
                </div>
                <div className={styles.inputBlock}>
                  <div>
                    <InformationItem
                      title="Уровень"
                      variant="numberInput"
                      value={level}
                      onChange={setLevel}
                    />
                  </div>
                </div>
                <div className={styles.inputBlock}>
                  <div>
                    <InformationItem
                      title="Кол-во цветов"
                      variant="numberInput"
                      value={colorCount}
                      onChange={setColorCount}
                    />
                  </div>
                </div>
                <div className={styles.inputBlock}>
                  <div>
                    <InformationItem
                      title="Формы"
                      variant="numberInput"
                      value={forms}
                      onChange={setForms}
                    />
                  </div>
                </div>
              </>
            ) : null}
            {game.code === 'shulte' ? (
              <>
                <div className={styles.inputBlock}>
                  <div>
                    <InformationItem
                      title="Кол-во цветов"
                      variant="numberInput"
                      value={colorCount}
                      onChange={setColorCount}
                    />
                  </div>
                </div>
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
                <div className={styles.inputBlock}>
                  {/*  <div> */}
                  {/*    <InformationItem */}
                  {/*      title="Длина по оси X" */}
                  {/*      variant="numberInput" */}
                  {/*      value={sizeX} */}
                  {/*      onChange={setSizeX} */}
                  {/*    /> */}
                  {/*  </div> */}
                  {/* </div> */}

                  <div>
                    <InformationItem
                      title="Размер поля X на Х"
                      variant="numberInput"
                      value={elementsTotal}
                      onChange={setElementsTotal}
                    />
                  </div>
                </div>
                {/* <div className={styles.inputBlock}> */}
                {/*  <InformationItem */}
                {/*    title="Длина по оси Y" */}
                {/*    variant="numberInput" */}
                {/*    value={sizeY} */}
                {/*    onChange={setSizeY} */}
                {/*  /> */}
                {/* </div> */}
              </>
            ) : null}
          </section>

          <section>
            <span className={styles.title}>Начисление баллов</span>
            <div className={styles.choiceInput}>
              <InputRadio
                value="eachLevel"
                id="eachLevel"
                name="currentRadioValue"
                label="За каждый пройденный уровень"
                onChange={() => setCurrentRadio('eachLevel')}
                checked={currentRadio === 'eachLevel'}
              />

              <InputRadio
                value="success"
                id="success"
                name="currentRadioValue"
                onChange={() => setCurrentRadio('success')}
                checked={currentRadio === 'success'}
                label="Баллы за прыжок (начисляется если был прыжок и уровень пройден после прыжка)"
              />

              <InputRadio
                value="error"
                id="error"
                name="currentRadioValue"
                onChange={() => setCurrentRadio('error')}
                checked={currentRadio === 'error'}
                label="Если ошибка, после прыжка, игру возвращаем на предыдущий уровень (штрафа нет)"
              />
            </div>
            <div className={styles.conditionBlock}>
              <div>
                Если выполняет <InformationItem variant="numberInput" /> уровня подряд за
                <InformationItem variant="numberInput" />
              </div>
              <div>
                и <InformationItem variant="numberInput" />% ошибок, то система ПРЕДЛАГАЕТ поднять
                на
              </div>
              <div>
                <InformationItem variant="numberInput" />
                уровней один раз.
              </div>
            </div>
          </section>
        </div>

        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionBlock_header}>память и ритм</span>
          <TextEditor
            onChange={date => {
              let allText = '';
              date?.blocks?.forEach((item: any) => {
                allText += item.text;
              });
              setDescription(allText);
            }}
            defaultText={description}
          />
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          onClick={deletedPreset}
          variant="reset"
          disabled={gamePreset.gamePreset.status !== 'draft'}
        >
          Удалить настройки
        </Button>
        <Button
          disabled={gamePreset.gamePreset.status === 'active' || template.length < 1}
          onClick={savePreset}
        >
          Сохранить
        </Button>
      </div>
    </Dialog>
  );
});
