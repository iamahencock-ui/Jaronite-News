// Local-dev helper: generate a staff user row with a correctly-hashed
// password (PBKDF2, 100k iterations, SHA-256) matching index.js's
// hashPassword(), and write it to seed-user.sql.
//
// Usage:
//   node seed-local-user.mjs <username> <password> <role>
//   node seed-local-user.mjs admin "MyPassword123" admin
// Then:
//   npx wrangler d1 execute jaronite-news-db --local --file=./seed-user.sql
//
// role must be one of: writer | editor | admin
import { webcrypto as crypto } from "node:crypto";
import { writeFileSync } from "node:fs";

const username = process.argv[2] || "admin";
const password = process.argv[3] || "admin1234";
const role = process.argv[4] || "admin";

if (!["writer", "editor", "admin"].includes(role)) {
  console.error(`Invalid role "${role}" — must be writer, editor, or admin.`);
  process.exit(1);
}

const bufToHex = (buf) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16)).buffer;
const keyMaterial = await crypto.subtle.importKey(
  "raw",
  enc.encode(password),
  "PBKDF2",
  false,
  ["deriveBits"]
);
const bits = await crypto.subtle.deriveBits(
  { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
  keyMaterial,
  256
);

const hash = bufToHex(bits);
const saltHex = bufToHex(salt);

// Escape single quotes in the username for safe SQL embedding.
const u = username.replace(/'/g, "''");
const sql =
  `INSERT INTO users (username, password, password_salt, role, status, created_at)\n` +
  `VALUES ('${u}', '${hash}', '${saltHex}', '${role}', 'active', CURRENT_TIMESTAMP);\n`;

writeFileSync("seed-user.sql", sql);
console.log(`Wrote seed-user.sql for user "${username}" (role: ${role}).`);
console.log(`Now run:`);
console.log(`  npx wrangler d1 execute jaronite-news-db --local --file=./seed-user.sql`);
console.log(`Then log in with username "${username}" and the password you chose.`);
