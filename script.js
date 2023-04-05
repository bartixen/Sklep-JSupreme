const input_imie = document.getElementById("input_imie");
const input_nazwisko = document.getElementById("input_nazwisko");
const input_adres = document.getElementById("input_adres");
const input_email = document.getElementById("input_email");
const dodaj = document.getElementById("dodaj");
const selekty = document.getElementById("selekty");
const checkbox_wysylka = document.getElementById("checkbox_wysylka");
const checkbox_prezent = document.getElementById("checkbox_prezent");
const checkbox_bandana = document.getElementById("checkbox_bandana");
const wyslij = document.getElementById("wyslij");
const zamowienie = document.getElementById("zamowienie");
const logo = document.getElementsByName('logo');
let radio = true;
let ile_produktow = 5;

for(let i = 0; i < logo.length; i++) {
    logo[i].onchange = function(){ radio = this.value; };
}

dodaj.onclick = function(e) {
    e.preventDefault();
    if (ile_produktow<1) {
        return;
    }
    ile_produktow = ile_produktow-1;
    if (ile_produktow == 0)
        dodaj.disabled = true;
    dodaj_select(ile_produktow);
    dodaj.innerHTML = `Dodaj (${ile_produktow})`
}

function dodaj_select(w) {
    let selection = document.createElement("select");
    selection.id = `sel_${w}`;
    let produkty = ['bluza 200 zł', 'kurtka 250 zł', 'tshirt 100 zł', 'bokserki 50 zł', 'bandana 35 zł'];
    let cena = [200, 250, 100, 50, 35]
    for (let i=0; i<5; i++) {
        let option = document.createElement("option");
        option.innerText = produkty[i];
        option.value = cena[i];
        selection.appendChild(option);
    }
    selekty.appendChild(selection);
}

function przedmiot(w) {
    let produkty = ['<br>- kurtka 250 zł', '<br>- bluza 200 zł', '<br>- tshirt 100 zł', '<br>- bokserki 50 zł', '<br>- bandana 35 zł'];
    switch(Number(w)) {
        case 250:
            zamowienie.innerHTML += produkty[0];
            break;
        case 200:
            zamowienie.innerHTML += produkty[1];
            break;
        case 100:
            zamowienie.innerHTML += produkty[2];
            break;
        case 50:
            zamowienie.innerHTML += produkty[3];
            break;
        case 35:
            zamowienie.innerHTML += produkty[4];
            break;
    }
}

wyslij.onclick = function(e) {
    e.preventDefault();
    zamowienie.innerHTML = `Zamówiłeś w naszym sklepie:<br>`
    let wartosc_calosc = 0;
    for (let i = 0; i<5; i++) {
        if (document.getElementById('sel_' + i) != null) {
            var w = document.getElementById('sel_' + i).value;
            wartosc_calosc += Number(w);
            przedmiot(w);
        }
    }
    if (checkbox_wysylka.checked == true) {
        wartosc_calosc += 15;
        zamowienie.innerHTML += `<br>- wysyłka 15zł`
    }
    if (checkbox_prezent.checked == true) {
        wartosc_calosc += 40;
        zamowienie.innerHTML += `<br>- opakowanie na prezent 40 zł`
    }
    if (checkbox_bandana.checked == true) {
        wartosc_calosc += 25;
        zamowienie.innerHTML += `<br>- dodatkowa bandana 25 zł`
    }
    if (radio == true) {
        wartosc_calosc = wartosc_calosc * 0.95;
        console.log(radio)
    }
    zamowienie.innerHTML += `<br><br>na łączną kwotę <b>${wartosc_calosc}zł</b> z czego <b>${(wartosc_calosc * 0.23).toFixed(2)}zł</b> to podatek vat.`;
    if (radio == true) {
        zamowienie.innerHTML += `<br><br>Dziękujemy za Twoją gotowość reklamowania naszej firmy`;
    }
    
    if (wartosc_calosc<300) {
        zamowienie.style.backgroundColor = "brown";
    } else if (wartosc_calosc>299 && wartosc_calosc<=500) {
        zamowienie.style.backgroundColor = "lightgray";
    } else {
        zamowienie.style.backgroundColor = "gold";
    }

    document.cookie = `kwota=${wartosc_calosc} ; path=/ ; max-age=${60*60*24*3}`;
}