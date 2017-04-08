import BaseController from './base.controller';
import Constants from '../config/constants';
import Logger from '../lib/logger';

let express = require("express");
let router = express.Router();


class MetaController extends BaseController {
  index(req, res) {
    //If the user isn't authenticated
    if (req.session.tk==undefined){
      res.render('login', {layout: "login.hbs"})
    } else{
      //Log user into dashboard
      res.render('layouts/dashboard', {})
    }
	}
}

export default new MetaController();
