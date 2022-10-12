import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Loader } from '../loader/Loader';

import styles from './HomeworkAddEditPage.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import { WorkTypes } from 'app/enums/WorkTypes';
import coursesStore from 'app/stores/coursesStore';
import gamesStore from 'app/stores/gamesStore';
import worksStore from 'app/stores/WorksStore';
import { RequestCreateWork } from 'app/types/WorkTypes';
import Button from 'components/button/Button';
import SampleBlock from 'components/homework-add-edit-page/SampleBlock/SampleBlock';
import Step from 'components/step/Step';
import TextField from 'components/text-field/TextField';
import { getOption } from 'utils/getOption';
import { OptionT } from 'app/types/OptionT';

type DefaultValues = {
  title: string;
};

export type PresetWithOrderT = { index: number; label: string; value: string };

const defaultValues: DefaultValues = {
  title: '',
};

const DEFAULT_GAME_PRESET_AMOUNT = 3;

const HomeworkAddEditPage = observer(() => {
  const { setCurrentCourse, currentCourse } = coursesStore;
  const { currentHomework, createHomework, editHomework, setCurrentWork } = worksStore;
  const { presets, games, getGames, getPresets, newPresets } = gamesStore;

  const [gameOptions, setGameOptions] = useState<OptionT[]>([]);

  useEffect(() => {
    setGameOptions(games.map(g => getOption(g.name, g.name)));
  }, [games]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [description, setDescription] = useState('');

  const [gamePresetAmount, setGamePresetAmount] = useState(DEFAULT_GAME_PRESET_AMOUNT);
  const [gamePresetAmountAr, setGamePresetAmountAr] = useState<number[]>([]);
  const homeworksAr: MutableRefObject<RequestCreateWork[]> = useRef([]);
  const presetsAr: MutableRefObject<PresetWithOrderT[]> = useRef([]);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const increaseGamePresetAmount = () => {
    setGamePresetAmount(value => value + 1);
    setGamePresetAmountAr(ar => [...ar, ar?.length]);
  };

  const onAddHWClick = () => {
    // coursesStore.setNewCourse({ level, title });
    // router.push(`${AppRoutes.Homework}/add`);
  };

  const load = async () => {
    // запрос за играми?? и пресетами
    await getGames();
    await getPresets();
    setIsLoaded(true);
  };

  const onSelectPattern = (value: PresetWithOrderT) => {
    const searchedIndex = presetsAr.current.findIndex(el => el.index === value.index);
    if (searchedIndex !== -1) {
      presetsAr.current.splice(searchedIndex, 1);
    }
    presetsAr.current.push(value);
  };

  const helper = () => {
    const res: number[] = [];
    setGamePresetAmountAr([]);
    for (let i = 0; i < gamePresetAmount; i++) {
      res.push(i);
    }
    setGamePresetAmountAr(res);
  };

  const onSave = (values: DefaultValues) => {
    if (!currentHomework) {
      const qwe: RequestCreateWork = {
        type: WorkTypes.HW,
        title: values.title,
        text: description,
        gamePresets: presetsAr.current.map(el => el.value),
      };
      createHomework(qwe);
    }
    if (currentHomework) {
      const qwe: RequestCreateWork = {
        type: currentHomework.type as WorkTypes,
        title: values.title,
        text: description,
        gamePresets: [],
      };
      editHomework(qwe, currentHomework.id);
      setCurrentWork(undefined);
    }
    reset();
    setDescription('');
    navigate(AppRoutes.Homework);
    // router.push(AppRoutes.Homework);
    // homeworksAr.current.push(qwe);
    // setDescription('');
    // setIndex(idx => idx + 1);
    // presetsAr = [];
    // reset({});
    // setGamePresetAmount(DEFAULT_GAME_PRESET_AMOUNT);
    // getNearestLessonDateHelper();
    // setActualGames([...games]);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    helper();
  }, []);

  return !isLoaded ? (
    <Loader />
  ) : (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.homeWork}>
          <h1>Домашнее задание</h1>
          <Controller
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Название..."
                label="Название"
                error={errors.title?.message}
              />
            )}
            control={control}
          />
          <div className={styles.editorWrapper}>
            {/* <h3>Описание</h3> */}
            <TextField
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Описание..."
              label="Описание"
            />
            {/* <TextEditor /> */}
          </div>
        </div>
        <div className={styles.sample}>
          <div className={styles.sampleChoice}>
            {gamePresetAmountAr.map(idx => (
              <SampleBlock
                key={idx}
                games={gameOptions}
                patterns={presets}
                onSelectPattern={onSelectPattern}
                index={idx}
              />
            ))}
            <div className={`${styles.sampleBlock} ${styles.sampleAdd}`}>
              <div>
                <button onClick={increaseGamePresetAmount}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeBtn}>
        <Button onClick={handleSubmit(onSave)}>Сохранить</Button>
        {/* <Button onClick={onSubmit}>Отправить</Button> */}
        <div>
          <Step countStep={7} />
        </div>
      </div>
    </div>
  );
});

export default HomeworkAddEditPage;
