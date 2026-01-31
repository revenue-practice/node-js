import "./generics/generics";
import "./week1/day1/drills";
import "./week1/day2/drills";
import "./week1/day3/cli";
import express from "express";

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});
