// 2 requests to 2 different endpoints:
// req to certain endpoint to get city information to get a city code
// use city code to a weather conditions api to get weather in that area

const key = 'uysmqUkOMhEE3CMH0AixP8rO14jGP9GT';

const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query); // returns promise
    const data = await response.json(); // returns promise

    // console.log(data[0]);
    return data[0];

}

getCity('ann arbor')
    .then(data => console.log(data))
    .catch(err => console.log(err));
    