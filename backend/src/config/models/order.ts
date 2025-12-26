import { Schema, model } from "mongoose";
import { Order, Status } from "../../types/enum";

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  status: { type: String, enum: [Status.PENDING, Status.DONE], default: Status.PENDING }
});

const OrderSchema = new Schema(
  {
    lab: { type: String, required: true },
    patient: { type: String, required: true },
    customer: { type: String, required: true },

    state: {
      type: String,
      enum: [Order.CREATED, Order.ANALYSIS, Order.COMPLETED],
      default: Order.CREATED,
    },

    status: {
      type: String,
      enum: [Status.ACTIVE, Status.DELETED],
      default: Status.ACTIVE
    },

    services: {
      type: [ServiceSchema],
      required: true,
      validate: (services: any[]) => services.length > 0
    }
  },
  { timestamps: true }
);

export const OrderModel = model("Order", OrderSchema);
