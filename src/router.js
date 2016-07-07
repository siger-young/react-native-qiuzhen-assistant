import Icon from 'react-native-vector-icons/MaterialIcons';
import Splash from './pages/Splash';
import News from './pages/News';
import Mark from './pages/Mark'

import root from './app';

let Pages = {};
Pages.Splash = {
  component: Splash,
};

Pages.News = {
  component: News,
  params: {
    title: '新闻',
  }
};

Pages.Mark = {
  component: Mark,
  params: {
    title: '成绩',
  }
};

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
      ...page,
      component: page.component,
      params: {
        ...page.params,
        ...data
      }
    };
    root.getInstance().push(router);
  }

  static pop(num = 1) {
    root.getInstance().pop(num);
  }

  static popToRoot() {
    root.getInstance().popToRoot();
  }

  static replace(page, data) {
    let router = {
      ...page,
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
