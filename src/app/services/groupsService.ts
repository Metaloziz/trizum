import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';

const groupsService = {
  getGroups: async (): Promise<ResponseGroups[]> => {
    const res = await instance.get(Paths.Groups);
    return res.data;
  },
  getOneGroup: async (id: string): Promise<ResponseOneGroup> => {
    const { data } = await instance.get(`${Paths.Groups}/${id}`);
    return data;
  },
};
export default groupsService;