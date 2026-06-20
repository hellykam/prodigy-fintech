export interface ApiResponse<T> {
  data: T
  success: true
}

export interface ApiError {
  success: false
  error: string
  code: string
  statusCode: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
