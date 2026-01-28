import "./drills";
import "./week1/drills";

const express = require('express');
const app = express();

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});