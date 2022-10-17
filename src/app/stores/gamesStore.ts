import { StatusTypes } from 'app/enums/StatusTypes';

import gamesService from 'app/services/gamesService';
import {
  EditOrCreatePresetParamsT,
  GamePresetsResponseT,
  GamePresetT,
  GamesT,
  GameT,
  OneGamePresent,
  PlayResultsResponseT,
  PlaySendResultT,
  PresetsGameSettings,
} from 'app/types/GameTypes';
import { PresetT } from 'app/types/WorkTypes';
import { makeAutoObservable, runInAction } from 'mobx';
import { removeEmptyFields } from '../../utils/removeEmptyFields';
import { SearchParamsType } from '../types/SearchParamsType';
import appStore, { Roles } from 'app/stores/appStore';

class GamesStore {
  presets: PresetT[] = [];

  newPresets: GamePresetsResponseT = {
    items: [],
    perPage: 0,
    page: 0,
    total: 0,
  };

  gamePreset: OneGamePresent = {
    gamePreset: {
      id: '',
      name: '',
      game: {
        code: '',
        name: '',
        type: '',
      },
      status: '' as StatusTypes,
      level: 'easy',
      settings: [
        {
          timeComplete: 10,
          elementsTotal: 4,
          levelMaxCompleted: 1,
          gameCode: '',
          cycleTime: 1,
          wordsCount: 1,
          digitMax: 1,
          templateCode: 1,
          groupsCount: 4,
          blinksCount: 4,
          errorAcceptable: 1,
          speed: 1,
          colorsMap: [],
          delay: 1,
          description: '',
          sound: 0,
        },
      ] as PresetsGameSettings[],
    },
    usedInWorks: [],
  };

  game: GameT = {
    code: '',
    type: '',
    name: '',
  };

  actualPresets: Omit<GamePresetT, 'settings'>[] = [];

  games: GamesT = [];

  playResults: PlayResultsResponseT = {} as PlayResultsResponseT;

  isCurrentGameView: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getGame = async (game: string) => {
    try {
      const res = await gamesService.getGame(game);
      runInAction(() => {
        this.game = res;
        this.filterPresets(res.code);
      });
    } catch (e) {
      console.log(e);
    }
  };

  getGames = async () => {
    try {
      const res = await gamesService.getGames();
      runInAction(() => {
        this.games = res;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getPresets = async (searchPresetParams?: Partial<SearchParamsType>) => {
    try {
      const params = removeEmptyFields(searchPresetParams || {});
      params.per_page = 1000; // todo hardcode
      const res = await gamesService.getPresets(params);
      runInAction(() => {
        this.newPresets = res;
      });
    } catch (e) {
      console.warn(e);
    }
  };

  filterPresets = (code: string) => {
    try {
      runInAction(() => {
        this.actualPresets = this.newPresets?.items?.filter(pr => pr.game?.code === code);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  getPreset = async (presetName: string) => {
    try {
      let preset;
      if (appStore.role !== Roles.Student) {
        const zxc = this.newPresets.items.find(el => el.name === presetName);
        if (zxc) {
          preset = { gameCode: zxc.name, gameId: zxc.id };
        }
      }
      if (appStore.role === Roles.Student) {
        const zxc = appStore.currentGameIds.find(el => el.gameCode === presetName);
        if (zxc) {
          preset = zxc;
        }
      }
      if (preset) {
        const res = await gamesService.getPreset(preset.gameId);
        runInAction(() => {
          this.gamePreset = res;
          this.gamePreset.gamePreset.settings = res.gamePreset.settings;
        });
      } else {
        this.gamePreset = {
          gamePreset: {
            id: '',
            name: '',
            game: {
              code: '',
              name: '',
              type: '',
            },
            status: '' as StatusTypes,
            level: '',
            settings: [] as PresetsGameSettings[],
          },
          usedInWorks: [],
        };
      }
    } catch (e) {
      console.warn(e);
    }
  };

  createPresets = async (params: EditOrCreatePresetParamsT) => {
    await gamesService.createPresetGame(params);
    await this.getPresets();
    this.filterPresets(this.game.code);
  };

  editPreset = async (params: EditOrCreatePresetParamsT) => {
    await gamesService.editPresetGame(this.gamePreset.gamePreset.id, params);
    await this.getPresets();
    this.filterPresets(this.game.code);
  };

  deletePreset = async (id: string) => {
    await gamesService.deletePreset(id);
    await this.getPresets();
    this.filterPresets(this.game.code);
  };

  sendResults = async (params: PlaySendResultT) => {
    await gamesService.sendPlayResults(params);
  };

  getPlayResults = async () => {
    try {
      const res = await gamesService.getPlayResults();
      runInAction(() => {
        this.playResults = res;
      });
    } catch (e) {
      console.warn(e);
    }
  };

  setIsCurrentGameView = (value: boolean) => {
    this.isCurrentGameView = value;
  };
}

export default new GamesStore();
