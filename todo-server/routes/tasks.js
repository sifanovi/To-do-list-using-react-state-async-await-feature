var express = require("express");
var router = express.Router();
var DB = require("../models/index");
var tasks = DB.tasks;
var sequelize = DB.sequelize;
var statusCodes = require("http-status-codes");
var bodyParser = require("body-parser");
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

router.get("/", function (req, res) {
    return tasks.findAll().then(function (tasks) {
        res.send({data: tasks, message: "Task list found", status: statusCodes.OK});


    }).catch(function (err) {
        res.send({status:statusCodes.INTERNAL_SERVER_ERROR,message:err});
        console.error(err);
    });

});
router.get("/:id", function (req, res) {
    return tasks.findOne(
        {
            attributes: ["taskName", "taskDetails", "taskStatus"],
            where: {
                id: req.params.id
            }
        }
    ).then(function (tasks) {
        res.send({data: tasks, message: "Item Fetched", status: statusCodes.OK});

    }).catch(function (err) {
        res.send({status:statusCodes.INTERNAL_SERVER_ERROR,message:err});
        console.error(err);
    });
})

router.post("/:id", function (req, res) {

    req.body.updatedAt = new Date();

    return tasks.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(function (tasks) {
        res.send({data: tasks, message: "Task Updated", status: statusCodes.OK});

    }).catch(function (err) {
       res.send({status:statusCodes.INTERNAL_SERVER_ERROR,message:err});
        console.error(err);
    });

})
router.put("/:id", function (req, res) {
 req.body.updatedAt = new Date()
    return tasks.findOne({
        where: {
            id: req.params.id
        },
        raw:true,
    }).then(function (result) {
        console.log(result);
        if (result) {
            return tasks.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then(function (tasks) {

                res.send({data: tasks, message: "Task Updated", status: statusCodes.OK});

            }).catch(function (err) {
                res.send({status:statusCodes.INTERNAL_SERVER_ERROR,message:err})
                console.error(err);
            });
        }
    }).catch(function (err) {
        res.send({data:[],message:err,status:statusCodes.NOT_FOUND})
        console.error(err);
    });
});

router.post("/", function (req, res) {

    req.body.createdAt = new Date();

    tasks.create(req.body).then(function (tasks) {
        res.send({data: tasks, message: "Task Created", status: statusCodes.CREATED});


    }).catch(function (err) {
        res.send({data:[],message:err,status:statusCodes.INTERNAL_SERVER_ERROR})
        console.error(err);
    });

});

router.delete("/:id", function (req, res) {

    req.body.createdAt = new Date();

    tasks.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (tasks) {
        res.send({data: tasks, message: "Task deleted", status: statusCodes.OK});


    }).catch(function (err) {
        res.send({data:[],message:err,status:statusCodes.INTERNAL_SERVER_ERROR})
        console.log(err);
    });

});

module.exports = router;
