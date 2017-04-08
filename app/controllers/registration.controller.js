import BaseController from './base.controller';


class RegistrationController extends BaseController {
  index(req, res) {
    if (req.session.tk != undefined) {
      res.redirect('/', {});
    } else {
      res.render('register', { layout: 'register.hbs' });
    }
  }
}

export default new RegistrationController();
