import dotenv from "dotenv";
dotenv.config();

const currentEnv = process.env.NODE_ENV;

console.log(currentEnv);

let baseURL;

switch (currentEnv) {
    case "development":
        baseURL = "http://localhost:8000/";
        break;
    case "production":
        baseURL = "";
        break;
    default:
        break;
}

export default baseURL;
