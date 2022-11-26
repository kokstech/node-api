import * as dotenv from "dotenv";
dotenv.config();
import config from "./config/index";
import app from "./server";

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost: ${config.port}`);
});
