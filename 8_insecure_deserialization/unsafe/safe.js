const express = require("express")
const jsyaml = require("js-yaml");

const app = express();

app.get("load", function(req, res) {
    let data = jsyaml.safeLoad(req.params.data);
    console.log(data)
});