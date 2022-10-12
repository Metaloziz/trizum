import { Paths } from 'app/enums/Paths';
import { HttpClient } from 'app/rest/HttpClient';
import tokenService from 'app/services/tokenService';
import { PaginationResponse } from 'app/types/PaginationResponse';
import {CourseViewModel, CourseViewModelAddEdit, RequestCoursesForFilter} from 'app/viewModels/CourseViewModel';

export class MethodistMainRepository {
  private readonly token = tokenService.getLocalAccessToken();

  // readonly list = async (params?: RequestCoursesForFilter) =>
  readonly list = async (page : number=0) =>
    new HttpClient(Paths.Courses, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      // .withUrlParamsRequest({ page:params?.page, title:params?.title, level:params?.level, createdSince:params?.createdSince })
      .withUrlParamsRequest({ page })
      .withJsonReviver()
      .execute<PaginationResponse<CourseViewModel>>();

  readonly addOrEdit = async (model: CourseViewModelAddEdit) =>
    new HttpClient(model.id ? `${Paths.Courses}/${model.id}` : Paths.Courses, 'POST')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonRequest(model)
      .execute();
}
