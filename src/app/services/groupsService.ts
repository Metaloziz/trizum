import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  CreateGroupForServer,
  GroupParamsForServer,
  ResponseGroups,
  ResponseOneGroup,
} from 'app/types/GroupTypes';
import { WithPagination } from 'app/types/WithPagination';
import { OlympiadPayloadType } from 'app/types/OlympiadPayloadType';

export type AddUserGroupPayloadType = {
  userId: string;
  groupId: string;
};

const groupsService = {
  getGroups: async (
    paramsData?: GroupParamsForServer,
  ): Promise<WithPagination<ResponseGroups[]>> => {
    const paramsCreator = (data?: GroupParamsForServer) => {
      if (data) {
        for (const key in data) {
          // @ts-ignore
          if (data[key] === '') data[key] = undefined;
        }
      }
      return data;
    };

    const params = paramsCreator(paramsData);

    const actualParams = {
      per_page: params?.perPage || undefined,
      page: params?.page || undefined,
      for_group_id: params?.forGroupId || undefined,
      date_since: params?.dateSince || undefined,
      date_until: params?.dateUntil || undefined,
      franchise_id: params?.franchiseId || undefined,
      level: params?.level || undefined,
      name: params?.name || undefined,
      teacher_id: params?.teacherId || undefined,
      type: params?.type || undefined,
      status: params?.status || undefined,
    };

    const res = await instance.get(Paths.Groups, {
      params: actualParams,
    });

    return res.data;
  },

  getOneGroup: async (id: string): Promise<ResponseOneGroup> => {
    const { data } = await instance.get(`${Paths.Groups}/${id}`);
    return data;
  },

  addGroup: async (group: CreateGroupForServer) => {
    const { data } = await instance.post(Paths.Groups, group);
    return data;
  },

  addUserGroup: async (addGroupData: AddUserGroupPayloadType) => {
    const { data } = await instance.post(`${Paths.UserGroups}`, addGroupData);
    return data;
  },

  editGroup: async (params: any, id: string) => {
    const { data } = await instance.post(`${Paths.Groups}/${id}`, params);
    return data;
  },

  addOlympiadGroup: async (group: OlympiadPayloadType) => {
    const { data } = await instance.post(`${Paths.Groups}`, group);
    return data;
  },
};
export default groupsService;
