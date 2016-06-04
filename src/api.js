const DomParser = require('react-native-html-parser').DOMParser;

class AssistantApi {
  constructor(props) {
    this.save = [];
  }
  async getNews(classId, pageNumber = 0) {
    let response = await fetch(`http://qiuzhen.eicbs.com/web/Listsub.aspx?ClassID=${classId}`);
    let html = await response.text();
    let doc = new DomParser().parseFromString(html,'text/html');
    return doc.getElementById('__VIEWSTATE').getAttribute('value');
  }
  async _getInputValues(url) {
    if (this.save[url]) return this.save[url];
    let response = await fetch(url);
    let html = await response.text();
    let doc = new DomParser().parseFromString(html,'text/html');
    let viewState = doc.getElementById('__VIEWSTATE') ? doc.getElementById('__VIEWSTATE').getAttribute('value') : '';
    let eventValidation = doc.getElementById('__EVENTVALDIAITON') ? doc.getElementById('__EVENTVALDIAITON').getAttribute('value') : '';
    this.save[url] = { viewState, eventValidation };
    return { viewState, eventValidation };
  }
  _toQueryString(params)
}
const Api = new AssistantApi();

export default Api;

// let newsData = []
// function get
// export default {
//   getNews: async (classId, pageNumber = 0) => {
//     if(!newsData[classId])

//   },
// };
