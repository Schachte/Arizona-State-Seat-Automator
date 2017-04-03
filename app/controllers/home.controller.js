import BaseController from './base.controller';
import Constants from '../config/constants';

let express = require("express");
let router = express.Router();


class HomeController extends BaseController {
  index(req, res) {
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
