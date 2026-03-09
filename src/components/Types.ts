export type Bill = {
  id: number
  created_at?: string

  name?: string
  address?: string
  phone?: string

  date?: string
  time?: string

  services: {
    service: string;
    makeup_type: string;
    price: number | string;
    serviceDate: string;
    location: string;
    serviceTime: string;
    type?: "travel"
  }[];
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


export type ServiceItem = {
  service: string;
  makeup_type: string;
  price: string;
  serviceDate: string;
  location: string;
  serviceTime: string
  type?: "travel"
};

export type BillForm = {
  name: string;
  address: string;
  date: string;
  time: string;
  phone: string;
  services: ServiceItem[];
  total_package: string;
  discount: string;
  advanced: string;
  due: string;
  full_payment: boolean;
  payment_mode: string;
  terms: string;
  confirmation_date: string;
  signature: string;
};
