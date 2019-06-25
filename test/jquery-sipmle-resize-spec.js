describe('jquery-simple-resize', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  function drag($elem) {
    $elem.trigger($.Event('mousedown', { pageX: 0, pageY: 0 }));
    $elem.trigger($.Event('mousemove', { pageX: 10, pageY: 10 }));
    $elem.trigger($.Event('mouseup'));
  }

  describe('basic', () => {
    let $box, width, height;
    let handlers = {};

    beforeEach(() => {
      $box = $('#basic');
      width = $box.width();
      height = $box.height();
      ['top', 'bottom', 'left', 'right', 'corner'].forEach((type) => {
        handlers[type] = $box.find('.resize-' + type);
      });
    });

    it('resizes by top drag', () => {
      drag(handlers.top);
      expect($box.width()).toEqual(width);
      expect($box.height()).toEqual(height + 10);
    });

    it('resizes by bottom drag', () => {
      drag(handlers.bottom);
      expect($box.width()).toEqual(width);
      expect($box.height()).toEqual(height + 10);
    });

    it('resizes by left drag', () => {
      drag(handlers.left);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height);
    });

    it('resizes by right drag', () => {
      drag(handlers.right);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height);
    });

    it('resizes by corner drag', () => {
      drag(handlers.corner);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height + 10);
    });
  });

  describe('callbacks', () => {
    let $box;
    let handlers = {};
    let $message;

    beforeEach(() => {
      $box = $('#callbacks');
      ['top', 'bottom', 'left', 'right', 'corner'].forEach((type) => {
        handlers[type] = $box.find(`.resize-${type}`);
      });
      $message = $('#message');
    });

    it('runs callbacks', () => {
      drag(handlers.corner);
      expect($message.text()).toContain('started');
      expect($message.text()).toContain('moved');
      expect($message.text()).toContain('ended');
    });
  });

  describe('vertical resizer', () => {
    let $box, width, height;
    let $handler;

    beforeEach(() => {
      $box = $('#vertical_box1');
      width = $box.width();
      height = $box.height();
      $handler = $('#vertical_handler');
    });

    it('resizes by drag', () => {
      drag($handler);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height);
    });
  });

  describe('horizontal resizer', () => {
    let $box, width, height;
    let $handler;

    beforeEach(() => {
      $box = $('#horizontal_box1');
      width = $box.width();
      height = $box.height();
      $handler = $('#horizontal_handler');
    });

    it('resizes by drag', () => {
      drag($handler);
      expect($box.width()).toEqual(width);
      expect($box.height()).toEqual(height + 10);
    });
  });
});
