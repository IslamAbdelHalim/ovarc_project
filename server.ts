import app from "./src/index";

import dotenv from "dotenv";

import { connectToDB } from "./config/db";

(async () => {
    dotenv.config();

    const host = process.env.SERVER_HOST || "0.0.0.0";
    const port = Number(process.env.SERVER_PORT) || 8080;
    try {
        await connectToDB();

        app.listen(port, host, () =>
            console.log(`server is running On host ${host} listen on port ${port}`),
        );
    } catch (error) {
        console.log("faild to start server");
    }


})();
