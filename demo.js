var jsEdit = require('./')({
  container: document.querySelector('#editor'),
  injectStyles: true,
})

jsEdit.setValue(document.querySelector('#program').text)