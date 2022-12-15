import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { UpdateParentingPayloadType } from 'app/types/updateParentingPayloadType';
import { UpdateUserPayloadT } from 'app/types/UpdateUserPayloadT';
import {
  FullResponseUserT,
  RequestParenting,
  RequestUsersForFilter,
  ResponseOneUser,
  ResponseParenting,
} from 'app/types/UserTypes';

const usersService = {
  getAllUsers: async (params?: RequestUsersForFilter): Promise<FullResponseUserT> => {
    const res = await instance.get(Paths.Users, {
      params: {
        page: params?.page,
        role: params?.role,
        per_page: params?.perPage,
        franchise_id: params?.franchiseId,
        first_name: params?.firstName || undefined || null,
        middle_name: params?.middleName || undefined || null,
        last_name: params?.lastName || undefined || null,
        city: params?.city || undefined,
        birthdate: params?.birthdate_until || undefined,
      },
    });
    return res.data;
  },
  getUsersForFilters: async (params?: RequestUsersForFilter): Promise<FullResponseUserT> => {
    const res = await instance.get(Paths.Users, {
      params: {
        page: params?.page || undefined,
        role: params?.role || undefined,
        per_page: params?.perPage || undefined,
        franchise_id: params?.franchiseId || undefined,
        group_id: params?.groupId || undefined,
        first_name: params?.firstName || undefined,
        middle_name: params?.middleName || undefined,
        last_name: params?.lastName || undefined,
        city: params?.city || undefined,
        birthdate_since: params?.birthdate_since || undefined,
        birthdate_until: params?.birthdate_until || undefined,
        is_payed: typeof params?.is_payed === 'boolean' ? params.is_payed : undefined,
        phone: params?.phone || undefined,
        email: params?.email || undefined,
        tariff_id: params?.tariff_id || undefined,
        is_active: typeof params?.is_active === 'boolean' ? params.is_active : undefined,
      },
    });
    return res.data;
  },
  getOneUser: async (id: string): Promise<ResponseOneUser> => {
    const { data } = await instance.get(`${Paths.Users}/${id}`);
    return data;
  },
  updateUser: async (newUser: UpdateUserPayloadT, userId: string) => {
    const { data } = await instance.post<ResponseOneUser>(`${Paths.Users}/${userId}`, newUser);
    return data;
  },
  createParenting: async (params: RequestParenting): Promise<ResponseParenting> => {
    const { data } = await instance.post(Paths.Parentings, params);
    return data;
  },

  updateParenting: async ({ parentingId, payload }: UpdateParentingPayloadType) => {
    const { data } = await instance.post(Paths.Parentings + '/' + parentingId, payload);
    return data;
  },

  deleteParenting: async (parentingId: string) => {
    const { data } = await instance.delete(Paths.Parentings + '/' + parentingId);
    return data;
  },
};
export default usersService;
