const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const error = document.querySelector('.error')

const updateUI = (data) =>{

    //destructure data properties
    const { cityDets, weather } = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    // update icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // update day and night images
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg'
    }
    time.setAttribute('src', timeSrc);

    // remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

// calls getCity and getWeather to retrieve the weather data
const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    // object shorthand notation
    return { cityDets, weather };
};


// listens for form submissiion & calls update city
cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value & reset form
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // call update city and update the ui
    updateCity(city)
        .then(data => {
            error.classList.add('d-none');
            updateUI(data);
        })
        .catch(err => {
            if(err){
                error.classList.remove('d-none');
                card.classList.add('d-none');
            }
        });
});
