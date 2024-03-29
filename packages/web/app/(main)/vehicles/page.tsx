import Button from "@/components/button";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/chip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Toggle } from "@/components/toggle";
import { getAllVehicles } from "./server";

const tableHeaders = [
  "Vehicle Number",
  "Vehicle Type",
  "Capacity",
  "Fuel Cost - Fully Loaded",
  "Fuel Cost - Unloaded",
];

export default async function IndexPage() {
  const vehicles = await getAllVehicles();

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-lg font-bold">Manage Vehicles</p>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, idx) => (
              <TableHeader key={idx}>{header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle, idx) => (
            <TableRow key={idx}>
              <TableCell>{vehicle.number}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.capacity}</TableCell>
              <TableCell>{vehicle.loaded_cost} per km</TableCell>
              <TableCell>{vehicle.unloaded_cost} per km</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end my-4 gap-1">
        <button>
          <div className="bg-green-600 rounded-sm text-white">
            <ChevronLeft />
          </div>
        </button>
        <button>
          <div className="bg-green-600 rounded-sm text-white">
            <ChevronRight />
          </div>
        </button>
      </div>
    </div>
  );
}
