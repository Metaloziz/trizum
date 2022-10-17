import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { CreatOrEditWorkRequestT } from 'app/types/WorkTypes';
import { SearchParamsType } from '../types/SearchParamsType';

const homeWorksService = {
  getHomeWorks: async (params: SearchParamsType) => {
    const { data } = await instance.get(Paths.Works, { params });
    return data;
  },

  addOrEditWork: async (model: CreatOrEditWorkRequestT) => {
    const { data } = await instance.post(
      model.id ? `${Paths.Works}/${model.id}` : Paths.Works,
      model,
    );
    return data;
  },
};
export default homeWorksService;
