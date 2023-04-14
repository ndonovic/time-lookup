(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

async function fetchTimeZone() {
  const locationInput = document.getElementById('location').value;
  const apiKey = '641db438b18b474b90545f84a84f1085';
  const url = `https://cors-anywhere.herokuapp.com/https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${locationInput}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const timeZone = data.timezone;
    const location = `${data.geo.city}, ${data.geo.state}, ${data.geo.country}`;
    const currentTime = data.date_time_txt;

    document.getElementById('result').innerHTML = `Location: ${location} <b> Current Time: ${currentTime} <br> Time Zone: ${timeZone}`;
  } catch (error) {
    document.getElementById('result').innerHTML = 'Error fetching data. Please check the input and try again.';
  }
}
