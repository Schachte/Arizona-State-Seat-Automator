import BaseController from '../controllers/base.controller';
import Constants from '../config/constants';
import Logger from '../lib/logger';

let express = require('express');
let router = express.Router();

class ClassAPI extends BaseController {

  /**
   * Adds the class to the currently selected user within the system
   */
  addClass(req, res) {
    Logger.debug(JSON.stringify(req.body));

    Logger.debug(req.body.classNumber);
    Logger.debug('ClassNAME ' + req.body.className);
    // Insert class into the classes table if it doesn't exist
    Constants.connections.query(`INSERT INTO classes (class_number, class_name) VALUES (${req.body.classNumber}, "${req.body.className}")
      ON DUPLICATE KEY UPDATE class_number=class_number;`, (error, results, fields) => {
        if (error) {
          Logger.error('SQL Error' + error); return res.json('Class already added, try again...');
        } else {
          Logger.debug(results);
        }
      });

    // Add the class into the composite table for the user
    Constants.connections.query(`INSERT INTO studentClasses(email,class_number,reserved,paid) 
      VALUES ("${req.body.email}",${req.body.classNumber}, ${req.body.reservedStatus}, 1);`, (error, results, fields) => {
        if (error) {
          Logger.error('SQL Error' + error); return res.json('Class already added, try again.');
        } else {
          Logger.debug(results); return res.json({ 'Classes': results })
            ;
        }
      });
  }

  // Gets all the currently associated classes for a particular user within the system
  getClasses(req, res) {
    // Check if a user is authenticated
    // TODO: Check auth information

    // This hardcoded user should not exist within the system
    let hardcodedUser = 'code@asu.edu';

    // This query is responsible for retrieving only the class information giving the username of a particular authenticated user
    Constants.connections.query(`
      SELECT classes.professor, classes.class_number, classes.total_seats, classes.available_seats, classes.class_name 
      FROM classes
      left join studentClasses on studentClasses.class_number=classes.class_number
      WHERE studentClasses.email="${hardcodedUser}";`, (error, results, fields) => {
        if (error) {
          Logger.error('SQL Error' + error); return error;
        } else {
          Logger.debug(results); res.json(results);
        }
      });
  }
}

export default new ClassAPI();
