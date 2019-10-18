import $ from 'jquery';
import Store from '@kanety/js-store';

import { NAMESPACE } from './consts';

const DEFAULTS = {
  top: null,
  bottom: null,
  left: null,
  right: null,
  corner: null,
  store: null,
  storeKey: null
};

export default class SimpleResize {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$target = $(element);
    this.$document = $(document);

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    this.handlers = {};

    this.touchMoveListener = this.touchMove.bind(this);

    if (this.options.store && this.options.storeKey) {
      this.store = new Store({
        type: this.options.store,
        key: this.options.storeKey
      });
    }

    this.init();
    this.load();
  }

  init() {
    this.$target.addClass(NAMESPACE).addClass('resize-target');

    this.build();
    this.unbind();
    this.bind();
  }

  destroy() {
    this.$target.removeClass(NAMESPACE).removeClass('resize-target');

    ['top', 'bottom', 'left', 'right', 'corner'].forEach((type) => {
      let $handler = this.handlers[type];
      if ($handler) {
        $handler.addClass(NAMESPACE).removeClass(`resize-inner resize-outer resize-${type}`);
        if (this.options[type] == true) {
          $handler.remove();
        }
      }
    });

    this.unbind();
  }

  build() {
    ['top', 'bottom', 'left', 'right', 'corner'].forEach((type) => {
      let $handler = null;
      if (this.options[type] == true) {
        this.$target.addClass('resize-inner');
        $handler = $('<div>').appendTo(this.$target);
      } else if (this.options[type]) {
        $handler = $(this.options[type]);
        if ($.contains(this.$target[0], $handler[0])) {
          this.$target.addClass('resize-inner');
        } else {
          $handler.addClass(NAMESPACE).addClass('resize-outer');
        }
      }
      if ($handler) {
        this.handlers[type] = $handler.addClass(`resize-${type}`);
      }
    });
  }

  bind() {
    for (let type in this.handlers) {
      this.handlers[type].on(`mousedown.${this.namespace}`, (e) => {
        this.start($(e.currentTarget), e.pageX, e.pageY);
      }).on(`touchstart.${this.namespace}`, (e) => {
        let t = e.originalEvent.changedTouches[0];
        this.start($(e.currentTarget), t.pageX, t.pageY);
      });
    }
  }

  unbind() {
    this.$target.off('resize:start resize:move resize:end')
    for (let type in this.handlers) {
      this.handlers[type].off(`.${this.namespace}`);
    }
    this.$document.off(`.${this.namespace}`);
  }

  start($handler, x, y) {
    this.$handler = $handler;
    this.startX = x;
    this.startY = y;
    this.startWidth = this.$target.width();
    this.startHeight = this.$target.height();

    this.$document.on(`mousemove.${this.namespace}`, (e) => {
      this.move(e.pageX, e.pageY);
    }).on(`mouseup.${this.namespace}`, (e) => {
      this.end();
    }).on(`touchend.${this.namespace}`, (e) => {
      this.end();
    }).on(`selectstart.${this.namespace}`, (e) => {
      return false;
    });

    document.addEventListener('touchmove', this.touchMoveListener, { passive: false });

    $('iframe').css('pointer-events', 'none');

    this.$target.trigger('resize:start', [$handler]);
  }

  move(x, y) {
    let dx = x - this.startX;
    let dy = y - this.startY;
    let width = this.startWidth + dx;
    let height = this.startHeight + dy;

    if (['resize-corner', 'resize-right', 'resize-left'].some((key) => this.$handler.hasClass(key))) {
      this.$target.width(width);
    }
    if (['resize-corner', 'resize-top', 'resize-bottom'].some((key) => this.$handler.hasClass(key))) {
      this.$target.height(height);
    }

    this.$target.trigger('resize:move', [this.$handler]);
  }

  end() {
    this.$document.off(`.${this.namespace}`);

    document.removeEventListener('touchmove', this.touchMoveListener);

    $('iframe').css('pointer-events', 'auto');

    this.save();

    this.$target.trigger('resize:end', [this.$handler]);
  }

  touchMove(e) {
    this.move(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    e.preventDefault();
  }

  load() {
    if (!this.store) return;

    let data = this.store.get();
    if (!data) return;

    if (data.width) {
      this.$target.width(data.width);
    }
    if (data.height) {
      this.$target.height(data.height);
    }
  }

  save() {
    if (!this.store) return;

    let data = {};
    if (this.handlers.corner || this.handlers.left || this.handlers.right) {
      data.width = this.$target.width();
    }
    if (this.handlers.corner || this.handlers.top || this.handlers.bottom) {
      data.height = this.$target.height();
    }
    this.store.set(data);
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(DEFAULTS, options);
  }
}
