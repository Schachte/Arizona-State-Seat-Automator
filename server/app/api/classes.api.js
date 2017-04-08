import BaseController from '../controllers/base.controller';
import Constants from '../config/constants';
import Logger from '../lib/logger';

let express = require("express");
let router = express.Router();

class ClassAPI extends BaseController {
  
  addClass(req, res) {
    
    //Insert class into the classes table if it doesn't exist
    Constants.connections.query(`INSERT INTO classes (class_number) VALUES (${req.body.classNumber})
      ON DUPLICATE KEY UPDATE class_number=class_number;`, (error,results,fields) => {
      if (error) {Logger.error('SQL Error' + error); res.json("Class already added, try again.")}
      else {Logger.debug(results);}
    })
    
    //Add the class into the composite table for the user
    Constants.connections.query(`INSERT INTO studentClasses(email,class_number,reserved,paid) 
      VALUES ("${req.body.email}",${req.body.classNumber}, ${req.body.reservedStatus}, 1);`, (error,results,fields) => {
      if (error) {Logger.error('SQL Error' + error); res.json("Class already added, try again.")}
      else {Logger.debug(results); res.json({"Classes": results})}
    })
  }
  
  getClasses(req, res) {
    
    //Check if a user is authenticated
    // TODO: Check auth information
  
    let hardcodedUser = "code@asu.edu"
    
    Constants.connections.query(`Select * from UserClasses WHERE email="${hardcodedUser}"`, (error,results,fields) => {
      if (error) {Logger.error('SQL Error' + error); return error}
      else {Logger.debug(results); res.json({"Classes": results})}
    })
	}
}

export default new ClassAPI();
