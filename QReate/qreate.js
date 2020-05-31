var qrcode = new QRCode("qrcode");

  //generate QR code if conditions are met
  function generateCode() {
    var url = document.getElementById("qr-data");
    var proxyurl = 'https://cors-anywhere.herokuapp.com/'; //to avoid CORS issue

    
    if (isURL(url.value) == true) { //checks if the input is a valid URL
      urlExists(url.value, function (status) { //if URL is valid, checks with AJAX to see if the entered URL exists
        if (status === 200) {
          qrcode.makeCode(url.value); //make the QR code if the URL is valid and exists
        } else if (status === 404) {
          alert('The URL you have entered does not exist on the web.')
        } else {
            alert('The URL you entered is not available')
          }
      }, proxyurl)
    }
    else
      alert('Please enter a URL. EX:(https://websitename.com)')

  };
  //validate URL format
  function isURL(url) {
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  //validate URL existence
  function urlExists(url, cb, proxyurl) {
    jQuery.ajax({
      url: proxyurl + url,
      dataType: 'text',
      type: 'GET',
      complete: function (xhr) {
        if (typeof cb === 'function')
          cb.apply(this, [xhr.status]);
      }
    });
  }