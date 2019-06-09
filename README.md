# jquery-simple-resize

A jquery plugin for simple resizable element.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-resize --save

## Usage

Build html as follows:

```html
<div id="resize">
  <div>text</div>
</div>
```

Then run:

```javascript
$('#resize').simpleReize({
  corner: true
});
```

### Options

Build resize handler automatically in the resizable element:

```javascript
$('#resize').simpleReize({
  top: true,
  bottom: true,
  left: true,
  right: true,
  corner: true
});
```

Specify selector out of the resizable element:

```javascript
$('#resize').simpleReize({
  top: '#resize_top',
  bottom: '#resize_bottom',
  left: '#resize_left',
  right: '#resize_right',
  corner: '#resize_corner'
});
```

### Callbacks

```javascript
$('table').simpleResize({
  ...
}).on('resize:start', function(e, $handler) {
  ...
}).on('resize:end', function(e, $handler) {
  ...
}).on('resize:move', function(e, $handler) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
