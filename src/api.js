const DomParser = require('react-native-html-parser').DOMParser;

class AssistantApi {
  constructor(props) {
    this.save = [];
  }
  async getSub(classId, pageNumber = 1) {
    const url = `http://qiuzhen.eicbs.com/web/Listsub.aspx?ClassID=${classId}`;
    const validation = await this._getInputValues(url, 'news', classId);
    let response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: this.toQueryString({
          __EVENTTARGET: 'XDataList1$LinkButton1',
          __EVENTARGUMENT: '',
          __VIEWSTATE: validation.viewState,
          XDataList1$txtindex: pageNumber,
        }),
      }
    );
    let html = await response.text();
    // console.log(validation);
    // console.log(this.toQueryString({
    //       __EVENTTARGET: 'XDataList1$LinkButton1',
    //       __EVENTARGUMENT: '',
    //       __VIEWSTATE: validation.viewState,
    //       XDataList1$txtindex: pageNumber,
    //     }));
    // console.log(html);
    let doc = new DomParser().parseFromString(html, 'text/html');
    const maxPage = doc.getElementById('XDataList1_lblPages').textContent.split('／')[1];
    if (pageNumber > maxPage) return [];
    const rows = doc.getElementById('GridView1').getElementsByTagName('tr');
    // console.log(rows);
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      data.push({
        title: cells[0].textContent.trim(),
        author: cells[1].textContent.trim(),
        date: cells[2].textContent.trim(),
      });
    }
    // console.log(rows);
    return {
      pageTotal: maxPage,
      currentPage: pageNumber,
      data,
    };
  }
  async getFilter() {
    const url = 'http://qiuzhen.eicbs.com/schinfo/A20/Score/ScoreSGTotal.aspx';
    let response = await this.qFetch(url);
    let html = await response.text();
    let doc = new DomParser().parseFromString(html, 'text/html');
    let yearSelect = doc.getElementById('ddlSchYear');
    let yearOptions = yearSelect.getElementsByTagName('option');
    // console.log(yearOptions);
    let years = [];
    for (let i = 0; i < yearOptions.length; i++) {
      years.push(yearOptions[i].getAttribute('value'));
    }
    let currentTerm = doc.getElementById('ddlSchTerm').getElementsByAttribute('selected')[0].getAttribute('value');
    let currentYear = yearSelect.getElementsByAttribute('selected')[0].getAttribute('value');
    return {
      years,
      current: {
        year: currentYear,
        term: currentTerm,
      },
    };
  }
  async getExaminations(year, term = 1, isGrade = false) {
    const url = 'http://qiuzhen.eicbs.com/schinfo/A20/Score/ScoreSGTotal.aspx';
    const validation = await this._getInputValues(url, 'score', 'general');
    const submitButton = isGrade ? 'Button3' : 'Button2';
    // console.log({
    //   ddlSchYear: year,
    //   ddlSchTerm: term,
    //   ddlExamType: '',
    //   __VIEWSTATE: validation.viewState,
    //   __EVENTVALIDATION: validation.eventValidation,
    //   [submitButton]: 1,
    // });
    let response = await this.qFetch(url,
      this.toQueryString({
        ddlSchYear: year,
        ddlSchTerm: term,
        ddlExamType: '',
        __VIEWSTATE: validation.viewState,
        __EVENTVALIDATION: validation.eventValidation,
        [submitButton]: 1,
      })
    );
    let html = await response.text();
    // console.log(html);
    return 0;
  }
  async _getCookies(login) {
    let response = await fetch('http://qiuzhen.eicbs.com/web/manage/login/login.aspx',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: this.toQueryString({
          qtype: 'login',
          username: login.username,
          password: login.password,
        }),
      }
    );
    // this.save.cookies = response.headers.get('Set-Cookie');
    return response.headers.get('Set-Cookie');
  }
  async qFetch(url, body) {
    const cookies = this._getCookies({
      username: 'zhanglimin',
      password: 'zhanglimin',
    });
    let response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookies,
        },
        body,
      }
    );
    return response;
  }
  async _getInputValues(url, idPrimary, idSecondary) {
    if (this.save[idPrimary] === undefined) this.save[idPrimary] = [];
    if (this.save[idPrimary][idSecondary]) return this.save[idPrimary][idSecondary];
    let response = idPrimary == 'score' ? (await this.qFetch(url)) : (await fetch(url));
    let html = await response.text();
    let doc = new DomParser().parseFromString(html, 'text/html');
    let viewState = doc.getElementById('__VIEWSTATE') ? doc.getElementById('__VIEWSTATE').getAttribute('value') : '';
    let eventValidation = doc.getElementById('__EVENTVALIDATION') ? doc.getElementById('__EVENTVALIDATION').getAttribute('value') : '';
    this.save[idPrimary][idSecondary] = { viewState, eventValidation };
    return { viewState, eventValidation };
  }
  toQueryString(params) {
    let parts = [];
    for (let param in params) {
      if (params.hasOwnProperty(param))
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
