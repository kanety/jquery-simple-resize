import $ from 'jquery';

import './jquery-simple-resize.scss';
import SimpleResize from './simple-resize';
import { NAMESPACE } from './consts';

$.fn.simpleResize = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if ($elem.data(NAMESPACE)) $elem.data(NAMESPACE).destroy();
    $elem.data(NAMESPACE, new SimpleResize($elem, options));
  });
};

$.SimpleResize = SimpleResize;
