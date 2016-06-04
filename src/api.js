const DomParser = require('react-native-html-parser').DOMParser;

class AssistantApi {
  constructor(props) {
    this.save = [];
  }
  async getSub(classId, pageNumber = 0) {
    const url = `http://qiuzhen.eicbs.com/web/Listsub.aspx?ClassID=${classId}`;
    const validation = this._getInputValues(url);
    let response = await fetch(url);
    let html = await response.text();
    let doc = new DomParser().parseFromString(html,'text/html');
    const maxPage = doc.getElementById('XDataList1_lblPages').textContent.split('／')[1];
    if(pageNumber > maxPage) return [];
    const rows = doc.getElementById('GridView1').getElementsByTagName('tr');
    //console.log(rows);
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      data.push({
        title: cells[0].textContent.trim(),
        author: cells[1].textContent.trim(),
        date: cells[2].textContent.trim(),
      });
    };
    //console.log(rows);
    return data;
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
  toQueryString(params) {
    let parts = [];
    for (let param in params) {
      parts.push(`${param}=${encodeURIComponent(params[param])}`);
    }
    return parts.join('&');
  }
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
