import BaseController from './base.controller';
import User from '../models/user';
import Logger from '../lib/logger';

var request = require('request');
var cheerio = require('cheerio');

var options = {
  url: '',
  headers: {
    "method":"GET",
    "path":"",
    "scheme":"https",
    'content-encoding': 'gzip',
    "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "accept-language":"en-US,en;q=0.8",
    "cache-control":"no-cache",
    "cookie":'JSESSIONID=javaprod10~3DD09AD2735CB729920A6DF7FFADA809.catalog10; onlineCampusSelection=C; __cfduid=d9c8f7cb9db61be61ee5e798a98ce7a621490417730; _st_bid=8acaf580-1275-11e7-a594-ef15f3d2e149; _gaRollUp=GA1.2.675165316.1490417732;',
    "pragma":"no-cache",
    "referer":"https://webapp4.asu.edu/catalog/",
    "upgrade-insecure-requests":"1",
    "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
  }
};

// TODO: Make this not global and work fluidly within the async calls
let classData = '';

/**
 * Handles the entire class querying logic from the ASU servers
 */
class ClassController extends BaseController {
  
  async getClassName(req, res) {
    let classRunner = await classSearch(req.params.classNumber, res)
    Logger.debug(classData);
    res.json(classData)
	}
}

/**
 * Parses the req body html
 * @param  {[type]}  error    [errors vals]
 * @param  {[type]}  response [res data]
 * @param  {[type]}  body     [html body of asu page]
 * @return {Promise}          [wait to complete]
 */
async function evalClassNameHTML(error, response, body) {
    let $ = cheerio.load(body);
    $('a#ExternalLink').each( function  () {
       classData = $(this).text().trim();
    });
    return;
}

/**
 * search for the class off the base URI
 * @param  {[type]}  CLASS_NO [description]
 * @param  {[type]}  res      [description]
 * @return {Promise}          [description]
 */
async function classSearch(CLASS_NO, res) {
  options.url  = `https://webapp4.asu.edu/catalog/classlist?k=${CLASS_NO}&t=2177&e=all&hon=F&promod=F`;
  options.headers.path = `/catalog/classlist?k=${CLASS_NO}&t=2177&e=all&hon=F&promod=F`;

  return await request(options, evalClassNameHTML);
}

export default new ClassController();
