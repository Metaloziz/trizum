import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { CreatOrEditWorkRequestT } from 'app/types/WorkTypes';
import { SearchHomeWorksParamsType } from '../types/SearchHomeWorksParamsType';

const homeWorksService = {
  getHomeWorks: async (params: SearchHomeWorksParamsType) => {
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
