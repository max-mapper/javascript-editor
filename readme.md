# javascript-editor

[codemirror](http://codemirror.net/) + [esprima](http://esprima.org/) powered html5 javascript editor component

based originally on [htmleditor](http://mrdoob.com/projects/htmleditor/) by mrdoob

## features

- JS syntax highlighting
- JS errors are detected and highlighted as you code
- by default if you drop a .js file on the editor it will load the contents
- modular and installable with NPM

## usage

use it with [browserify](http://browserify.org)

```
npm install javascript-editor
```

```javascript
var createEditor = require('javascript-editor')

var editor = createEditor({ container: document.querySelector('#editor') })

editor.on('change', function() {
  var value = editor.getValue()
})
```

### default options

```javascript
var defaults = {
	value: "// hello world\n",
	container: document.body,
	mode: "javascript",
	lineNumbers: true,
	matchBrackets: true,
	indentWithTabs: false,
	tabSize: 2,
	indentUnit: 2,
	updateInterval: 500,
	dragAndDrop: true
}
```

## license

BSD
