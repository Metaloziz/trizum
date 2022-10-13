import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
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

const gamesService = {
  getPresets: async (): Promise<GamePresetsResponseT> => {
    const { data } = await instance.get(`${Paths.Presets}?per_page=1000`);
    return data;
  },
  getPreset: async (id: string): Promise<OneGamePresent> => {
    const { data } = await instance.get(`${Paths.Presets}/${id}`);
    return data;
  },
  getGame: async (game: string): Promise<GameT> => {
    const { data } = await instance.get(`${Paths.Games}/${game}`);
    return data;
  },
  getGames: async (): Promise<GamesT> => {
    const { data } = await instance.get(Paths.Games);
    return data;
  },
  createPresetGame: async (params: EditOrCreatePresetParamsT): Promise<GamePresetT> => {
    const { data } = await instance.post(Paths.Presets, { ...params, status: 'draft' });
    return data;
  },
  editPresetGame: async (id: string, params: EditOrCreatePresetParamsT): Promise<GamePresetT> => {
    const { data } = await instance.post(`${Paths.Presets}/${id}`, params);
    return data;
  },
  sendPlayResults: async (params: PlaySendResultT) => {
    const { data } = await instance.post(Paths.PlayResults, params);
    return data;
  },
  deletePreset: async (id: string) => {
    const { data } = await instance.post(`${Paths.Presets}/${id}`, { status: 'removal' });
    return data;
  },
  getPlayResults: async (): Promise<PlayResultsResponseT> => {
    const { data } = await instance.get(Paths.PlayResults);
    return data;
  },
};
export default gamesService;
