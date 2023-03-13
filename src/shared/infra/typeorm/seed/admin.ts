import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";

import { createConnection, runQuery } from "@shared/infra/typeorm";

async function create() {
  const id = randomUUID();
  const password = await hash("admin", 8);

  await createConnection("localhost")
    .then(() => {
      console.log("Data Source initialized on admin.ts");
      runQuery(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', 'true', 'now()', '123321')`
      )
        .then(() => {
          "Successfully ran query";
        })
        .catch((err) => console.log("Error running query", err));
    })
    .catch((err) => {
      console.log("Failed to initialize Data Source on admin.ts", err);
    });
}

create().then(() => console.log("Created Admin User"));
