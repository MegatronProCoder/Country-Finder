const body = document.querySelector('body')
const themeChanger = document.querySelector('.theme-button-container')
const countriesContainer = document.querySelector('.countries-card-container')

const inputContainer = document.querySelector('.input-container')
const filterByRegion = document.querySelector('.filter-by-region')
const filterOptionContainer = document.querySelector('.Filter-option')
const filterOptions = document.querySelectorAll('.Filter-option a')
const icon = document.querySelector('.filter-by-region a')
const searchInput = document.querySelector('#search-input')
let countryData

let filteredOption = ''
localStorage.setItem('filteredOption' , filteredOption)

let lightTheme = JSON.parse(localStorage.getItem('lightTheme')) || false
localStorage.setItem('lightTheme' , lightTheme)


const urlParams = new URLSearchParams(window.location.search);
const filteredOptionValue = urlParams.get('filteredOption');


fetch('https://restcountries.com/v3.1/all')
    .then((res=>res.json()))
    .then((data =>{
        renderCountry(data)
        // to store all this data of array in country data 
        countryData = data
}))

if(filteredOptionValue){
    localStorage.setItem('filteredOption' , filteredOptionValue)
    fetch(`https://restcountries.com/v3.1/region/${filteredOptionValue}`)
            .then(res=>res.json())
            .then(renderCountry)
}


function renderCountry(data){
    // making it empty , so that whenever a new data is come , previous data will be removed
    // new data will be appeared above
    countriesContainer.innerHTML = ''
    data.forEach((country)=>{
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
            <img class="flag" src="${country.flags.svg}" alt="${country.name.common} flag">
            <div class="country-info">
                <h3 class="Name">${country.name.common}</h3>
                <p><b>Population:&nbsp;&nbsp; </b><span class="Population" >${new Intl.NumberFormat("en-IN").format(country.population)}</span></p>
                <p><b>Region:&nbsp;&nbsp; </b><span class="Region capitalize" >${country.region}</span></p>
                <p><b>Capital:&nbsp;&nbsp; </b>
                    <span class="Capital capitalize" >${
                        country.capital? country.capital.join(', ') : ''
                        }
                    </span>
                </p>
            </div>
        `
        countriesContainer.append(countryCard)    
    })
}
// for light theme

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
   


searchInput.addEventListener('input' , (e)=>{
    // searching implementation
    // filtering data from countryData , for which event value is same as that of country common name
    const filterData = countryData.filter((country)=>{
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    // calling function render for filter data to get those country card 
    renderCountry(filterData)

})

// filter by region
// filtering by region
filterByRegion.addEventListener('click' , (e)=>{
    const arrow = document.querySelector('.filter-by-region a')
    const cross = document.querySelector('.filter-by-region .fa-xmark')
    if(!cross){
        arrow.classList.toggle('fa-chevron-up')
        arrow.classList.toggle('fa-chevron-down')
    }
    filterOptionContainer.classList.toggle('hidden')
    e.stopPropagation()
})
// filterOption
filterOptions.forEach((option)=>{
    // filterOptions is node list of anchor tags 
    
    option.addEventListener('click' , (e)=>{
        filteredOption = e.target.innerText
        // console.log(filteredOption);
        e.target.href = `/?filteredOption=${filteredOption}`  
    })
})
if(localStorage.getItem('filteredOption')){
    const filterByRegionSpan = document.querySelector('.filter-by-region span')
    filterByRegionSpan.innerText = localStorage.getItem('filteredOption')
    const arrow = document.querySelector('.filter-by-region a')
    arrow.classList.remove('fa-chevron-up')
    arrow.classList.add('fa-xmark')
}

// user used filter option , and has chosen an option
// now there will be a cross icon 

icon.addEventListener('click' , (e)=>{
    const filterByRegionSpan = document.querySelector('.filter-by-region span')
    filterByRegionSpan.innerText = 'Filter by Region'
    
    const cross = document.querySelector('.filter-by-region .fa-xmark')
    if(cross){
        cross.href='/'
    }   
})
document.addEventListener('click' , (e)=>{
    filterOptionContainer.classList.add('hidden')
})





