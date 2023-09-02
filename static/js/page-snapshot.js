window.ps_html = function (selector) {
  var el = document.querySelector('article');
  if (el) {
    return el.outerHTML;
  }

  return ''
}

window.ps_put2 = function (url, data) {
  var data_head = data.substring(0, 50)
  console.log('put '+url)
  console.log(data_head);

  fetch(url, {
    method: 'PUT', headers: {
      'Content-Type': 'text/plain'
    },
    body: data
  })
    .then(response => console.log(response))
    .catch(error => console.error(error))
    .finally(() => {
      console.log('put finally '+url)
    })
}