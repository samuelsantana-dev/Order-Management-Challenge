import { OrderState, Status } from "../enum/order";

export type OrderListParams = {
  query?: any;
  page: number;
  limit: number;
  state?: string;
};

export type OrderType = {
  _id?: string;
  lab?: string;
  patient?: string;
  customer?: string;
  state?: OrderState;
  status?: Status;
  services?: OrderServiceItem[];
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrderServiceItem = {
  _id?: string;
  name?: string;
  value?: number;
  status?: Status;
};
