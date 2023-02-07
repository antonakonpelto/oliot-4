var nappi1 = document.getElementById("btn1").classList;

var updating = false;
var tilitehty = false;

class Pankki {
    constructor(tilinumero, saldo, historia) {
        this.tilinumero = String(tilinumero);
        this.saldo = Number(saldo);
        this.historia = historia;
    }
    update() { // Itestäänpäivittyvä historia
        if(updating == false){
            updating = true
            nappi1.add("on")
            // this.naytaTiedot();
        } else {
            updating = false
            nappi1.remove("on")
        }
    }
    talleta() {
        if(tilitehty == true){ // Jos tilinumero on annettu
            var ennenTallete = this.saldo; // Ottaa ennen talletusta olevan saldon
            var tallete = Number(document.getElementsByClassName("talletus")[0].value) // Ottaa Inputista arvot
            if(isNaN(tallete) == true){ // Jos sisältää kirjaimia
                document.getElementById("talleteIlmoite").innerHTML = "Virhe: Syötä vain numeroita"
                document.getElementById("formTallete").value = "";

            } else {
                if(this.saldo + tallete <0){ // Katsoo meneekö miinukselle
                    document.getElementById("talleteIlmoite").innerHTML = "Virhe: Et voi nostaa miinuksella"
                }else{
                    if(tallete < -1){
                        document.getElementById("talleteIlmoite").innerHTML = "Syötä vain positiivisia lukuja"
                    } else {
                        if(tallete == 0){ // Jos ei talleta mitään
                            document.getElementById("talleteIlmoite").innerHTML = "Et voi tallettaa 0€"
                        } else{
                        this.saldo += tallete; // Saldoon lisätään tallete
                        document.getElementById("talleteIlmoite").innerHTML = "Talletit saldoosi " + tallete + "€"
                        this.historia.push(hankiAika() + ": Talletit " + tallete + "€" + ". Saldo ennen talletusta: "+ ennenTallete +"€. Saldo talletuksen jälkeen: " + this.saldo +"€"+"<br>")
                        // setInterval(() => {
                        //     document.getElementById("talleteIlmoite").innerHTML = "";
                        // }, 5000);
                        // Työntää historiaan päiväyksen, talletuksen ja ennen jälkeen saldon
                        document.getElementById("formTallete").value = ""; // Tyhjentää input-kentän
                            if(updating == true){
                                this.naytaTiedot(); // Päivittää itse jos päällä
                            }
                        }
                    }
                }
            }
        } else { // Jos tilinumeroa ei ole annettu
            document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
            document.getElementById("formTallete").value = "";
        }
    }
    nosta() {
    if(tilitehty == true){ // Jos tilinumero on annettu
        var nosto = Number(document.getElementsByClassName("nosto")[0].value) // Ottaa inputista arvon
        if(isNaN(nosto) == true){ // Jos sisältää kirjaimia
            document.getElementById("nostoIlmoite").innerHTML = "Virhe: Syötä vain numeroita"
            document.getElementById("formNosto").value = ""; // Tyhjentää input kentän
        }else {
            if(this.saldo + nosto <0 || nosto < -1){ // Katsoo meneekö miinukselle
                document.getElementById("nostoIlmoite").innerHTML = "Virhe: Et voi nostaa miinuksella"
            } else {
                if(this.saldo == 0){ // Jos yrität nostaa ja saldo == 0, et voi
                    document.getElementById("nostoIlmoite").innerHTML = "Virhe: Saldosi on tyhjä"
                } else {
                    var ennenNosto = this.saldo; // Ottaa ennen nostoa olevan saldoluvun
                    if(this.saldo - nosto <= -1){ // Jos saldo-nosto on -1 tai alle, tulee virheilmoitus
                        document.getElementById("nostoIlmoite").innerHTML = "Virhe: Yritit nostaa enemmän rahaa kuin sinulla"
                    } else {
                        if(nosto == 0){ // Jos yrität nostaa 0€ tulee virheilmoitus
                            document.getElementById("nostoIlmoite").innerHTML = "Et voi nostaa 0€";
                        } else {
                            this.saldo -= nosto; // Vähentää saldosta nostomäärän
                            document.getElementById("nostoIlmoite").innerHTML = "Nostit saldostasi " + nosto + "€"
                            this.historia.push(hankiAika() + ": Nostit " + nosto + "€" + ". Saldo ennen nostoa: "+ ennenNosto  + "€. Saldo noston jälkeen: " + this.saldo+"€" + "<br>")
                            // setInterval(() => {
                                // document.getElementById("nostoIlmoite").innerHTML = "";
                            // }, 5000);
                            // Työntää historiaan päiväyksen, noston ja ennen jälkeen saldon
                            if(updating == true){
                                this.naytaTiedot(); // Päivittää automaattisesti jos päällä
                            }
                        }
                    }
                }
            }
            
        }
            document.getElementById("formNosto").value = ""; // Tyhjentää input-kentän
        } else { // Jos tilinumeroa ei ole annettu
            document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
            document.getElementById("formNosto").value = ""; // Tyhjentää input kentän
        }
    }
    naytaTiedot(x) {
        var buttonNayta = document.getElementById("buttonNayta").classList;
        var buttonPiilota = document.getElementById("buttonPiilota").classList;
        if(x == false && updating == true){
            this.update();
        }
        if(x == true || updating == true){
            buttonPiilota.add("show")
            buttonNayta.add("hidden")
            if(tilitehty == true){ // Jos tili on tehty
                var historianTeksti = "";
                document.getElementById("tilitiedot").innerHTML = " ";
                for (let i = 1; i < this.historia.length; i++) {
                    historianTeksti += "<li>- " + this.historia[i] + "</li>"
                    document.getElementById("tilitiedot").innerHTML ="<li>" + "Tilinumero: " + this.tilinumero + "</li>" +"<li>" + "Saldo: " + this.saldo +"€"+ "<br>"  + "</li>" + "<li>" + "Tilihistoria: " + historianTeksti + "</li>";
                }
                // Näyttää tilinumeron, saldon ja tilihistorian.
            } else { // Ei näytä jos tilinumeroa ei ole annettu
                 document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
            }
        } else if (x == false && updating == false){
            buttonPiilota.remove("show")
            buttonNayta.remove("hidden")
            document.getElementById("tilitiedot").innerHTML = "";
        } else {
            console.log("error")
        }
        
        
    }
}




