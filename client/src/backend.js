import dotenv from "dotenv";
dotenv.config();

const currentEnv = process.env.NODE_ENV;

console.log(currentEnv);

let baseURL;

switch (currentEnv) {
    case "development":
        baseURL = "http://localhost:8000/api/";
        break;
    case "production":
        baseURL = "api/";
        break;
    default:
        break;
}

export default baseURL;
