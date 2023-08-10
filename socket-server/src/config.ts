import * as dotenv from "dotenv";

export default function configInit() {
  dotenv.config({ path: "../.env" });
}

// "dev": "tsc-watch --onSuccess \"node -r dotenv/config . dotenv_config_path=../.env\" "
