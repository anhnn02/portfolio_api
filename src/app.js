// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import morgan from 'morgan';
import mongoose from 'mongoose';
// @ts-ignore
import mongodb, { MongoClient } from 'mongodb';
// @ts-ignore
import { readdirSync } from 'fs';
// @ts-ignore
import path, { dirname } from 'path';
import routerProject from './routes/project';

// @ts-ignore
import swaggerUI from 'swagger-ui-express';
// @ts-ignore
import YAML from 'yamljs';

import categoryRoute from './routes/category'



// @ts-ignore
const app = express();
const swaggerJSDocs = YAML.load("./api.yaml")

//middleware
// @ts-ignore
app.use(cors());
// @ts-ignore
app.use(morgan("tiny"));
// @ts-ignore
app.use(express.json());

//routes
app.use("/api", routerProject);
app.use("/api", categoryRoute);
// app.use("/api", bannerRoute);
// app.use("/api", voucherRoute);
// app.use("/api", routerAuth);
// app.use("/api", routerUser);
// app.use("/api", routerInvoice);
// app.use("/api", routerInvoiceDetail);
// app.use("/api", voucher);
// @ts-ignore
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))

// connection db
const mongoAtlasUri = "mongodb+srv://anhnn02:nextjs123@nhom1-nextjs.akbbnsm.mongodb.net/portfolio?retryWrites=true&w=majority"

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        // @ts-ignore
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose đã được kết nối")
    );
} catch (e) {
    console.log("Không thể kết nối");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Kết nối thất bại ${ err }`));
dbConnection.once("open", () => console.log("Kết nối thành công đến DB!"));

//connect
const PORT = 3001;
// @ts-ignore
app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running on PORT ", process.env.PORT || PORT);
})