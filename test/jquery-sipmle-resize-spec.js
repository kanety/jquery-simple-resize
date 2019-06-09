describe('jquery-simple-resize', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  function drag($elem) {
    $elem.trigger($.Event('mousedown', { pageX: 0, pageY: 0 }));
    $elem.trigger($.Event('mousemove', { pageX: 10, pageY: 10 }));
    $elem.trigger($.Event('mouseup'));
  }

  describe('basic resizer', function() {
    var $box, width, height;
    var handlers = {};
    var $message;

    beforeEach(function() {
      $box = $('#basic');
      width = $box.width();
      height = $box.height();
      ['top', 'bottom', 'left', 'right', 'corner'].forEach(function(type) {
        handlers[type] = $box.find('.resize-' + type);
      });
      $message = $('#message');
    });

    it('resizes by top drag', function() {
      drag(handlers.top);
      expect($box.width()).toEqual(width);
      expect($box.height()).toEqual(height + 10);
    });

    it('resizes by bottom drag', function() {
      drag(handlers.bottom);
      expect($box.width()).toEqual(width);
      expect($box.height()).toEqual(height + 10);
    });

    it('resizes by left drag', function() {
      drag(handlers.left);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height);
    });

    it('resizes by right drag', function() {
      drag(handlers.right);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height);
    });

    it('resizes by corner drag', function() {
      drag(handlers.corner);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height + 10);
    });

    it('runs callbacks', function() {
      drag(handlers.corner);
      expect($message.text()).toContain('started');
      expect($message.text()).toContain('moved');
      expect($message.text()).toContain('ended');
    });
  });

  describe('vertical resizer', function() {
    var $box, width, height;
    var $handler;

    beforeEach(function() {
      $box = $('#vertical_box1');
      width = $box.width();
      height = $box.height();
      $handler = $('#vertical_handler');
    });

    it('resizes by drag', function() {
      drag($handler);
      expect($box.width()).toEqual(width + 10);
      expect($box.height()).toEqual(height);
    });
  });

  describe('horizontal resizer', function() {
    var $box, width, height;
    var $handler;

    beforeEach(function() {
      $box = $('#horizontal_box1');
      width = $box.width();
      height = $box.height();
      $handler = $('#horizontal_handler');
    });

    it('resizes by drag', function() {
      drag($handler);
      expect($box.width()).toEqual(width);
      expect($box.height()).toEqual(height + 10);
    });
  });
});
