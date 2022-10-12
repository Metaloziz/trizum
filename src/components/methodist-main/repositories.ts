import { Paths } from 'app/enums/Paths';
import { HttpClient } from 'app/rest/HttpClient';
import tokenService from 'app/services/tokenService';
import { PaginationResponse } from 'app/types/PaginationResponse';
import { CourseViewModel, CourseViewModelAddEdit, RequestCoursesForFilter } from 'app/viewModels/CourseViewModel';
import { getConditionalParams } from 'utils/getConditionalsParams'

export class MethodistMainRepository {
  private readonly token = tokenService.getLocalAccessToken();

  readonly list = async (params?: RequestCoursesForFilter) => 
    
       new HttpClient(Paths.Courses, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withUrlParamsRequest(getConditionalParams(params))
      .withJsonReviver()
      .execute<PaginationResponse<CourseViewModel>>();

  


  readonly addOrEdit = async (model: CourseViewModelAddEdit) =>
    new HttpClient(model.id ? `${Paths.Courses}/${model.id}` : Paths.Courses, 'POST')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonRequest(model)
      .execute();
}
