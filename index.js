const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
process.env.TEST = true;

let serverPort = process.env.PORT || 5000;

/* Start the server on port 5000 */
app.listen(serverPort, function () {
    console.log(`Your app is ready at port ${serverPort}`);
});