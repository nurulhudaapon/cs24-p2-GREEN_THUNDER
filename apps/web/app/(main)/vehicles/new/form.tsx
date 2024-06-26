"use client";
import React, { FormEventHandler, useState } from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import { createVehicle } from "../server";
import { notify } from "@/components/toast";
import { Select } from "@/components/select";
import Button from "@/components/button";
import Input from "@/components/input";

const now = new Date();
type VehicleProps = {
  currentUserId: string;
  Sts: Entity.sts[];
};

const NewVehicleEntry = ({ currentUserId, Sts }: VehicleProps) => {
  const [loading, setLoading] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Entity.vehicle>({
    id: uuid(),
    sts_id: "",
    number: "",
    type: "open_truck",
    capacity: "three_ton",
    loaded_cost: 0,
    unloaded_cost: 0,
    created_at: now,
    updated_at: now,
    created_by_user_id: currentUserId,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log({ newVehicleInfo: newVehicle }); // Add this line to see the newVehicle object

    createVehicle(newVehicle)
      .then(() => {
        setLoading(false);
        notify.success("STS added successfully!");
      })
      .catch((e) => {
        setLoading(false);
        notify.error("Failed to add STS and Manager ID is invalid!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h1 className="text-xl text-center font-bold my-4">Add A New Vehicle</h1>
      <div>
        <div className="mb-4">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Vehicle Number
          </label>
          <Input
            placeholder="F11243"
            name="number"
            type="text"
            required
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, number: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="loaded_cost"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fuel Cost Per KM
          </label>
          <Input
            placeholder="For Fully Loaded"
            type="number"
            name="loaded_cost"
            required
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, loaded_cost: +e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="unloaded_cost"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fuel Cost Per KM
          </label>
          <Input
            placeholder="For Empty Loaded"
            type="number"
            name="unloaded_cost"
            required
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, unloaded_cost: +e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex flex-row gap-4">
          <div className="w-full">
            <label
              htmlFor="Capacity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Capacity in tons
            </label>
            <Select
              name="capacity"
              className="w-full"
              options={[
                { value: "three_ton", label: "3 Ton" },
                { value: "five_ton", label: "5 Ton" },
                { value: "seven_ton", label: "7 Ton" },
                { value: "fifteen_ton", label: "15 Ton" },
              ]}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  capacity: e.target.value as Entity.vehicle_capacity,
                })
              }
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Vehicle Type
            </label>
            <Select
              name="type"
              className="w-full"
              options={[
                { value: "open_truck", label: "Open Truck" },
                { value: "dump_truck", label: "Dump Truck" },
                { value: "compactor", label: "Compactor" },
                { value: "container_carrier", label: "Container Carrier" },
              ]}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  type: e.target.value as Entity.vehicle_type,
                })
              }
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select STS
          </label>
          <Select
            name="sts_id"
            className="w-full"
            options={Sts.map((sts) => ({
              value: sts.id,
              label: `Ward Number ${sts.ward_number} (${sts.capacity_tonnes} Ton)`,
            }))}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                sts_id: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Button loading={loading} className="w-[100%]" type="submit">
          Add Vehicle
        </Button>
      </div>
    </form>
  );
};

export default NewVehicleEntry;
