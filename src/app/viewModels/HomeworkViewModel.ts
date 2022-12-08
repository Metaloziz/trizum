import { GameT } from 'app/types/GameTypes';
import { TimeZoneType } from 'app/types/TimeZoneType';

export class GamePresetType {
  createdAt = new TimeZoneType();

  id: string = '';

  level: string = '';

  name: string = '';

  status: string = '';

  timeMax: number = 0;

  game = new GameT();
}

export class GamePresetContainerType {
  id: string = '';

  gamePreset = new GamePresetType();
}

export class HomeworkViewModel {
  id: string = '';

  status: string = '';

  title: string = '';

  text: string = '';

  type: string = '';

  gamePresets = [new GamePresetContainerType()];

  gamePresetsCount?: number = 0;

  createdAt = new TimeZoneType();
}
