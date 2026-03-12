export interface AuthResponse {
  status: number
  statusDetail: string
  message: string
  data: {
    accessToken: string
    sessionTimeoutDateTime: string
  }
  timestamp: string
}
