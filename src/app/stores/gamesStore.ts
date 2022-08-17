import { makeAutoObservable, runInAction } from 'mobx';

import gamesService from 'app/services/gamesService';
import worksService from 'app/services/worksService';
import { GamesT } from 'app/types/GameTypes';
import { PresetT } from 'app/types/WorkTypes';

class GamesStore {
  presets: PresetT[] = [];

  games: GamesT[] = [];

  constructor() {
    makeAutoObservable(this);
  }

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
    const res = await worksService.getPresets();
    runInAction(() => {
      this.presets = res;
    });
  };
}

export default new GamesStore();
