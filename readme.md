# javascript-editor

[codemirror](http://codemirror.net/) + [esprima](http://esprima.org/) powered html5 javascript editor component

based originally on [htmleditor](http://mrdoob.com/projects/htmleditor/) by mrdoob

## usage

use it with [browserify](http://browserify.org)

```
npm install javascript-editor
```

```javascript
var editor = require('javascript-editor')

editor({ container: document.querySelector('#editor') })

editor.on('change', function() {
  var value = editor.getValue()
})
```

## license

BSD
