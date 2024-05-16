const body = document.querySelector('body')
const themeChanger = document.querySelector('.theme-button-container')


let lightTheme = JSON.parse(localStorage.getItem('lightTheme')) || false
localStorage.setItem('lightTheme' , lightTheme)


const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');
// getting cuntry name , and using that to fetch country data

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res=>res.json())
    // data we get of country is in array , we want array[0] value
    // destructure that array to get 0 index
    .then(([country])=>{
        // console.log(country);
        
        const flag = document.querySelector('.country-container img')
        const name = document.querySelector('.Name')
        const nativeName = document.querySelector('.nativeName')
        const population = document.querySelector('.Population')
        const region = document.querySelector('.Region')
        const subRegion = document.querySelector('.subRegion')
        const capital = document.querySelector('.Capital')
        const domain = document.querySelector('.Domain')
        const currencies = document.querySelector('.currencies')
        const languages = document.querySelector('.languages') 

        flag.src= country.flags.svg
        flag.alt = `${country.name.common} flag`

        name.innerText = country.name.common
        nativeName.innerText = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common
        population.innerText = new Intl.NumberFormat("en-IN").format(country.population)
        region.innerText = country.region
        subRegion.innerText = country.subregion? country.subregion : ''
        capital.innerText = country.capital? country.capital.join(', ') : ''
        domain.innerText = country.tld ? country.tld.join(' ') : ''
        currencies.innerText = country.currencies ? Object.keys(country.currencies).join(', ') : ''
        languages.innerText = country.languages ? Object.values(country.languages).join(', ') : ''
        
        const borderCountriesContainer = document.querySelector('.Border-countries-container')
        if(country.borders){
            country.borders.forEach(border => {
            
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then(res => res.json())
                    .then(([data]) => {
                        const borderCountry = document.createElement('a') 
                        borderCountry.classList.add('capitalize')
                        borderCountry.innerText = data.name.common
                        
                        borderCountry.href = `/country.html?name=${data.name.common}`
                        borderCountriesContainer.append(borderCountry)
                })  
            });
        }    
    }
)

// for theme light and light
themeChanger.addEventListener('click' , (e)=>{
    body.classList.toggle('light-theme')
    lightTheme = !lightTheme
    localStorage.setItem('lightTheme' , lightTheme)
})

function applyTheme(){
    if(JSON.parse(localStorage.getItem('lightTheme'))){
        body.classList.add('light-theme')
        // console.log('added');
    }else{
        body.classList.remove('light-theme')   
        // console.log('removed');
    }
}
window.addEventListener('storage', (e)=> {
    if (e.key === 'lightTheme') {
        applyTheme();
    }
});
applyTheme()


