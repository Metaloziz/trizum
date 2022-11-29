import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ImageT, ResponseImagesT, RequestImagesParamsT } from '../types/ImagesTypes';
import { AxiosResponse } from 'axios';

export const gameDifferenceService = {
  uploadImage: async (image64: string): Promise<AxiosResponse<ImageT>> => {
    const res = await instance.post(Paths.Images, { image: image64 });
    return res;
  },

  deleteImage: async (id: string): Promise<AxiosResponse<any>> => {
    const res = await instance.delete(`${Paths.Images}/${id}`);
    return res;
  },
};
