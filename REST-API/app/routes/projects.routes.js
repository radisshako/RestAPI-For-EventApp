module.exports = app => {
  const projects = require("../controllers/projects.controller");

  //Retrieve all products with a get request
  //GET http://localhost:3000/projects
  app.get("/projects", projects.findAll);

  //Create a new product with a post request
  //POST http://localhost:3000/projects

  /*Request body in json 
        {
        "projectname": "TRT System",
        "projectdesc": "A project description ",
        "startdate": "2021-04-01 08:00",
        "enddate": "2021-04-30 09:00"
    }
  */
  app.post("/projects", projects.create);
  
  //Retrieve a product by its id, with a get request
  //GET http://localhost:3000/projects/1
  app.get("/projects/:id", projects.findById);

  //Retrieve a product by its name, with a get request
  //GET http://localhost:3000/projects/name/CRM%20System
  app.get("/projects/name/:name", projects.findByName);

  //Update a project by its id with a put request
  //PUT http://localhost:3000/projects/1

  /* request body in json
        {
        "projectname": "Garage Sale application",
        "projectdesc": "Is a garage sale application",
        "startdate": "2021-04-01 08:00",
        "enddate": "2021-04-30 09:00"
        }
  */
  app.put("/projects/:id", projects.update);

  //Delete a project by its id with a delete request
  //DELETE http://localhost:3000/projects/1
  app.delete("/projects/:id", projects.deleteSome);

  //Delete all projects with a delete request
  //DELETE http://localhost:3000/projects
  app.delete("/projects", projects.deleteEntire);
}