var events = require('events')
var inherits = require('inherits')
var extend = require('extend')
var esprima = require('./esprima')
var CodeMirror = require('./codemirror')
require('./javascript')(CodeMirror)

module.exports = function(opts) {
  return new Editor(opts)
}

function Editor(opts) {
  var self = this
  if (!opts) opts = {}
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
  defaults.onChange = function (e) {
	  self.emit('change')
		if (self.interval) clearTimeout( self.interval )
		self.interval = setTimeout( self.update.bind(self), self.opts.updateInterval )
	}
	this.opts = extend({}, defaults, opts)
  this.editor = CodeMirror( this.opts.container, this.opts )
  this.element = this.editor.getWrapperElement()
  this.errorLines = []
  this.update()
  if (this.opts.dragAndDrop) this.addDropHandler()
}

inherits(Editor, events.EventEmitter)

Editor.prototype.update = function() {
  return this.validate(this.editor.getValue())
}

Editor.prototype.validate = function(value) {
  var self = this
  
	while ( self.errorLines.length > 0 ) {
		self.editor.setLineClass( self.errorLines.shift(), null, null );
	}

	try {
		var result = esprima.parse( value, { tolerant: true, loc: true } ).errors;
		for ( var i = 0; i < result.length; i ++ ) {
			var error = result[ i ];
			var lineNumber = error.lineNumber - 1;
			self.errorLines.push( lineNumber );
			self.editor.setLineClass( lineNumber, null, 'errorLine' );
		}

	} catch ( error ) {
		var lineNumber = error.lineNumber - 1;
		self.errorLines.push( lineNumber );
		self.editor.setLineClass( lineNumber, null, 'errorLine' );
	}

	return self.errorLines.length === 0;

}

Editor.prototype.addDropHandler = function () {
  var self = this
  this.element.addEventListener( 'drop', function ( event ) {
    
    event.preventDefault()
    event.stopPropagation()
    
    var file = event.dataTransfer.files[ 0 ]
    
    var reader = new FileReader()
    
    reader.onload = function ( event ) {
      self.editor.setValue( event.target.result )
    }
    
    reader.readAsText( file )
    
  }, false )
  
}
