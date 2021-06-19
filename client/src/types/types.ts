interface ISuccessResponse {
  statuses: ITweet[],
  search_metadata: any
}
interface IErrorResponse {
  errors: {
    code: number,
    message: string
  }[]
}

export type IAPIResponse = ISuccessResponse | IErrorResponse;

export const isSuccessResponse = (response: IAPIResponse): response is ISuccessResponse => 
 (response as ISuccessResponse).statuses !== undefined;

export const isErrorResponse = (response: IAPIResponse): response is IErrorResponse => 
(response as IErrorResponse).errors !== undefined;

export interface ITweet {
  id: number,
  text: string,
  entities: ({
    urls: { url: string }[],
    hashtags: {text: string }[]
  }),
  created_at: string,
  favorite_count: number,
  retweet_count: number,
  user: {
    screen_name: string,
    profile_image_url_https: string,
  }
}