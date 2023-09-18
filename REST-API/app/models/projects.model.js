//Import the connection to the database
const db = require("./db");


//Defined the project model
const Project = function(project) {
  this.id = project.id;
  this.projectname = project.projectname;
  this.projectdesc = project.projectdesc;
  this.startdate = project.startdate;
  this.enddate = project.enddate;

};


//Retrieve all projects
Project.getAll = result => {
    //send the query for all projects through the db connection
    db.query("select * from projects", (err,res) =>{
      //if theres an error write it to the console and return it
      if(err) {
        console.log("Error:", err);
        result(null,err);
        return;
      }
      //otherwise return the projects 
      console.log("projects:", res);
      result(null,res);
    });
};


//Create Projects
Project.create = (newProject, result) => {
  //send the query for inserting projects through the db connection
  db.query("insert into projects set ?", newProject, (err, res) =>{
    //if theres an error write it to the console and return it
    if(err){
      console.log("Error:", err);
      result(err, null);
      return;
    }
    //otherwise return the id and other details of the project inserted
    console.log("Created project:", {id: res.insertId, ...newProject});
    result(null, { id: res.insertId, ...newProject });
  });
};


//Retrieve projects by id
Project.getById = (id, result) => {
  //send the query for getting projects by id,  through the db connection
  db.query("select * from projects where id = ?",[id], (err, res) => {
    //if theres an error write it to the console and return it
    if(err){
      console.log("Error:", err);
      result(err, null);
      return;
    }
    //if res array is greater than zero(project is found) return the project and write it to the console
    if(res.length){
      console.log("Project was retrieved", res[0]);
      result(null, res[0]);
    }
    //otherwise return a message for it not being found
    else{
      console.log("Project wasn't retrieved");
      result({message: "Project wasn't retrieved"}, null)
    }
  });
};



//Retrieve projects by project name
Project.getByName = (name, result) => {
  //send the query for getting projects by name,  through the db connection
  db.query("select * from projects where projectname = ?",[name], (err, res) => {
    //if theres an error write it to the console and return it
    if(err){
      console.log("Error:", err);
      result(err, null);
      return;
    }
    //if res array is greater than zero(project is found) return the project and write it to the console
    if(res.length){
      console.log("Project was retreived", res[0]);
      result(null, res[0]);
    }
    //otherwise return a message for it not being found
    else{
      console.log("Project wasn't retrieved");
      result({message: "Project wasn't retrieved"}, null)
    }
  });
};


//Update projects by id
Project.updateById = (id, changedProject, result) => {
  //send the query for updating a project by id,  through the db connection
  db.query("update projects set projectname= ?, projectdesc = ?, startdate = ?, enddate = ? where id = ?",
  [changedProject.projectname, changedProject.projectdesc, changedProject.startdate, changedProject.enddate, id],(err, res) => {
    //if theres an error write it to the console and return it
    if(err){
      console.log("Error:", err);
      result(err,null);
      return;
    }
    //if no project is found return an error message
    if(res.affectedRows === 0){
      result({message: "Project not found" }, null);
      return;
    }
    //if successfully updated return the changedProject and write it to the console
    console.log("Project updated: ", {id: id, ...changedProject});
    result(null, {id: id, ...changedProject});
  });
};


//Delete projects by id
Project.deleteById = (id, result) => {
  //send the query for deleting a project by id,  through the db connection
  db.query("delete from projects where id = ?", [id],(err, res) => {
    //if theres an error write it to the console and return it
    if(err){
      console.log("Error:", err);
      result(err,null);
      return;
    }
    //if no project is found return an error message
    if(res.affectedRows === 0){
      result({message: "Project not found" }, null);
      return;
    }
    //if successfully deleted return the projects id and write to the console
    console.log("Project deleted id was: ", id);
    result(null, {id: id});
  });
};


//Delete All Projects
Project.deleteAll= (result) => {
  //send the query for deleting all projects,  through the db connection
  db.query("delete from projects",(err, res) => {
    //if theres an error write it to the console and return it
    if(err){
      console.log("Error:", err);
      result(err,null);
      return;
    }
    //if successfully deleted return the result and write that all projects where deleted to the console
    console.log("All projects were deleted");
    result(null, res);
  });
};

//export the project
module.exports = Project;