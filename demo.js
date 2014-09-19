var jsEdit = require('./')({ container: document.querySelector('#editor') })
jsEdit.setValue(document.querySelector('#program').text)

jsEdit.on('valid', function(valid, ast) {
  console.log(valid)
  console.log(ast)
})
