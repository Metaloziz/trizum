import { StatusTypes } from 'app/enums/StatusTypes';
import { RequestUsersForFilter } from 'app/types/UserTypes';
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

const temp = {
  gamePreset: {
    id: '1ed3d9b5-d0c4-6598-982e-2f8e6ee1c876',
    name: 'Draft',
    game: {
      code: 'shulte',
      name: '\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0428\u0443\u043b\u044c\u0442\u0435',
      type: 'memory',
    },
    status: 'draft',
    level: 'medium',
    settings: [
      {
        timeComplete: 33,
        elementsTotal: 5,
        levelMaxCompleted: 0,
        wordsCount: 0,
        digitMax: 0,
        errorAcceptable: 0,
        speed: 0,
        blinksCount: 0,
        cycleTime: 0,
        delay: 0,
        colorCount: 4,
        forms: 0,
        groupsCount: 0,
        size: 1,
        startTiles: 0,
        time: 0,
        levels: 0,
        colores: 0,
        description: '',
        colorsMap: ['#e30d00', '#699deb', '#c3b8f9', '#f88e36'],
      },
    ],
    createdAt: {
      date: '1970-01-01 3:00:00.000000',
      timezone_type: 3,
      timezone: 'Europe/Moscow',
    },
  },
  usedInWorks: [
    {
      id: '1ed400b6-ef80-6194-822f-2b7bbcd80b21',
      title: '\u041d\u043e\u0432\u043e\u0435 42',
    },
    {
      id: '1ed4335d-8e0b-62fe-9c56-2132256cddf4',
      title: '\u0422\u0435\u0441\u0442\u043e\u0432\u044b123123',
    },
    {
      id: '1ed43ce1-0d3a-60ca-a479-9f44b09fbac4',
      title: '\u0422\u0435\u0441\u0442',
    },
  ],
};

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
        this.actualPresets = this.newPresets?.items?.filter(pr => pr.game?.code === code);
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
            status: '' as StatusTypes,
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
