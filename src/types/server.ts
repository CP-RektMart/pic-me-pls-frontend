export interface ServerActionResponse<T> {
  data: T
  message?: string
  error?: string
}
