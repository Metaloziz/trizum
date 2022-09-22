import { PresetT } from 'app/types/WorkTypes';
import { makeAutoObservable, runInAction } from 'mobx';

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
} from 'app/types/GameTypes';

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
      status: '',
      level: '',
      settings: [],
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

  getPresets = async () => {
    try {
      const res = await gamesService.getPresets();
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
        this.actualPresets = this.newPresets.items.filter(pr => pr.game.code === code);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  getPreset = async (presetName: string) => {
    try {
      const preset = this.newPresets.items.filter(el => el.name === presetName);
      if (preset.length) {
        const res = await gamesService.getPreset(preset[0].id);
        runInAction(() => {
          this.gamePreset = res;
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
            status: '',
            level: '',
            settings: [],
          },
          usedInWorks: [],
        };
      }
    } catch (e) {
      console.warn(e);
    }
  };

  createPresets = async (params: EditOrCreatePresetParamsT) => {
    await gamesService.createPresentGame(params);
    await this.getPresets();
  };

  editPreset = async (params: EditOrCreatePresetParamsT) => {
    await gamesService.editPresetGame(this.gamePreset.gamePreset.id, params);
    await this.getPresets();
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
}

export default new GamesStore();
