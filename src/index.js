/*
Vytvoř seznam, do kterého si budeš moci přidávat věci, které si máš sbalit na cestu.
Věci v seznamu by měly zůstat i po obnovení stránky (refresh, zavření prohlížeče, apod.)
*/


const formElement = document.querySelector('#formular'); // formulář
const itemElement = document.querySelector('#polozka'); // pole pro zadávání
const listElement = document.querySelector('#seznam'); // <ul>, kam vypisujeme seznam

/* pole pro seznam položek */
const travelList = [];

