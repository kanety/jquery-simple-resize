import $ from 'jquery';

import { NAMESPACE } from './consts';

const DEFAULTS = {
  top: null,
  bottom: null,
  left: null,
  right: null,
  corner: null
};

export default class SimpleResize {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$target = $(element);
    this.$document = $(document);

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    this.handlers = {};
    this.startX = 0;
    this.startY = 0;
    this.startWidth = 0;
    this.startHeight = 0;

    this.init();
  }

  init() {
    this.$target.addClass(NAMESPACE).addClass('resize-target');

    this.build();
    this.unbind();
    this.bind();
  }

  build() {
    ['top', 'bottom', 'left', 'right', 'corner'].forEach((type) => {
      let $handler;
      if (this.options[type] == true) {
        $handler = $('<div>').addClass('resize-inner').appendTo(this.$target);
      } else {
        $handler = $(this.options[type]);
        if ($.contains(this.$target[0], $handler[0])) {
          $handler.addClass('resize-inner');
        } else {
          $handler.addClass(NAMESPACE).addClass('resize-outer');
        }
      }
      this.handlers[type] = $handler.addClass(`resize-${type}`);
    });
  }

  bind() {
    for (let type in this.handlers) {
      this.handlers[type].on(`mousedown.${this.namespace}`, (e) => {
        this.start($(e.currentTarget), e.pageX, e.pageY);
      });
    }
  }

  unbind() {
    for (let type in this.handlers) {
      this.handlers[type].off(`.${this.namespace}`);
    }
    this.$document.off(`.${this.namespace}`);
  }

  start($handler, x, y) {
    this.startX = x;
    this.startY = y;
    this.startWidth = this.$target.width();
    this.startHeight = this.$target.height();

    this.$document.on(`mousemove.${this.namespace}`, (e) => {
      this.move($handler, e.pageX, e.pageY);
    }).on(`mouseup.${this.namespace}`, (e) => {
      this.end($handler);
    }).on(`selectstart.${this.namespace}`, (e) => {
      return false;
    });

    $('iframe').css('pointer-events', 'none');

    this.$target.trigger('resize:start', [$handler]);
  }

  move($handler, x, y) {
    let dx = x - this.startX;
    let dy = y - this.startY;
    let width = this.startWidth + dx;
    let height = this.startHeight + dy;

    if (['resize-corner', 'resize-right', 'resize-left'].some((key) => $handler.hasClass(key))) {
      this.$target.width(width);
    }
    if (['resize-corner', 'resize-top', 'resize-bottom'].some((key) => $handler.hasClass(key))) {
      this.$target.height(height);
    }

    this.$target.trigger('resize:move', [$handler]);
  }

  end($handler) {
    this.$document.off(`.${this.namespace}`);

    $('iframe').css('pointer-events', 'auto');

    this.$target.trigger('resize:end', [$handler]);
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, options);
  }
}
