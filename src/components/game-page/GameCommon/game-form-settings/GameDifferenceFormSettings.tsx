import React, {
  FC,
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AreaSelector, IArea, IAreaRendererProps } from '@bmunozg/react-image-area';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Tabs,
  Tab,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ExpandMore, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BASE_DEFAULT_VALUES } from 'components/game-page/GameCommon/game-form-settings/constants';
import {
  GameDifferenceFormType,
  FormSettingsType,
  DifferenceGameImage,
} from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';

import { BaseFormGameSettings } from './BaseFormGameSettings';
import { GAME_DIFFERENCE_FORM_SCHEMA } from './game-form-schema';
import { BASE_URL } from 'constants/constants';

import { Point } from 'games/games/difference/types';
import { gameDifferenceService } from 'app/services/gameDifferenceService';
import { getBase64 } from 'utils/convertBase64';
import { convertEmptyStringToNull, convertNullToEmptyString } from 'utils/convertTextFieldUtils';

const DEFAULT_VALUES: GameDifferenceFormType = {
  ...BASE_DEFAULT_VALUES,
  timeComplete: 60,
  errorAacceptable: 10,
  differenceGameLevels: [],
};
interface LevelPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

interface TabsProps {
  levelId: string;
  levelNumber: number;
  images: { id: string; path: string }[];
  areas: IArea[];
  uploadFiles: (id: number, files: File[]) => void;
  saveAreas: (id: number, areas: IArea[], points: Point[]) => void;
  deleteArea: (fieldId: number, areaNumber: number) => void;
}

const LevelPanel: FC<LevelPanelProps> = ({ value, index, children }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && children}
  </div>
);

