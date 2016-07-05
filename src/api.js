const DomParser = require('react-native-parser').DOMParser;

class AssistantApi {
  constructor(props) {
    this.save = [];
  }
  async getArticleInfo(url) {
    // console.log("A, I'm here");
    let response = await fetch(url);
    // console.log(url);
    let html = await response.text();
    let doc = new DomParser().parseFromString(html, 'text/html');
    let exp = RegExp('\u4F5C\u8005.*?\\s', 'igm');
    const author = exp.exec(doc.getElementsByClassName('disp_info')[0].textContent)[0].split(':')[1].trim();
    const article = doc.getElementsByClassName('disp_content')[0];
    // console.log(articleHtml);
    return {
      author,
      html: article.toString(),
      summary: article.textContent.trim().split('\n')[0],
    };
  }
  async getSub(classId, pn = 1, count = 5) {
    const pageNumber = Math.ceil( pn * count / 15 ); 
    const url = `http://qiuzhen.eicbs.com/web/Listsub.aspx?ClassID=${classId}`;
    const baseUrl = this.parseUrl(url).absolutePath; 
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
    const maxPage = doc.getElementById('XDataList1_lblPages').textContent.split('\uFF0F')[1];
    if (pageNumber > maxPage) return [];
    const rows = doc.getElementById('GridView1').getElementsByTagName('tr');
    // console.log(rows);
    let data = [];
    const startIndex = ( pn - 1 ) * count % 15;
    for (let i = ( pn - 1 ) * count % 15; i < (rows.length > startIndex + 5 ? startIndex + 5 : rows.length); i++) {
      // console.log(i);
      const cells = rows[i].getElementsByTagName('td');
      const href = cells[0].getElementsByTagName('a')[0].getAttribute('href');
      let articleInfo = await this.getArticleInfo(`${baseUrl}${href}`);
      // console.log(articleInfo);
      data[i] = {
        key: `${pageNumber}${i}`*1,
        title: cells[0].textContent.trim(),
        date: new Date(cells[2].textContent.trim()),
        ...articleInfo,
      };
    }
    // console.log(data);
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
  parseUrl(url) {
    const s1 = url.indexOf('://') === -1 ? 0 : url.indexOf(':\/\/');
    // console.log(s1);
    const s2 = s1 + 3;
    const protocol = url.slice(0, s1);
    // console.log('host');
    const s3 = url.indexOf('/', s2);
    const host = url.slice(s2, s3);
    // console.log(s3);
    const oppositePath = url.slice(s3 + 1);
    // console.log(`oppositePath: ${oppositePath}`);
    const segs = oppositePath.split('/');
    const pathSegs = segs.slice(0, -1);
    // console.log(segs)
    // console.log(pathSegs)
    // console.log(`${protocol}://${host}/${pathSegs.join('/')}/`);
    // segs.pop();
    // console.log(segs[segs.length - 1]);
    // console.log(protocol);
    return {
      protocol,
      host,
      path: `/${pathSegs.join('/')}/`,
      absolutePath: `${protocol}://${host}/${pathSegs.join('/')}/`,
      segs,
    };
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
