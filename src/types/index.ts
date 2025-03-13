export type Pagination<T> = {
  data: T[]
  page: number
  pageSize: number
  totalPage: number
}
