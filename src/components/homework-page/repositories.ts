import { Paths } from 'app/enums/Paths';
import { HttpClient } from 'app/rest/HttpClient';
import tokenService from 'app/services/tokenService';
import { PaginationResponse } from 'app/types/PaginationResponse';
import { CreatOrEditWorkRequestT, OneWorkResponseT } from 'app/types/WorkTypes';
import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';

export class HomeworkRepository {
  private readonly token = tokenService.getLocalAccessToken();

  readonly list = async (page: number = 0, status?: string, perPage?: number, type?: string) => {
    const params: Record<string, any> = { page };
    // TODO - нормально сделать
    status && (params.status = status);
    perPage && (params.perPage = perPage);
    type && (params.type = type);

    return new HttpClient(Paths.Works, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withUrlParamsRequest(params)
      .withJsonReviver()
      .execute<PaginationResponse<HomeworkViewModel>>();
  };

  readonly getOneWork = async (id: string): Promise<OneWorkResponseT> =>
    new HttpClient(`${Paths.Works}/${id}`, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonReviver()
      .execute<OneWorkResponseT>();

  readonly addOrEdit = async (model: CreatOrEditWorkRequestT) =>
    new HttpClient(model.id ? `${Paths.Works}/${model.id}` : Paths.Works, 'POST')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonRequest(model)
      .execute();

  readonly remove = async (model: CreatOrEditWorkRequestT) => this.addOrEdit(model);
}
