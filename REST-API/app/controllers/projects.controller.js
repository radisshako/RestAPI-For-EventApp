const Project = require("../models/projects.model");
 

//find all projects
exports.findAll = (req, res) => {
    Project.getAll((err, data) => {
        //if an error occurs send a 500 status error
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred."
            });
        }
        //otherwise send 200 status with the data
        else {
            res.status(200).send(data);
        }
    });
};

//create a new project
exports.create = (req, res) => {
    //if the request body is empty send a 400 status error with a message
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const project = new Project({
        //id: req.body.id,
        projectname: req.body.projectname,
        projectdesc: req.body.projectdesc,
        startdate: req.body.startdate,
        enddate: req.body.enddate
    });

    Project.create(project, (err, data) => {
        //if an error occurs while creating the project send a 500 status error with a message
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating"
            });
        }
        //otherwise send a 200 status message with the data
        else{
            res.status(200).send(data);
        } 
    });
};

//find a project by id
exports.findById = (req, res) =>{
    //get the id from the request
    const idValue = req.params.id;

    Project.getById(idValue, (err, data) => {
        //if an error occurs when retrieving the project send a 500 status error with a message
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving the project"
            });
        }
        else{
            //if the project was found send a 200 status with the data
            if(data){
                res.status(200).send(data);
            }
            //if the project wasnt found send a 404 not found error with a message
            else{
                res.status(404).send({ message: "This project wasn't found"});
            }
        }
    });
};

//find a project by name
exports.findByName = (req, res) =>{
    //get the name from the request
    const name = req.params.name;
    
    Project.getByName(name, (err, data) => {
        //if an error occurs when retrieving the project send a 500 status error with a message
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving the project"
            });
        }
        else{
            //if the project was found send a 200 status with the data
            if(data){
                res.status(200).send(data);
            }
            //if the project wasnt found send a 404 not found error with a message
            else{
                res.status(404).send({ message: "This project wasn't found"});
            }
        }
    });
};

//update a project by id
exports.update = (req, res) =>{
    //get the id from the request
    const id = req.params.id;
    //create a new project with the updated details
    const changedProject = {
        projectname: req.body.projectname,
        projectdesc: req.body.projectdesc,
        startdate: req.body.startdate,
        enddate: req.body.enddate
    }

    //updates by calling the updateByIdMethod with the parameters given
    Project.updateById(id, changedProject, (err, data) => {
        if(err){
            //if the project is not found send a 404 not found error
            if(err.message === "Project not found"){
                res.status(404).send({
                    message: "Project  not found"
                });
            }
            //if an error occurs when updating send a 400 error for a bad request
            else{
                res.status(400).send({
                    message:
                    err.message || "Some error occurred(Bad Request) while updating the project"
                });
            }
        }
        //if the project is updated send a 204 status with the data
        else{
            res.status(204).send(data);
        }
    });
};

//delete a project by id
exports.deleteSome = (req, res) =>{
    //get the id from the request
    const id = req.params.id;

    //deletes a project by calling the deleteById with the id given
    Project.deleteById(id, (err, data) => {
        if(err){
            //if the project isnt found send a 404 not found error
            if(err.message === "Project not found"){
                res.status(404).send({
                    message: "Project  not found"
                });
            }
            //if an error occurs when deleting send a 400 bad request status error
            else{
                res.status(400).send({
                    message:
                    err.message || "Some error occurred(Bad Request) while deleting the project"
                });
            }
        }
        //if the project was deleted send a 200 status with a message
        else{
            res.status(200).send({message: "The project was deleted"});
        }
    });
};

//delete all projects
exports.deleteEntire = (req, res) =>{

    //delete all projects by calling the deleteAll method
    Project.deleteAll((err, data) => {
        //if an error occurs when deleting the projects send a 500 status error with a message
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while deleting the projects"
            });
        }
        else{
            //if there was a change in the database, something was deleted. Send 200 status with a message
            if(data.affectedRows > 0){
                res.status(200).send({message: "All of the projects were deleted"});
            }
            //if not projects were changed nothing was deleted, send a 404 not found error with a message
            else{
                res.status(404).send({message: "No projects where found to be deleted"});
            }
        }
    });
};
