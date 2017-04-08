import BaseController from '../controllers/base.controller';
import Constants from '../config/constants';
import Logger from '../lib/logger';

let express = require("express");
let router = express.Router();

class ClassAPI extends BaseController {
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
