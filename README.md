# Pant

The React + Electron port of [jspaint](http://jspaint.ml) by [1j01](https://github.com/1j01)

Bootstrapped with [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)

[Win 98 Emulator](https://copy.sh/v86/?profile=windows98)

```
yarn

yarn dev
```

## Features

### Windows
* [ ] draggable
* [ ] outline when dragging

### Tools

* [ ] Free form select
* [ ] Rectangular select
* [ ] Eraser
* [ ] Bucket thingy
* [ ] Color sampler
* [ ] Magnifying glass
* [ ] Pencil
* [ ] Brush
* [ ] Spray can
* [ ] Text
* [ ] Straight line
* [ ] Squiggly line
* [ ] Rectangle
* [ ] Polygon
* [ ] Ellipse
* [ ] Rounded Rectangle
* [ ] draggable
* [ ] dockable

### Canvas

* [ ] Drawing
* [ ] Saving (to redux store?)
* [x] resizing
* [x] handles
* [x] resizing past window boundary (document `mousemove` event)

### Color Palette

* [x] `left click` to change primary
* [x] `right click` to change secondary
* [x] <kbd>Ctrl</kbd> `left click` to change tertiary
* [x] `double click` to pull up `<input type="color"/>` (debounced for `change`)
* [ ] draggable
* [ ] dockable

### Menu

* [x] File
* [x] Edit
* [x] View
* [x] Image
* [x] Colors
* [x] Help
* [x] Implement nested menus
* [ ] Implement functions

### Status bar

* [ ] Tool tooltip
* [ ] start coordinates
* [ ] end coordinates

### Misc

* [ ] everything here http://www.albinoblacksheep.com/tutorial/mspaint
* [ ] Brush Scaling (<kbd>Ctrl</kbd> <kbd>+</kbd> & <kbd>-</kbd> to adjust brush size)
* [ ] "Custom Brushes" (hold <kbd>Shift</kbd> and drag the selection to smear it)
* [ ] The 'Stamp' "Tool" (hold <kbd>Shift</kbd> and click the selection to stamp it)
* [ ] Image Scaling (<kbd>Ctrl+Shift</kbd> <kbd>+</kbd> & <kbd>-</kbd> on the Numpad to scale the selection by factors of 2)
* [ ] Color Replacement (right mouse button with Eraser to selectively replace the foreground color with the background color)
* [ ] The Grid (<kbd>Ctrl+G</kbd> & Zoom to 6x+)
* [ ] Add [Redux Undo](https://github.com/omnidan/redux-undo) for canvas undos
* [ ] Add [Electron Redux](https://github.com/hardchor/electron-redux) to communicate with the main process
