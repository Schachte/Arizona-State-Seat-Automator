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
    "cookie":'JSESSIONID=javaprod20~36CD0AFEBF8BA4A738113125069AB200.catalog20; onlineCampusSelection=C; __cfduid=d9c8f7cb9db61be61ee5e798a98ce7a621490417730; _st_bid=8acaf580-1275-11e7-a594-ef15f3d2e149; MOBILE_DETECTION=false; ASUHASESSION=bb97c957fb5b9c7ae3635a518967b99e; _gaRollUp=GA1.2.675165316.1490417732;',
    "pragma":"no-cache",
    "referer":"https://webapp4.asu.edu/catalog/",
    "upgrade-insecure-requests":"1",
    "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callback(error, response, html) {
    var $ = cheerio.load(html);

    $('a#ExternalLink').each( function () {
       var link = $(this).attr('href');
       getNewPage(link)
    });
}

function callback2(error, response, html) {
    var $ = cheerio.load(html);
    let className = $('span.crs-title').find('span').first().text().trim()
    let data=[]
    
    $("td").each(function(i, elemen){
      if ($(this).text().includes("Non Reserved Available Seats")) {
        data.push($(this).text())
      }
    })

    let regexReserved = /Non Reserved Available Seats:(\s+)(\d)/
    console.log(data[0].match(regexReserved)[2] + " Non-Reserved Seats Available for " + className)
}

function getNewPage(url) {
  options.url = 'https://webapp4.asu.edu' + url;
  options.headers.path = url;
  request(options, callback2);
}

function classSearch(CLASS_NO) {
  let full_url  = 'https://webapp4.asu.edu/catalog/classlist?k='+CLASS_NO+'&t=2177&e=all&hon=F&promod=F';
  let full_path = '/catalog/classlist?k='+CLASS_NO+'&t=2177&e=all&hon=F&promod=F';

  options.url = full_url;
  options.headers.path = full_path;
  
  request(options, callback);
}

let class_schedule = [
  79474,
  79501,
  82013
];

class_schedule.forEach((data) => {
  classSearch(data)
})
