import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ArticleT } from 'app/types/ArticleT';
import { RequestUsersParams } from '../types/UserTypes';
import { ImageT, ResponseImagesT, RequestImagesParamsT } from '../types/ImagesTypes';
import { AxiosResponse } from 'axios';

export const galleryService = {
  getImages: async (params?: RequestImagesParamsT): Promise<AxiosResponse<ResponseImagesT>> => {
    const res = await instance.get(Paths.Images, {
      params: {
        page: params?.page,
        per_page: params?.perPage,
      },
    });
    return res;
  },

  uploadImage: async (image64: string): Promise<AxiosResponse<ImageT>> => {
    const res = await instance.post(Paths.Images, { image: image64 });
    return res;
  },

  deleteImage: async (id: string): Promise<AxiosResponse<any>> => {
    const res = await instance.delete(Paths.Images);
    return res;
  },
};