class Valid extends Pankki{
    constructor(tilinumero, saldo, historia){
        super(tilinumero, saldo, historia);
    }
    checkValidity(tilinNumero){
        var regex = /[A-Z]{2}\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{2} ?[\d]{0,0}/; // Suomalaisille IBAN-tunnuksille regex
        if(regex.test(tilinNumero)){
            return true
        } else {
            return false
        }
    }
}


var pankkiTili = new Valid(undefined, 0, []);
// Tekee uuden Pankin.      undefined on pitämässä paikkaa

function kysy () {
    var tilinNumero = document.getElementById("tilinumero").value; // Ottaa arvon input-kentästä


    if(tilinNumero.trim() ==""){ // Jos välilyönnit otetaan pois ja tulee tyhjää, tulee virheilmoitus
        document.getElementById("tiliIlmoite").innerHTML = "Syötä tilinumerosi";
    }else {
        if(pankkiTili.checkValidity(tilinNumero) == true){ // Jos checkValidity() palauttaa truen.
            document.getElementById("tiliIlmoite").innerHTML = "Tilinumero lisätty";
            pankkiTili = new Pankki(tilinNumero, 0, ["<br>"]);//Undefined muutetaan 0, ja alkuun <br>
            pankkiTili.historia.push(hankiAika() + " Kirjauduit tilillesi <br>");
            tilitehty = true; // tili on tehty
        } else {
            document.getElementById("tiliIlmoite").innerHTML = "Tilinumero on virheellinen";
        }
        
    }
    
    if(tilitehty == true){ // Kun tilitehty autom. päivitys nappi tulee näkyviin
        nappi1.add("show");
    }
}

function hankiAika() {
    var paivamaara = new Date();
    paivaysIlmanUCT = paivamaara.getDate() +"."+ paivamaara.getMonth()   +"."+ paivamaara.getFullYear() +" "+ paivamaara.getHours() +"."+ paivamaara.getMinutes() + "." +paivamaara.getSeconds();
    // Päivämäärä dd.mm.yyyy hh.mm.ss

    return paivaysIlmanUCT;
}