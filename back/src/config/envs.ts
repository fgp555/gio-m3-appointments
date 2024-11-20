import "dotenv/config";

export const USER = process.env.USER;
export const PASSAPP = process.env.PASSAPP;

export const DROPSCHEMA: boolean = process.env.DROPSCHEMA === "true";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_NAME: string = process.env.DB_NAME || "postgres";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "admin";
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;
export const DB_TYPE: any = process.env.DB_TYPE || "postgres";
export const DB_USER: string = process.env.DB_USER || "postgres";
export const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET";
export const PORT: number = Number(process.env.PORT) || 3000;

console.log("Database type: ", process.env.DB_TYPE);
console.log("process.env.DROPSCHEMA", process.env.DROPSCHEMA);

