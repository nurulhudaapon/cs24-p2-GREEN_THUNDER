import * as Entity from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

const now = new Date();

const password = bcrypt.hashSync("password", 10);

//======== Initial Data ========

const role: Entity.role[] = [
  {
    id: uuid(),
    slug: "admin",
    title: "Admin",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "sts_manager",
    title: "STS Manager",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "landfill_manager",
    title: "Landfill Manager",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "unassigned",
    title: "Unassigned",
    created_at: now,
    updated_at: now,
  },
];

const permission: Entity.permission[] = [
  {
    id: uuid(),
    slug: "manage_users",
    title: "Manage Users",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "manage_roles",
    title: "Manage Roles",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "manage_vehicles",
    title: "Manage Vehicles",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "manage_sts",
    title: "Manage STS",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "manage_landfill",
    title: "Manage Landfill",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "view_monitor",
    title: "View Monitor",
    created_at: now,
    updated_at: now,
  },
];

const role_permission: Entity.role_permission[] = permission.map(
  (permission) => {
    return {
      id: uuid(),
      role_id: role[0].id,
      permission_id: permission.id,
      created_at: now,
      updated_at: now,
    };
  }
);

const user: Entity.user[] = [
  {
    id: uuid(),
    email: "admin@ecosync.gov.bd",
    phone: "+8801000000000",
    first_name: "Default",
    last_name: "Admin",
    state: "active",
    password: password,
    created_at: now,
    updated_at: now,
    last_login_at: null,
    role_id: role[0].id,
  },
  {
    id: uuid(),
    email: "sts.manager@ecosync.gov.bd",
    phone: "+8801000000000",
    first_name: "STS",
    last_name: "Manager",
    state: "active",
    password: password,
    created_at: now,
    updated_at: now,
    last_login_at: null,
    role_id: role[1].id,
  },
  {
    id: uuid(),
    email: "landfill.manager@ecosync.gov.bd",
    phone: "+8801000000000",
    first_name: "Landfill",
    last_name: "Manager",
    state: "active",
    password: password,
    created_at: now,
    updated_at: now,
    last_login_at: null,
    role_id: role[2].id,
  },
];

const sts: Entity.sts[] = [
  {
    id: uuid(),
    name: 'Gausia',
    manager_id: user[1].id,
    capacity_tonnes: 3000,
    created_by_user_id: user[0].id,
    latitude: 3243.334,
    longitude: 343.343,
    ward_number: "10",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    name: 'Kuril',
    manager_id: user[1].id,
    capacity_tonnes: 3000,
    created_by_user_id: user[0].id,
    latitude: 12121.334,
    longitude: 1212.343,
    ward_number: "11",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    name: 'Kanchan',
    manager_id: user[1].id,
    capacity_tonnes: 3000,
    created_by_user_id: user[0].id,
    latitude: 5656.334,
    longitude: 3445453.343,
    ward_number: "12",
    created_at: now,
    updated_at: now,
  },
];

const landfill: Entity.landfill[] = [
  {
    id: uuid(),
    name: 'DNCC',
    closes_at: "8:00",
    opens_at: "18:00",
    capacity_tonnes: 3000,
    created_by_user_id: user[0].id,
    latitude: 3243.334,
    longitude: 343.343,
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    name: 'DNSS',
    closes_at: "8:00",
    opens_at: "18:00",
    capacity_tonnes: 3000,
    created_by_user_id: user[0].id,
    latitude: 12121.334,
    longitude: 1212.343,
    created_at: now,
    updated_at: now,
  },
];

const vehicle: Entity.vehicle[] = [
  {
    id: uuid(),
    number: "1234",
    type: Entity.vehicle_type.open_truck,
    capacity: Entity.vehicle_capacity.three_ton,
    loaded_cost: 10,
    unloaded_cost: 50,
    created_by_user_id: user[0].id,
    created_at: now,
    updated_at: now,
    sts_id: sts[0].id,
  },
  {
    id: uuid(),
    number: "1235",
    type: Entity.vehicle_type.dump_truck,
    capacity: Entity.vehicle_capacity.five_ton,
    loaded_cost: 15,
    unloaded_cost: 10,
    created_by_user_id: user[0].id,
    created_at: now,
    updated_at: now,
    sts_id: sts[1].id,
  },
  {
    id: uuid(),
    number: "1236",
    type: Entity.vehicle_type.compactor,
    capacity: Entity.vehicle_capacity.seven_ton,
    loaded_cost: 20,
    unloaded_cost: 15,
    created_by_user_id: user[0].id,
    created_at: now,
    updated_at: now,
    sts_id: sts[2].id,
  },
];

export const InitData = {
  permission,
  role,
  role_permission,
  user,
  sts,
  landfill,
  vehicle,
};
