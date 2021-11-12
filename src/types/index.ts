export interface User {
  user: {
    iat: number;
    type: "biker" | "sender";
    username: string;
    id: string;
  };
}

export interface CreateParcelPayload {
  name: string;
  pickup: string;
  dropoff: string;
  createdTime: Date | string;
}

export interface Parcel extends CreateParcelPayload {
  senderId: string;
  bikerId: string | null;
  id: string;
  status: "CREATED" | "PICKUP" | "DROPOFF";
  pickUpTime: string | null;
  dropOffTime: string | null;
  createdTime: string;
}

export type UpdateParcelPayload =
  | Pick<Parcel, "pickUpTime">
  | Pick<Parcel, "dropOffTime">;
