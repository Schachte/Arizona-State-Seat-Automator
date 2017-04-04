import BaseController from './base.controller';
import Constants from '../config/constants';
import Logger from '../lib/logger';

let express = require("express");
let router = express.Router();


class HomeController extends BaseController {
  index(req, res) {
    
    Constants.connections.query(`Select * from Users WHERE username="schachte"`, (error,results,fields) => {
      if (error) {Logger.error('SQL Error' + error); return error}
      else {Logger.debug(results)}
    })
    
    if (req.session.tk != undefined) {
      res.render('dashboard', {})
    } else {
      res.redirect('/')
    }
	}
  
  settings(req, res) {
    if (req.session.tk != undefined) {
      res.render('settings', {'layout': "settings.hbs"})
    } else {
      res.redirect('/')
    }
  }
}

export default new HomeController();
