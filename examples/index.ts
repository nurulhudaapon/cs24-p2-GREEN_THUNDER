import { EcosyncDbClient } from "@ecosync/client";
import { EcosyncDatabase } from "@ecosync/db";

const db = new EcosyncDatabase();
const client = new EcosyncDbClient({ db });

const users = client.user.getAll();
