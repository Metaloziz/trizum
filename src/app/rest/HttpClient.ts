import instance from 'app/services/config';
import tokenService from 'app/services/tokenService';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import dateTransformer from 'axios-date-reviver';
import { StatusCodes } from 'http-status-codes';
import { BASE_URL } from 'constants/constants';

export type PrerequestHook = () => Promise<void>;

export class HttpClient {
  private static readonly defaultTimeout = 300000;

  private config: AxiosRequestConfig;

  private prerequestHooks: Set<PrerequestHook> = new Set();

  private allowedHttpCodes: Set<StatusCodes> = new Set();

  /**
   * Создание нового инстанса клиента для работы с back-сервисом
   * @param url вызываемый метод на стороне сервиса, начаинается с ведущего "/api/...""
   * @param method HTTP метод: GET, POST...
   */
  constructor(readonly url: string, readonly method: Method) {
    this.config = this.makeConfig();
  }

  private readonly makeConfig = (): AxiosRequestConfig => ({
    baseURL: `${BASE_URL}/api/v1/`,
    url: this.url,
    method: this.method,
    timeout: HttpClient.defaultTimeout,
  });

  private readonly applyPrerequestHooks = async (): Promise<void> => {
    try {
      for (const hook of Array.from(this.prerequestHooks)) {
        await hook();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  private readonly toUrlEncoded = (input: Record<string, string>) =>
    Object.keys(input)
      .map(key => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent((input as any)[key]);
        return `${encodedKey}=${encodedValue}`;
      })
      .join('&');

  withPrerequestHooks = (hooks: PrerequestHook[]) => {
    for (const hook of Array.from(this.prerequestHooks)) {
      this.prerequestHooks.add(hook);
    }
  };

  withJsonRequest = (data: object) => {
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        'Content-Type': 'application/json',
      },
      data,
    };
    return this;
  };

  withXmlRequest = (data: string) => this.withPlainTextRequest(data, 'application/xml');

  withPlainTextRequest = (data: string, contentType = 'text/plain') => {
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        'Content-Type': contentType,
      },
      data,
    };
    return this;
  };

  withUrlEncodedRequest = (data: Record<string, string>) => {
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: this.toUrlEncoded(data),
    };
    return this;
  };

  withMultipartFormDataRequest = (data: FormData) => {
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        'Content-Type': 'multipart/form-data',
      },
      data,
    };
    return this;
  };

  withUrlParamsRequest = (params: Record<string, any>) => {
    this.config.url = `${this.url}?${this.toUrlEncoded(params)}`;
    return this;
  };

  withBearerAuthorization = (token: string) => {
    if (token === null) {
      token = tokenService.getLocalAccessToken();
    }
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        Authorization: token.includes('Bearer ') ? token : `Bearer ${token}`,
      },
    };
    return this;
  };

  withAllowedHttpCodes = (...codes: StatusCodes[]) => {
    codes.forEach(it => this.allowedHttpCodes.add(it));
    this.config = {
      ...this.config,
      validateStatus: status =>
        (status >= StatusCodes.OK && status < StatusCodes.MULTIPLE_CHOICES) ||
        codes.includes(status),
    };

    return this;
  };

  withJsonReviver = () => {
    this.config.transformResponse = [dateTransformer];
    return this;
  };

  withTimeout = (timeout: number) => {
    this.config = {
      ...this.config,
      timeout,
    };
    return this;
  };

  withBlobResponse = () => {
    this.config.responseType = 'blob';
    return this;
  };

  execute = async <TResponse>(): Promise<TResponse> => {
    await this.applyPrerequestHooks();
    const response = (await instance.request(this.config)) as AxiosResponse<TResponse>;
    return response.data;
  };
}
