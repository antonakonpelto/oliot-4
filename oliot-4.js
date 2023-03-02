var nappi1 = document.getElementById("btn1").classList;
var rahaSummaMaksunJalkeen = 0;
var korkoPlusLaina = 0;
var muisti = [];

var updating = false;
var tilitehty = false;
var lainojenMaara = 0;

class Pankki {
    constructor(tilinumero, saldo, historia, korkoProsentti, korko, luottoraja, laina, lainaaJaljella, nettoTulot, lainaEnnen, luottoprosentti, korkoPlusLainaClassGlobal) {
        this.tilinumero = String(tilinumero);
        this.saldo = Number(saldo);
        this.historia = historia;
        this.korkoProsentti = Number(korkoProsentti);
        this.korko = Number(korko);

        this.luottoraja = Number(luottoraja);

        this.laina = Number(laina);
        this.lainaaJaljella = Number(lainaaJaljella);
        this.nettoTulot = Number(nettoTulot);
        this.lainaEnnen = Number(lainaEnnen);
        this.luottoprosentti = Number(luottoprosentti);
        this.korkoPlusLainaClassGlobal = Number(korkoPlusLainaClassGlobal);
    }
    update() { // Itestäänpäivittyvä historia
        if(updating == false){
            updating = true
            nappi1.add("on")
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
                    if(tallete < -1){ // 90% varmuudella turha
                        document.getElementById("talleteIlmoite").innerHTML = "Syötä vain positiivisia lukuja"
                    } else {
                        if(tallete == 0){ // Jos ei talleta mitään
                            document.getElementById("talleteIlmoite").innerHTML = "Et voi tallettaa 0€"
                        } else{
                        this.saldo += tallete; // Saldoon lisätään tallete
                        document.getElementById("talleteIlmoite").innerHTML = "Talletit saldoosi " + tallete + "€"
                        this.historia.push(hankiAika() + ": Talletit " + tallete + "€" + ". Saldo ennen talletusta: "+ ennenTallete +"€. Saldo talletuksen jälkeen: " + this.saldo +"€"+"<br>")
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

    otaLainaa(x){ // ottaa lainanOtto() funktiosta parametrin vastaan x:nä
        // Ottaa input-kentästä arvon
        var lainanMaara = Number(document.getElementById("buttonLaina").value);        
        // array johon laittaa muistiin lainalukuja
        var lainaMuisti = [];

        // X:n tarkoitus on tunnistaa jos haluttiin nappia painamalla ottaa lainaa, ja että kun funktion testiosioissa pyydetään asiaa, lainaa ei havingossa oteta
        if(tilitehty == true && x == false){
            if(isNaN(lainanMaara)){ // Tarkistaa sisältääkö numero stringejä
                document.getElementById("lainaTeksti").innerHTML = "Syötä vain numeroita";
            } else {

                if(lainanMaara < 0){ // Tarkistaa onko numero negatiivinens
                    document.getElementById("lainaTeksti").innerHTML = "Älä syötä negatiivisia lukuja";
                }else{

                        if(lainojenMaara == 1){ // Katsoo onko kyseessä ensimmäinen kerta kun lainaa otetaan
                            this.laina = lainanMaara; // Jos on eka kerta annetaan lainalle lainanmäärä arvoksi
                            
                        }else{ // Jos ei ole ensimmäinen kerta kaikki lainat yhdistetään samaan kasaan
                            this.laina += lainanMaara;
                        }
                            // Määrittää korkoprosentin
                            this.korkoProsentti = 10;
                            // Laskee koron
                            this.korko = Math.floor(this.laina * this.korkoProsentti / 100);

                            // Ottaa lainan ennen kuin se pävitetään uuteen = ottaa vanhan lainan
                            this.lainaEnnen = korkoPlusLaina;

                            // Laskee koron ja lainan yhteen
                            korkoPlusLaina = this.korko + this.laina; 
                            this.korkoPlusLainaClassGlobal = korkoPlusLaina

                            // Laittaa muistiin koron ja lainan summan x2
                            lainaMuisti.push(korkoPlusLaina);
                            muisti.push(korkoPlusLaina);

                            // Kirjoittaa ja tallettaa historiaan tapahtuman
                            document.getElementById("lainaTeksti").innerHTML = "Otit lainaa: " + lainanMaara + "€";
                            this.historia.push(hankiAika() + ": Otit lainaa " + lainanMaara + "€. Maksettavaa lainaa ennen lainanottoa: " + this.lainaEnnen + "€. Lainanoton jälkeen: " + korkoPlusLaina);
                            if(updating == true){
                                this.naytaTiedot(); // Päivittää itse jos päällä
                            }
                            document.getElementById("buttonLaina").value = "";  // Tyhjentää input-kentän
                    }
            }
        }else if(tilitehty == true){}else{
            document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
        }

        // Seuraavat testaa onko luku kelvollinen
        if (lainojenMaara == 0) {
            
            if(isNaN(lainanMaara)){ 
                console.log("nan");
                document.getElementById("lainaTeksti").innerHTML = "Syötä vain numeroita";
                return false
            } else if (lainanMaara < 0) {
                document.getElementById("lainaTeksti").innerHTML = "Älä syötä negatiivisia lukuja";
                console.log("negatiivinen");
                return false
            }else{
                return true
            }
        }
    }

    lainaOtto() {
        let x = false
        if(tilitehty == true){

            if(confirm("Haluatko ottaa lainaa?") == true){ 

                if(pankkiTili.otaLainaa() == true){ // Ottaa vastaan testauksen vastaukset
                    lainojenMaara++; // Kasvattaa lainanottomäärää yhdellä

                    if(lainojenMaara != 0){ // Jos lainojen määrä on mikätahansa muu kuin nolla, suorita funktio ja lähetä sille samalla parametrinä x
                        pankkiTili.otaLainaa(x);

                        if(updating == true){
                            this.naytaTiedot(); // Päivittää itse jos päällä
                        }   
                    }
                }
            }
        }else{
            document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
        }
    }

    lainanMaksu() {
        if (tilitehty == true) {
            var maksettuLaina = Number(document.getElementById("lainanMaksu").value)
            if(isNaN(maksettuLaina) == true){ // Tarkistaa onko luvussa stringejä
               console.log("Syötä vain numeroita");
               document.getElementById("lainanmaksuTeksti").innerHTML = "Syötä vain numeroita";
            }else{
                if(maksettuLaina <= -1){ // testaa onko luku miinus
                    document.getElementById("lainanmaksuTeksti").innerHTML = "Älä syötä negatiivisia lukuja";
                } else{
                    console.log(this.lainaaJaljella , maksettuLaina ,   this.lainaaJaljella - maksettuLaina);
                    if(this.lainaaJaljella - maksettuLaina == NaN){
                        if(maksettuLaina < 0){
                            document.getElementById("lainanmaksuTeksti").innerHTML = "Lainasi menee miinukselle";
                        }
                    }else{
                        if(this.lainaaJaljella - maksettuLaina <= -1){
                            document.getElementById("lainanmaksuTeksti").innerHTML = "Lainasi menee miinukselle";
                        } else {
                            // Ottaa muistista ensimmäisen luvun ja miinustaa siitä maksetun arvon
                            this.lainaaJaljella = muisti[0] - maksettuLaina;
                            // Päivittää listan ensimmäisen arvon 
                            muisti.splice([0],1,this.lainaaJaljella )
    
                            // Päivittää ja lähettää tekstin
                            document.getElementById("lainanmaksuTeksti").innerHTML = "Maksoit lainaasi: " + maksettuLaina + "€";
                            this.korkoPlusLainaClassGlobal = this.lainaaJaljella;
                            this.historia.push(hankiAika() + ": Maksoit lainaa " + maksettuLaina + "€. Laina ennen maksua: " + this.lainaEnnen + "€. Maksun jälkeen: " + this.lainaaJaljella + "€.")
    
                            if(updating == true){
                                this.naytaTiedot(); // Päivittää itse jos päällä
                            }
                            document.getElementById("lainanMaksu").value = "";
                        }
                    }
                }
            }   
        } else {
            document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
        }
    }

    netto(){
        // Ottaa nettotulosi
        var nettoSumma = Number(document.getElementById("nettoTulot").value);

        if (tilitehty == true) {
            if(isNaN(nettoSumma)){
                document.getElementById("nettoTeksti").innerHTML = "Syötä vain numeroita";
            } else {
                if(nettoSumma <0){
                    document.getElementById("nettoTeksti").innerHTML = "Älä syötä negatiivisia lukuja";
                }else{
                    // Antaa nettoTuloille arvon
                    this.nettoTulot = nettoSumma;
                    this.luotto(false); // Lähettää luotto() funktiolle falsen
                    this.historia.push(hankiAika() + ": Ilmoitit nettotulosi olevan: " + this.nettoTulot + "€.")

                    if(updating == true){
                        this.naytaTiedot(); // Päivittää itse jos päällä
                    }
                    document.getElementById("nettoTulot").value = "";
                }
            }
        } else {
            document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
        }
    }

    luotto(netostaTiedot){

        var luottoSumma = Number(document.getElementById("luottoMaara").value);

        if(tilitehty == true){
            if(isNaN(luottoSumma)){ // samat testit
                document.getElementById("luottoTeksti").innerHTML = "Syötä vain numeroita";
            } else{
                if(luottoSumma < 0){
                    document.getElementById("luottoTeksti").innerHTML = "Älä syötä negatiivisia lukuja";
                }
            }
            // Korkoprosentin default = 0
            var otettuKorkoProsentti = 0;
            // Ottaa maksimi määrän luotolle
            var maxLuotto = 25 * this.nettoTulot / 100;

            if(netostaTiedot == false){  // parametreillä lähetetty false tarkistaa painettiinko nettotulo nappia, vai luottonappia
                document.getElementById("luottoTeksti").innerHTML = "Voit ottaa luottoa:" + 0 + "€ - " + maxLuotto +"€";
            }else{ // jos painettiin luottonappia
                // lasketaan luotto prosentteina
                otettuKorkoProsentti = luottoSumma * 25 / maxLuotto;
                this.luottoprosentti = otettuKorkoProsentti
                console.log(this.luottoprosentti);

                // antaa luottorajalle luottosumman
                this.luottoraja = luottoSumma;
                
                this.historia.push(hankiAika() +  ": Otit luottoa: " + luottoSumma + "€.")

                if(updating == true){
                    this.naytaTiedot(); // Päivittää itse jos päällä
                }
                document.getElementById("luottoMaara").value = "";
            }

        }else{
            document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
        }
    }

    naytaTiedot(x, paivita) { // Parametrit tulee vastaan HTML-napeilta
        // Tietonappuloille ja autom. päivitys napeille omat muuttujat
        var buttonNayta = document.getElementById("buttonNayta").classList;
        var buttonPiilota = document.getElementById("buttonPiilota").classList;
        var buttonPaivita = document.getElementById("paivitaTietoja").classList;

        var luottorajaTeksti = 0;

        // Seuraavat kaksi funktiota on automaattipäivityksen ja piilota- / näytätiedot napeille
        // en muista miten ne toimii ja oon liian monimutkasen näköset tehny ja en jaksa edes yrittää ottaa selvää
        if(x == false && updating == true){
            this.update();
        }
        if(x == true || updating == true || paivita == true){
            buttonPiilota.add("show");
            buttonPaivita.add("show");
            buttonNayta.add("hidden");

            if(tilitehty == true){ // Jos tili on tehty
                var historianTeksti = ""; // Tyhjennetään tekstikentät
                document.getElementById("tilitiedot").innerHTML = " ";

                // Luottorajan prosenteille tehty if-lause joka testaa onko kyseessä NaN
                if(luottorajaTeksti == NaN){ 
                    luottorajaTeksti = "0";
                } else { // Jos ei ole NaN, pyöristetään luku 3 desimaalin kohdalle
                    luottorajaTeksti = this.luottoprosentti.toFixed(3);
                }

                // Looppaa historian näytille
                for (let i = 1; i < this.historia.length; i++) {
                    historianTeksti += "<li>- " + this.historia[i] + "</li>"
                    document.getElementById("tilitiedot").innerHTML ="<li>" + "Tilinumero: " + this.tilinumero + "</li>" +"<li>" + "Saldo: " + this.saldo +"€"+ "<br>"  + "</li>" +
                    "</li>"+ "</li>"+ "<li> Laina:"+ this.korkoPlusLainaClassGlobal + "€ " +"<li>"+ "Korko: "+ this.korkoProsentti +"%" +"</li>" +"<li>"+ "Korkoprosentti: "+ this.korkoProsentti +"%" + "</li>"+ "<li> Luotto: "+ this.luottoraja +"€ </li>"+ "<li>"+ 
                    "<li> Luottoprosentti: "+ luottorajaTeksti +"% </li>" +"Tilihistoria: " + historianTeksti + "</li>";
                }
                // Näyttää tilinumeron, saldon ja tilihistorian.

            } else { // Ei näytä jos tilinumeroa ei ole annettu
                 document.getElementById("tilitiedot").innerHTML = "Syötä tilinumerosi";
            }

        } else if (x == false && updating == false){
            buttonPiilota.remove("show");
            buttonNayta.remove("hidden");
            buttonPaivita.remove("show");
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
// Tekee uuden Pankin.     undefined on pitämässä paikkaa

function kysy () {
    var tilinNumero = document.getElementById("tilinumero").value; // Ottaa arvon input-kentästä


    if(tilinNumero.trim() ==""){ // Jos välilyönnit otetaan pois ja tulee tyhjää, tulee virheilmoitus
        document.getElementById("tiliIlmoite").innerHTML = "Syötä tilinumerosi";
    }else {
        if(pankkiTili.checkValidity(tilinNumero) == true){ // Jos checkValidity() palauttaa truen.
            document.getElementById("tiliIlmoite").innerHTML = "Tilinumero lisätty";
            pankkiTili = new Pankki(tilinNumero, 0, ["<br>"], 0, 0);//Undefined muutetaan 0, ja alkuun <br>
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
hankiAika();
function hankiAika() {
    var paivamaara = new Date();
    paivaysIlmanUCT = paivamaara.getUTCDate() +"."+ (paivamaara.getUTCMonth() + 1)   +"."+ paivamaara.getUTCFullYear() +" "+ paivamaara.getUTCHours() +"."+ paivamaara.getUTCMinutes() + "." +paivamaara.getUTCSeconds();
    // Päivämäärä dd.mm.yyyy hh.mm.ss

    return paivaysIlmanUCT;
}