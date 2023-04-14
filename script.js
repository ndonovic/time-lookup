async function fetchTimeZone() {
  const locationInput = document.getElementById('location').value;
  const apiKey = '641db438b18b474b90545f84a84f1085';
  const url = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${locationInput}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const timeZone = data.timezone;
    const location = `${data.geo.city}, ${data.geo.state}, ${data.geo.country}`;

    document.getElementById('result').innerHTML = `Location: ${location} <br> Time Zone: ${timeZone}`;
  } catch (error) {
    document.getElementById('result').innerHTML = 'Error fetching data. Please check the input and try again.';
  }
}
