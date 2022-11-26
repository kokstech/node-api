import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost: ${process.env.PORT}`);
});
