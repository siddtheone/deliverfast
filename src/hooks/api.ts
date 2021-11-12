import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateParcelPayload, Parcel } from "types";
import { httpAuth } from "utils/http";

export const createParcel = (data: CreateParcelPayload) =>
  httpAuth().post("createParcel", data);

export const useCreateParcel = () => {
  const queryClient = useQueryClient();
  return useMutation(createParcel, {
    onSuccess: () => queryClient.invalidateQueries("parcels"),
  });
};

export const getParcels = (path: string) => () =>
  httpAuth()
    .get(path)
    .then((res) => res.data);

export const useGetParcels = (userId: string) => {
  return useQuery<Parcel[]>("parcels", getParcels(`parcels/${userId}`));
};

export const getBikersParcels = (path: string) => () =>
  httpAuth()
    .get(path)
    .then((res) => res.data);

export const useGetBikersParcels = (userId: string) => {
  return useQuery<Parcel[]>(
    "bikersParcels",
    getBikersParcels(`bikersParcels/${userId}`)
  );
};

export const updateParcel = (data: Partial<Parcel>) =>
  httpAuth().put("updateParcel", data);

export const useUpdateParcel = () => {
  const queryClient = useQueryClient();
  return useMutation(updateParcel, {
    onSuccess: () => queryClient.invalidateQueries("bikersParcels"),
  });
};
