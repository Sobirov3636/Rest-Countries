"use strict";

const search = document.querySelector(".searching-box");
const allCountriesWrapper = document.querySelector(".content");
const backBtn = document.querySelector(".going-back");
const singleCountryWrapper = document.querySelector(".main-box");
const neighboor = document.querySelector('.borders-box__ul')


class Allcountries {
  async fetchApi(api) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/${api}`);
      return res.json();
    } catch (error) {
      console.error(`There is something wrong ${error}`);
    }
  }

  //getting all countries
  async getAllCountries() {
    const dataAll = await this.fetchApi("/all");
    return dataAll;
  }
  //getting single country
  async getSingleCountry(name) {
    console.log(name);
    const data = await this.fetchApi(`/name/${name}`);
    return data;
  }
  //render all countries
  async renderAllCountries() {
    const countries = await this.getAllCountries();
    for (let i of countries) {
      const html = `
            <div class="country" data-name= "${i.name.common}">
            <img src="${i.flags.png}" alt="Country name" class="country__flag" />
            <h2 class="country__data country__data--name">${i.name.common}</h2>
            <p class="country__data country__data--population">
              Population: <span>${i.population}</span>
            </p>
            <p class="country__data country__data--region">
              Region: <span>${i.region}</span>
            </p>
            <p class="country__data country__data--capital">
              Capital: <span>${i.capital}</span>
            </p>
          </div>

            `;
      allCountriesWrapper.insertAdjacentHTML("beforeend", html);
    }
  }
  //render single country
  async renderSingleCountry(name) {
    const result = await this.getSingleCountry(name);

    allCountriesWrapper.classList.add("hidden");
    search.classList.add("hidden");
    console.log(result);
    for (const i of result) {
      const singleCountryHtml = `
            
            <div class="main-box ">
          <div class="img">
            <img src="${i.flags.png}" alt="Flag" class="img__flag" />
          </div>
          <div class="content-box">
            <div class="data-box">
              <div class="data-content1">
                <h2 class="data-content1__name">${i.name.common}</h2>
                <p class="data-content1__native-name">
                  Native Name: <span>${i.name.official}</span>
                </p>
    
                <p class="data-content1__population">
                  Population: <span>${i.population}</span>
                </p>
    
                <p class="data-content1__region">Region: <span>${i.region}</span></p>
    
                <p class="data-content1__sub-region">
                  Sub Region: <span>${i.subregion}</span>
                </p>
    
                <p class="data-content1__capital">Capital: <span>${i.capital}</span></p>
              </div>
    
              <div class="data-content2">
                <p class="data-content2__domian">
                  Top Level Domain: <span>${i.altSpellings[0]}</span>
                </p>
    
                <p class="data-content2__currencies">
                  Currencies: <span>${i.currencies[Object.keys(i.currencies)].name}</span>
                </p>
    
                <p class="data-content2__languages">
                  Languages: <span>${i.languages[Object.keys(i.languages)]}</span>
                </p>
              </div>
            </div>
            <div class="borders-box">
              <p class="borders-box__text">Border Countries:</p>
              <ul class="borders-box__ul" >
                ${this.renderBorders(i.borders)}
              </ul>
            </div>
          </div>
        </div>
    
            `;



      
      singleCountryWrapper.insertAdjacentHTML("beforeend", singleCountryHtml);
    }
  }

  renderBorders(borders) {
    return borders ? borders.map((border) => `<li class="borders-box__ul--li"><a>${border}</a></li>`).join('') : `&nbsp &nbsp No borders `
  }
}


const countriesData = new Allcountries();
countriesData.renderAllCountries();

allCountriesWrapper.addEventListener("click", function (e) {
  if (e.target.closest(".country")) {
    const country = e.target.closest(".country")
    countriesData.renderSingleCountry(country.dataset.name);
  }
  singleCountryWrapper.classList.remove("hidden");
  backBtn.classList.remove("hidden");
});


backBtn.addEventListener('click', function() {
    singleCountryWrapper.innerHTML = ''
    singleCountryWrapper.classList.add('hidden')
    backBtn.classList.add('hidden')
    allCountriesWrapper.classList.remove("hidden");
    search.classList.remove("hidden");

})

neighboor?.addEventListener('click', (e) => {
    console.log('test')
    const border = e.target.closest('.borders-box__ul--li')
    if(!border) return
    console.log(border)
    
})













/*
content.addEventListener('click', () => {

})
*/

//  const fn = async function(){
//     const respons = await fetch(`https://restcountries.com/v3.1/name/germany`)
//     const data = await respons.json()
//     console.log(data)
//     return data
// }
// fn()
// console.log(fn)
