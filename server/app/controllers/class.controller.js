import BaseController from './base.controller';
import User from '../models/user';
import Logger from '../lib/logger';

var request = require('request');
var cheerio = require('cheerio');

var options = {
  url: '',
  headers: {
    "method":"GET",
    "scheme":"https",
    'content-encoding': 'gzip',
    "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "accept-language":"en-US,en;q=0.8",
    "cache-control":"no-cache",
    "cookie":'JSESSIONID=javaprod18~13F6AAE14A38E8578E37027CB2D42141.catalog18; onlineCampusSelection=C; __utmt=1; ASUWEBAUTH=ST-18030-NlDUK2NscVmdgfssORWv-06_62f3114d-ca4e-43f2-a6b2-fbf47a544f0a', "pragma":"no-cache", "referer":"https://webapp4.asu.edu/catalog/", "upgrade-insecure-requests":"1",
    "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
  }
};

// TODO: Make this not global and work fluidly within the async calls
let globalRes = '';
let BASE_URI = `https://webapp4.asu.edu/catalog/course?r=`

/****************************************************************
 * Handles the entire class querying logic from the ASU servers *
 ****************************************************************/
class ClassController {
  
    /**
     * Get the className given a valid classNumber
     */
    async runClassScrape(req, res) {
      
      //Get the URL updated within the options object
      options.url = BASE_URI+req.params.classNumber;
      
      //Attempt to successfully scrape the name from ASU server
      request(options, function (error, reso, body) {
        if (!error && res.statusCode == 200) {
            let $ = cheerio.load(body);
            let className = $('.crs-title').text().trim();
            
            if (className === "") {
              res.json("Class not found");
            } else {
              res.json($('.crs-title').text().trim());
            }
        } else {
            res.json("Sorry, but there has been an interval server error");
        }
      });
    }
}

export default new ClassController();
