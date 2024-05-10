import { createDbClient } from "@ecosync/db/api";

const dbClient = createDbClient(process.env.DATABASE_API_URL, process.env.AUTH_JWT_SECRET);

// Test connection
test("dbClient;", async () => {
  const res = await dbClient.from('_prisma_migrations').select('*');

  expect(res).toBeTruthy();
});