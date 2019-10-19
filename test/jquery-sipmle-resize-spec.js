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
    let $box;

    beforeEach(() => {
      $box = $('#basic');
      $box.width(100);
      $box.height(100);
    });

    it('resizes by top drag', () => {
      let $handler = $box.find('.simple-resize-top');
      drag($handler);
      expect($box.width()).toEqual(100);
      expect($box.height()).toEqual(90);
    });

    it('resizes by bottom drag', () => {
      let $handler = $box.find('.simple-resize-bottom');
      drag($handler);
      expect($box.width()).toEqual(100);
      expect($box.height()).toEqual(110);
    });

    it('resizes by left drag', () => {
      let $handler = $box.find('.simple-resize-left');
      drag($handler);
      expect($box.width()).toEqual(90);
      expect($box.height()).toEqual(100);
    });

    it('resizes by right drag', () => {
      let $handler = $box.find('.simple-resize-right');
      drag($handler);
      expect($box.width()).toEqual(110);
      expect($box.height()).toEqual(100);
    });

    it('resizes by top-left drag', () => {
      let $handler = $box.find('.simple-resize-top-left');
      drag($handler);
      expect($box.width()).toEqual(90);
      expect($box.height()).toEqual(90);
    });

    it('resizes by top-right drag', () => {
      let $handler = $box.find('.simple-resize-top-right');
      drag($handler);
      expect($box.width()).toEqual(110);
      expect($box.height()).toEqual(90);
    });

    it('resizes by bottom-left drag', () => {
      let $handler = $box.find('.simple-resize-bottom-left');
      drag($handler);
      expect($box.width()).toEqual(90);
      expect($box.height()).toEqual(110);
    });

    it('resizes by bottom-right drag', () => {
      let $handler = $box.find('.simple-resize-bottom-right');
      drag($handler);
      expect($box.width()).toEqual(110);
      expect($box.height()).toEqual(110);
    });
  });

  describe('callbacks', () => {
    let $box;
    let $handler;
    let $message;

    beforeEach(() => {
      $box = $('#callbacks');
      $handler = $box.find('.simple-resize-bottom-right');
      $message = $('#message');
    });

    it('runs callbacks', () => {
      drag($handler);
      expect($message.text()).toContain('started');
      expect($message.text()).toContain('moved');
      expect($message.text()).toContain('ended');
    });
  });

  describe('vertical resizer', () => {
    let $box;
    let $handler;

    beforeEach(() => {
      $box = $('#vertical_box1');
      $box.width(100);
      $box.height(100);
      $handler = $('#vertical_handler');
    });

    it('resizes by drag', () => {
      drag($handler);
      expect($box.width()).toEqual(110);
      expect($box.height()).toEqual(100);
    });
  });

  describe('horizontal resizer', () => {
    let $box;
    let $handler;

    beforeEach(() => {
      $box = $('#horizontal_box1');
      $box.width(100);
      $box.height(100);
      $handler = $('#horizontal_handler');
    });

    it('resizes by drag', () => {
      drag($handler);
      expect($box.width()).toEqual(100);
      expect($box.height()).toEqual(110);
    });
  });
});
