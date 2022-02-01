'use strict';
// added for xhr to work: see: https://stackoverflow.com/questions/32604460/xmlhttprequest-module-not-defined-found

// var XMLHttpRequest = require('xhr2');
// var xhr = new XMLHttpRequest();

//test url

// For Street addresses

//const url = 'https://us-street.api.smartystreets.com/street-address?key=117142354042657436&street=1428%20Post%20Aly&street2=&city=Seattle&state=WA&zipcode=98101&candidates=10&match=invalid';

const url = 'https://us-street.api.smartystreets.com/street-address?key=117142354042657436&';

const urlPark = 'https://developer.nps.gov/api/v1/parks?api_key=yourkeyhere';


const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipField = document.querySelector('#zip');

const UrlUpdateUISuccess = function(data) {
    const parsedData = JSON.parse(data);
//    console.log(parsedData);
    const zip = parsedData[0].components.zipcode;
    const plus4 =parsedData[0].components.plus4_code;
//    console.log(zip + '-' + plus4);
    zipField.value = zip + '-' + plus4
};

const ParkUpdateUISuccess = function(data) {
    console.log(data);
};

const UrlUpdateUIError = function(error) {
    console.log(error);
};

const ParkUpdateUIError = function(error) {
    console.log(error);
};

const responseMethod = function(httpRequest, succeed, fail) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            succeed(httpRequest.responseText);
        } else {
            fail(httpRequest.status + ': ' + httpRequest.responseText);
        }
    }
}

const createRequest = function(url, succeed, fail) {
    const httpRequest = new XMLHttpRequest(url);
    httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest, succeed, fail));
    httpRequest.open('GET', url);
    httpRequest.send();
};

const checkCompletion = function() {
    if (addressField.value !== '' &&
        cityField.value !== '' &&
        stateField.value !== '') {
            const requestURL = url + 
            '&street=' + addressField.value + 
            '&city=' + cityField.value + 
            '&state=' + stateField.value;
            createRequest(requestURL, UrlUpdateUISuccess, UrlUpdateUIError);
        }
}

createRequest(url);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);

createRequest(urlPark, ParkUpdateUISuccess, ParkUpdateUIError);

/*
// For National parks

const updateUISuccess = function(data) {
    console.log(data);
};

const updateUIError = function(error) {
    console.log(error);
};

const responseMethod = function(httpRequest) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            updateUISuccess(httpRequest.responseText);
        } else {
            updateUIError(httpRequest.status + ': ' + httpRequest.responseText);
        }
    }
}

const createRequest = function(url) {
    const httpRequest = new XMLHttpRequest(url);
    httpRequest.addEventListener('readystatechange', (urlPark) => responseMethod(httpRequest));
    httpRequest.open('GET', url);
    httpRequest.send();
};

*/
