import $ from 'jquery';
import Store from '@kanety/js-store';

import './simple-resize.scss';
import { NAMESPACE } from './consts';

const DEFAULTS = {
  top: null,
  bottom: null,
  left: null,
  right: null,
  topLeft: null,
  topRight: null,
  bottomLeft: null,
  bottomRight: null,
  corner: null,
  store: null,
  storeKey: null
};

const TYPES = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];

export default class SimpleResize {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    if (this.options.corner) {
      this.options.bottomRight = this.options.corner;
    }

    this.$target = $(element);
    this.$document = $(document);
    this.$handlers = $();

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

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
    this.$target.addClass(NAMESPACE);

    this.build();
    this.unbind();
    this.bind();
  }

  destroy() {
    this.$target.removeClass(NAMESPACE);

    TYPES.forEach((type) => {
      this.$handlers.removeClass(`${NAMESPACE}-${type} ${NAMESPACE}-outer-${type}`);
    });

    this.$handlers.each((i, handler) => {
      let $handler = $(handler);
      let type = $handler.data(`${NAMESPACE}-type`);
      if (this.options[type] == true) $handler.remove();
    });

    this.unbind();
  }

  build() {
    this.$handlers = $();

    TYPES.forEach((type) => {
      let $handler = this.buildHandler(type);
      if ($handler) {
        $handler.data(`${NAMESPACE}-type`, type);
        this.$handlers = this.$handlers.add($handler);
      }
    });
  }

  buildHandler(type) {
    let $handler = null;
    let option = this.options[SimpleResize.camelize(type)];

    if (option == true) {
      $handler = $('<div>').appendTo(this.$target);
      $handler.addClass(`${NAMESPACE}-${type}`)
    } else if (option) {
      $handler = $(option);
      if ($.contains(this.$target[0], $handler[0])) {
        $handler.addClass(`${NAMESPACE}-${type}`)
      } else {
        $handler.addClass(`${NAMESPACE}-outer-${type}`);
      }
    }

    return $handler;
  }

  bind() {
    this.$handlers.on(`mousedown.${this.namespace}`, (e) => {
      this.start($(e.currentTarget), e.pageX, e.pageY);
    }).on(`touchstart.${this.namespace}`, (e) => {
      let t = e.originalEvent.changedTouches[0];
      this.start($(e.currentTarget), t.pageX, t.pageY);
    });
  }

  unbind() {
    this.$target.off('resize:start resize:move resize:end')
    this.$handlers.off(`.${this.namespace}`);
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
    let type = this.$handler.data(`${NAMESPACE}-type`);
    let dx = x - this.startX;
    let dy = y - this.startY;

    if (type.indexOf('left') != -1) dx *= -1;
    if (type.indexOf('top') != -1) dy *= -1;

    let width = this.startWidth + dx;
    let height = this.startHeight + dy;

    if (type.indexOf('left') != -1 || type.indexOf('right') != -1) {
      this.$target.width(width);
    }
    if (type.indexOf('top') != -1 || type.indexOf('bottom') != -1) {
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
    let types = this.$handlers.map((i, handler) => $(handler).data(`${NAMESPACE}-type`)).get();
    if (types.some((type) => type.indexOf('left') != -1 || type.indexOf('right') != -1)) {
      data.width = this.$target.width();
    }
    if (types.some((type) => type.indexOf('top') != -1 || type.indexOf('bottom') != -1)) {
      data.height = this.$target.height();
    }
    this.store.set(data);
  }

  static camelize(str) {
    return str.replace(/-([a-z])/g, (m) => m[1].toUpperCase())
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(DEFAULTS, options);
  }
}
