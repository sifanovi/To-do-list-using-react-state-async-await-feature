'use strict';

var express=require("express");
var router=express.Router();

router.use("/tasks", require("./tasks"));

module.exports = router;
