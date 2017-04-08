import BaseController from './base.controller';
import User from '../models/user';
import Logger from '../lib/logger';

class AuthController extends BaseController {
  
  login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.headers);
    
    try {
      const user = await User.findOne({ username });

      if (!user || !user.authenticate(password)) {
        return res.redirect("/")

      }
      req.session.tk = user.generateToken();;
      return res.redirect("/dashboard")

    } catch (err) {
      next(err);
    }
  }
  
  logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  }
  
}

export default new AuthController();
