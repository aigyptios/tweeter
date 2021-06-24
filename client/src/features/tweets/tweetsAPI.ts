import { IAPIResponse } from "../../types";

export function fetchTweets(q: string): Promise<IAPIResponse> {

  return fetch(`tweets?q=${q.trim()}&result_type=popular&count=5`)
    .then(data => data.json())

}

export function fetchMore(nextQuery: string) {
  return fetch(`tweets${nextQuery}`)
  .then(data => data.json())
}