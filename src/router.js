import Icon from 'react-native-vector-icons/MaterialIcons';
import Splash from './pages/Splash';
import News from './pages/News';
import NewsView from './pages/NewsView';
import Mark from './pages/Mark'
import MarkView from './pages/MarkView'

import root from './app';

let Pages = {};
Pages.Splash = {
  component: Splash,
  params: {
    drawerLockMode: 'locked-closed',
  }
};

Pages.News = {
  component: News,
  params: {
    title: '新闻',
    // drawerLockMode: 'unlocked',
  }
};

Pages.NewsView = {
  component: NewsView,
}

Pages.Mark = {
  component: Mark,
  params: {
    title: '成绩',
  }
};

Pages.MarkView = {
  component: MarkView,
}


let Navigation = [
  {
    title: '新闻',
    page: Pages.News,
    //icon: (<Icon name="assignment" size={30} color="#900" />),
    icon: 'assignment',
  },
  {
    title: '成绩',
    page: Pages.Mark,
    //icon: (<Icon name="library-books" size={30} color="#900" />),
    icon: 'library-books',
  }
]

export default class Router {
  static gotoPage(page, data) {
    let router = {
      component: page.component,
      params: {
        ...page.params,
        ...data
      }
    };
    root.getInstance().push(router);
  }
  static jumpTo(page) {
    root.getInstance().jumpTo(page);
  }
  static pop(num = 1) {
    root.getInstance().pop(num);
  }

  static popToRoot() {
    root.getInstance().popToRoot();
  }

  static replace(page, data) {
    let router = {
      component: page.component,
      params: {
        ...page.params,
        ...data
      }
    };
    root.getInstance().replace(router);
  }
  static pages = Pages;
  static navigation = Navigation;
}
