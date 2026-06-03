import { Temporal } from "@js-temporal/polyfill";
export type ApiResponse<T> =
| { status: "loading" }
| { status: "success"; data: T; fetchedAt: Temporal.Instant }
| { status: "error"; message: string; statusCode: number };

export function renderResponse<T>(
  response: ApiResponse<T>,
  formatter: (data: T) => string,
): string {
  switch (response.status) {
    case "loading":
      return "Loading...";

    case "success":
      // Pass the generic data to the formatter callback function
      return formatter(response.data);

    case "error":
      // Return a string containing both the statusCode and the message
      return `Error ${response.statusCode}: ${response.message}`;

    default: {
      // Safety net ensuring all 3 states defined in image_94dc83.png are covered
      const _check: never = response;
      throw new Error(`unhandled status: ${JSON.stringify(_check)}`);
    }
  }
}


