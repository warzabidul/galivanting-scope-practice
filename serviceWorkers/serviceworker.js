// version 3
console.log("We are a service worker");

try {
    importScripts("events.js");
} catch (e) {
    console.log("Error importing events.js");
}

console.log("after loading the events.js script");
