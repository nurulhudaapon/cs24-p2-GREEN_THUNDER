"use server";
import { dbClient } from "@/client";

export const getAllVehicles = async () => {
  return dbClient.vehicle.getAll();
};
export const getStss = async () => {
  return dbClient.sts.getAll();
};

export type VehiclesType = Awaited<ReturnType<typeof getAllVehicles>>;

export async function StsSelector() {
  return (
    <select name="sts_id">
      {(await dbClient.sts.getAll()).map((sts, idx) => (
        <option key={idx} value={sts.id}>
          {sts.ward_number} ({sts.capacity_tonnes} Ton)
        </option>
      ))}
    </select>
  );
}
