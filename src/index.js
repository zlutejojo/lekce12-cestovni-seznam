/*
Vytvoř seznam, do kterého si budeš moci přidávat věci, které si máš sbalit na cestu.
Věci v seznamu by měly zůstat i po obnovení stránky (refresh, zavření prohlížeče, apod.)
*/


const formElement = document.querySelector('#formular'); // formulář
const itemElement = document.querySelector('#polozka'); // pole pro zadávání
const listElement = document.querySelector('#seznam'); // <ul>, kam vypisujeme seznam

/* pole pro seznam položek */
// kdyz nic v local storage neni, tak dostanu undefined a to je pravdivostni hodnota false
//pokud je prvni cast pravda, tak uz se to dal nevyhodnocuje
const travelList = JSON.parse(localStorage.getItem('travelList')) || [];
ukazSeznam();

formElement.addEventListener('submit', pridejPolozku);

//udalosti se deleguji i na rodice, takze kliknu na dite a provede se akce 2x na diteti i rodici
listElement.addEventListener('click', priKliknuti);

function priKliknuti(e) {
    if (e.target.matches('input[type=checkbox]')) {
        let index = e.target.dataset.index;
        //uloz opak dovnitr
        travelList[index].checked = !travelList[index].checked; 
        localStorage.setItem('travelList', JSON.stringify(travelList));
    }

}

function pridejPolozku(e){
    // toto zabrání vykonání standardní akce události
    e.preventDefault();
    let item = {
        text: itemElement.value,
        checked: false
    };
    
    travelList.push(item);

    ukazSeznam();

    formElement.reset();

    localStorage.setItem('travelList', JSON.stringify(travelList));
    

}


function ukazSeznamForEach() {
    // toto se dá udělat forem, přemapovat, reduc

    let html = '';

    //arrow function, ktera ma vic nez 1 parametr, tak ty parametry musi byt v zavorce
    travelList.forEach((item, index) => {
        //tady nemůžu psát podmínky, tak se dá použít ternární operátor, kdyby to bylo komplikovanější tak tam lze volat funkci
        //když chci mít v html zaškrtnutý checkbox tak musím mít u toho prvku existující atribut checked
        html += `
        <li>
            <input type="checkbox" data-index="${index}" name="item${index}" id="item${index}" ${item.checked ? 'checked' : ''}>
            <label for="item${index}">${item.text}</label>
        </li>
        `;
    });




    listElement.innerHTML = html;

}


function ukazSeznamMap(){

    let html = travelList.map((item, index) => {
        return `
            <li>
                <input type="checkbox" data-index="${index}" name="item${index}" id="item${index}" ${item.checked ? 'checked' : ''}>
                <label for="item${index}">${item.text}</label>
            </li>
        `;
        //vysledek je pole, takze na nej muzu volat metodu join, kde v parametru je oddelovac
    }).join('')


    listElement.innerHTML = html;


}

// redukuju pole na jednu hodnotu, prvni parametr je funkce, ktera ma parametry promena, do kter se bude promenna scitat, 2. parametr je polozka pole
// 2. parametr reduce je výchozí hodnota pro soucet
function ukazSeznam() {

    
    let html = travelList.reduce((suma, item, index) => {
        return suma + `
            <li>
                <input type="checkbox" data-index="${index}" name="item${index}" id="item${index}" ${item.checked ? 'checked' : ''}>
                <label for="item${index}">${item.text}</label>
            </li>
        `;
        //vysledek je pole, takze na nej muzu volat metodu join, kde v parametru je oddelovac
    }, '') ;



    listElement.innerHTML = html;

}

