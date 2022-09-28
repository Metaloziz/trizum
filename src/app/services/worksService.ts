import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { OneWorkResponseT, PresetT, RequestCreateWork } from 'app/types/WorkTypes';

const worksService = {
  createWork: async (options: RequestCreateWork): Promise<any> => {
    const { data } = await instance.post(Paths.Works, options);
    return data;
  },
  editWork: async (options: RequestCreateWork, id: string): Promise<any> => {
    const { data } = await instance.post(`${Paths.Works}/${id}`, options);
    return data;
  },
  deleteWork: async (id: string): Promise<any> => {
    const { data } = await instance.delete(`${Paths.Works}/${id}`);
    return data;
  },

  getOneWork: async (id: string): Promise<OneWorkResponseT> => {
    const { data } = await instance.get(`${Paths.Works}/${id}`);
    return data;
  },
};
export default worksService;
