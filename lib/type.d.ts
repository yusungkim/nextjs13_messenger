export type Message = {
  id: string
  message: string
  created_at: number
  username: string
  profilePic: string
  email: string
}

export type ApiResponse = {
  ok: boolean
  [key: string]: any
}