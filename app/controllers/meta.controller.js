import BaseController from './base.controller';
import Constants from '../config/constants';

let express = require("express");
let router = express.Router();


class MetaController extends BaseController {
  index(req, res) {

    //IF the user isn't authenticated
    if (req.session.tk==undefined){
      res.render('login', {layout: "login.hbs"})
    } else{
      
      //Log user into dashboard
      res.render('layouts/dashboard', {})
    }
	}
}

export default new MetaController();