const LevelTabs: FC<TabsProps> = ({
  images,
  areas = [],
  levelNumber,
  levelId,
  uploadFiles,
  saveAreas,
  deleteArea,
}) => {
  const [tabs, setTabs] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const imageRef = useRef() as MutableRefObject<HTMLImageElement>;

  const widthRatio = useMemo(
    () => (imageRef.current ? imageRef.current.width / imageRef.current.naturalWidth : 0),
    [imageRef.current],
  );

  const heightRatio = useMemo(
    () => (imageRef.current ? imageRef.current.height / imageRef.current.naturalHeight : 0),
    [imageRef.current],
  );

  const calcPointsDifference = (differenceArea: IArea) => {
    const { x, y, width, height } = differenceArea;
    return [
      {
        x: Math.round(x / widthRatio),
        y: Math.round(y / heightRatio),
      },
      {
        x: Math.round((x + width) / widthRatio),
        y: Math.round(y / heightRatio),
      },
      {
        x: Math.round((x + width) / widthRatio),
        y: Math.round((y + height) / heightRatio),
      },
      {
        x: Math.round(x / widthRatio),
        y: Math.round((y + height) / heightRatio),
      },
    ];
  };

  const onChangeHandler = (differenceAreas: IArea[]) => {
    const points = [] as Point[];

    differenceAreas
      .filter(item => !item.isChanging && !item.isNew)
      .forEach(area => {
        calcPointsDifference(area).forEach(point => points.push(point));
      });

    return saveAreas(levelNumber, differenceAreas, points);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  const handleDeleteArea = ({ areaNumber }: IAreaRendererProps) =>
    deleteArea(levelNumber, areaNumber - 1);

  const customRender = (areaProps: IAreaRendererProps) => {
    if (!areaProps.isChanging) {
      return (
        <Box
          key={areaProps.areaNumber}
          display="flex"
          flex={1}
          height="100%"
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: '#e0e0e0', opacity: 0.8 }}
        >
          <IconButton onClick={() => handleDeleteArea(areaProps)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </Box>
      );
    }
    return null;
  };

  const handleUploadFiles = async (fileList: FileList) => {
    setError(false);

    const files = [...fileList];
    if (files.length > 2 || files.length === 1) {
      return setError(true);
    }
    setIsLoading(prev => !prev);
    await uploadFiles(levelNumber, files);
    return setIsLoading(prev => !prev);
  };

  return (
    <AccordionDetails>
      <Box mb={2} display="flex">
        <Tabs value={tabs} onChange={handleChange}>
          <Tab key={`tab-${levelId}-1`} label="Изображение 1" />
          <Tab key={`tab-${levelId}-2`} label="Изображение 2" />
        </Tabs>
        <Box ml={2} display="flex" alignItems="center">
          <Button variant="contained" component="label" disabled={isLoading}>
            Загрузить
            <input
              hidden
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg"
              onChange={({ target: { files } }) => files && handleUploadFiles(files)}
            />
          </Button>
          {error && (
            <Box ml={2}>
              <Typography color="error">Необходимо выбрать 2 изображения</Typography>
            </Box>
          )}
        </Box>
      </Box>
      {isLoading && (
        <Box marginTop={2} marginBottom={2} display="flex" flex={1} justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {!isLoading && images.length === 0 && (
        <Box marginTop={2}>
          <Typography>Загрузите изображение</Typography>
        </Box>
      )}
      {!isLoading &&
        images.map((image, index) => (
          <LevelPanel key={`image-${levelId}-${index + 1}`} value={tabs} index={index}>
            <Box display="flex" flex={1} width="100%">
              {image.path ? (
                <AreaSelector
                  areas={areas || []}
                  onChange={onChangeHandler}
                  customAreaRenderer={customRender}
                  wrapperStyle={{
                    width: '100%',
                  }}
                >
                  <img
                    ref={imageRef}
                    src={image.path}
                    alt={`difference-${index}`}
                    width="100%"
                    height="auto"
                  />
                </AreaSelector>
              ) : (
                <Box marginTop={2}>
                  <Typography>Загрузите изображение</Typography>
                </Box>
              )}
            </Box>
          </LevelPanel>
        ))}
    </AccordionDetails>
  );
};

export const GameDifferenceFormSettings = (props: FormSettingsType): ReactElement => {
  const { usedInWorks, gamePreset, onFormSubmit, deletedPreset } = props;
  const { settings, status, id, level, name } = gamePreset;
  const { timeComplete, description, errorAacceptable, differenceGameLevels } = settings[0];

  const [levelAccordion, setLevelAccordion] = useState<Record<number, boolean>>({});
  const [levelAreas, setLevelAreas] = useState<Record<number, { points: Point[]; areas: IArea[] }>>(
    {},
  );

  const defaultValues: GameDifferenceFormType =
    id === ''
      ? DEFAULT_VALUES
      : ({
          name,
          level,
          status,
          description,
          timeComplete,
          errorAacceptable,
          differenceGameLevels,
        } as GameDifferenceFormType);

  const methods = useForm<GameDifferenceFormType>({
    resolver: yupResolver(GAME_DIFFERENCE_FORM_SCHEMA),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = methods;

  const validateDifferencePoint = () => {
    let isValid = true;
    const gameLevels = getValues('differenceGameLevels');
    const pointsForLevels = Object.values(levelAreas);

    gameLevels.forEach(({ images }, levelNumber) => {
      const countImages = images.filter(image => image).length;
      const areaSelector = pointsForLevels[levelNumber];

      if (countImages < 2) {
        isValid = false;
        methods.setError(`differenceGameLevels.${levelNumber}`, {
          type: 'required',
          message: `Необходимо загрузить изображения`,
        });
      }

      if (countImages === 2) {
        if (!areaSelector || !areaSelector?.points?.length || areaSelector?.points?.length < 1) {
          isValid = false;
          methods.setError(`differenceGameLevels.${levelNumber}`, {
            type: 'required',
            message: `Необходимо указать более 1 различия`,
          });
        }
      }
    });
    return isValid;
  };

  const onSubmit = handleSubmit(values => {
    const valid = validateDifferencePoint();
    if (valid) {
      onFormSubmit({
        ...values,
        differenceGameLevels: values.differenceGameLevels.map((item, index) => ({
          ...item,
          differences: { points: levelAreas[index].points, areas: levelAreas[index].areas },
        })),
      });
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'differenceGameLevels' as never,
  });

  const handleAddLevel = () => {
    const { length: countLevels } = getValues('differenceGameLevels');
    setLevelAccordion(prev => ({ ...prev, [countLevels]: false }));
    append({ images: ['', ''], differences: [] });
  };

  const handleUploadImage = async (fieldId: number, files: File[]) => {
    const images = [] as DifferenceGameImage[];
    for (const file of files) {
      try {
        const convertImage = (await getBase64(file)) as string;
        const result = await gameDifferenceService.uploadImage(
          convertImage.replace('data:', '').replace(/^.+,/, ''),
        );
        images.push({ id: result.data.id, path: `${BASE_URL}/${result.data.path}` });
      } catch (error) {
        images.push({ id: '', path: '' });
      }
    }

    return update(fieldId, { images, differences: [] });
  };

  const handleDeleteLevel = async (fieldIndex: number) => {
    const { images } = getValues(`differenceGameLevels.${fieldIndex}`);
    remove(fieldIndex);

    for (const image of images) {
      if (image.id) {
        await gameDifferenceService.deleteImage(image.id);
      }
    }
  };

  const handleAddArea = (fieldId: number, areas: IArea[], points: Point[]) => {
    setLevelAreas(prev => ({ ...prev, [fieldId]: { points, areas } }));
    methods.clearErrors(`differenceGameLevels.${fieldId}`);
  };

  const handleDeleteArea = (fieldId: number, areaNumber: number) => {
    setLevelAreas(prev => ({
      [fieldId]: {
        points: prev[fieldId].points.filter((_, index) => index > areaNumber + 3),
        areas: prev[fieldId].areas.filter((_, index) => index !== areaNumber),
      },
    }));
  };

  useEffect(() => {
    const prevSettings = getValues('differenceGameLevels');
    if (prevSettings.length === 0) {
      handleAddLevel();
    }
    prevSettings.forEach((item, index) => {
      setLevelAreas(prevState => ({ ...prevState, [index]: item.differences }));
    });
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <BaseFormGameSettings
          gameName="НАЙДИ ОТЛИЧИЯ"
          deletedPreset={deletedPreset}
          usedInWorks={usedInWorks}
          status={status}
        >
          <Grid item xs={12} sm={6}>
            <Controller
              name="timeComplete"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Время на прохождение игры, с."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.timeComplete?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="errorAacceptable"
              render={({ field: { value, onChange, ref } }) => (
                <TextFieldCustom
                  type="text"
                  label="Кол-во возможных ошибок."
                  size="small"
                  fullWidth
                  inputProps={{ type: 'number' }}
                  error={errors.errorAacceptable?.message}
                  onChange={event => onChange(convertEmptyStringToNull(event))}
                  value={convertNullToEmptyString(value!)}
                  ref={ref}
                />
              )}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <IconButton color="primary" onClick={handleAddLevel}>
                  <AddIcon />
                </IconButton>
              </Box>
              {fields.map(({ id: levelId }, index) => (
                <Accordion
                  key={levelId}
                  disableGutters
                  expanded={levelAccordion[index] ? levelAccordion[index] : false}
                  onChange={(_, expanded) =>
                    setLevelAccordion(prev => ({ ...prev, [index]: expanded }))
                  }
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box
                      display="flex"
                      flex={1}
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center">
                        <Typography>Уровень {index + 1}</Typography>
                        <Box ml={2}>
                          {errors?.differenceGameLevels && (
                            <Typography color="error">
                              {errors?.differenceGameLevels[index]?.message}
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      <Box marginLeft={2} marginRight={2}>
                        <IconButton color="primary" onClick={() => handleDeleteLevel(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <LevelTabs
                    levelNumber={index}
                    levelId={levelId}
                    images={getValues(`differenceGameLevels.${index}.images`)}
                    areas={levelAreas[index]?.areas}
                    uploadFiles={handleUploadImage}
                    saveAreas={handleAddArea}
                    deleteArea={handleDeleteArea}
                  />
                </Accordion>
              ))}
            </Box>
          </Grid>
        </BaseFormGameSettings>
      </form>
    </FormProvider>
  );
};
