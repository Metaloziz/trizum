import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { CreatOrEditWorkRequestT } from 'app/types/WorkTypes';

const homeWorksService = {
  getHomeWorks: async (page: number = 0, status?: string, perPage?: number, type?: string) => {
    const params: Record<string, string | number> = {
      page,
    };
    status && (params.status = status);
    perPage && (params.per_page = perPage);
    type && (params.type = type);

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
