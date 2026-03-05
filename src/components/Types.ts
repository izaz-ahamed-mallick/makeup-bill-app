export type Bill = {
  id: number
  created_at?: string

  name?: string
  address?: string
  phone?: string

  date?: string
  time?: string

  service?: string
  makeup_type?: string

  total_package?: number
  discount?: number
  advanced?: number
  due?: number

  payment_mode?: string
  terms?: string

  confirmation_date?: string
  signature?: string

  full_payment?: boolean
}
