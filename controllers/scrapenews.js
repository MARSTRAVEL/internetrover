const axios = require('axios');// Promise based HTTP client for the browser and node.js
const cheerio = require('cheerio'); // Basically jQuery for node.js

//const bbcUrl ='https://www.bbc.com/news';
//const reutersUrl = 'https://www.reuters.com/news/archive/worldNews';
//const yleUrl = "https://yle.fi/uutiset/osasto/news/";

const doesNotExist = (element ,objArray) =>{
  let flag = true;
  for (let i = 0; i < objArray.length; i++) {
    if (element === objArray[i].title) {
      flag = false;
      break;
    }
  }
return flag;
};

exports.bbcTopStory = (html) => {
  let $ = cheerio.load(html);
  const results = [];
  const content = $('#news-top-stories-container').find('div.gs-c-promo-body').each(function(i, ele){
    const title = $(this).find('h3').text().trim();
    if (results.length === 0) {
      const link = $(this).find('a.gs-c-promo-heading').attr('href');
      const date = $(this).find('time').attr('datetime');
      const description = $(this).find('p').text();
      const topNews = {
        date: date,
        title: title,
        link: 'https://www.bbc.com' + link,
        description: description,
        content: '',
      };
      results.push(topNews);
    }else if (doesNotExist(title, results)) {
      const link = $(this).find('a.gs-c-promo-heading').attr('href');
      const date = $(this).find('time').attr('datetime');
      const description = $(this).find('p').text();
      const topNews = {
        date: date,
        title: title,
        link: 'https://www.bbc.com' + link,
        description: description,
        content: '',
      };
      results.push(topNews);
    }
  });
  return results;
};

exports.reuters = (html) => {
  let $ = cheerio.load(html);
  const results = [];
   $('.news-headline-list').find('div.story-content').each(function(i, ele){
     const title = $(this).find('h3').text().trim();
     const link = $(this).find('a').attr('href'); // www.reuters.com
     const description = $(this).find('p').text().trim();
     const wordNewsHeadlines = {
       date: Date.now(),
       title: title,
       link: 'https://www.reuters.com' + link,
       description: description,
       content: '',
     };
     results.push(wordNewsHeadlines);
  });
return results;
};

exports.yleNews = (html) => {
  let $ = cheerio.load(html);
  const results = [];
  const content = $('#oikea_palsta').find('article').each(function(i, ele){
      const title = $(this).find('a').text().trim();
      const link =  $(this).find('a').attr('href');
      const date = $(this).find('time').attr('datetime');
      const da = new Date(date);
      const latest = {
        date: da,
        title: title,
        link: link,
        description: '',
        content: '',
      };
      results.push(latest);
    });
return results;
};


/*
// single axios request
axios.get(bbcUrl)
.then(response => {
  // bbcMostRead(response.data);
  bbcTopStory(response.data);
})
.catch(error => {
  console.log(error);
});
*/
