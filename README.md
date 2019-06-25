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

```html
<div id="resize">
  <div>text</div>
</div>
<div id="resize_bottom"></div>
```

```javascript
$('#resize').simpleReize({
  bottom: '#resize_bottom'
});
```

Store current width and height in the web storage:

```javascript
$('#resize').simpleReize({
  store: 'session',  // or 'local'
  storeKey: 'YOUR_KEY'
});
```

### Callbacks

```javascript
$('#resize').simpleResize({
  ...
}).on('resize:start', function(e, $handler) {
  ...
}).on('resize:move', function(e, $handler) {
  ...
}).on('resize:end', function(e, $handler) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
