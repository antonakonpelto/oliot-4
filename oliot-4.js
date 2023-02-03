var paivamaara = new Date();
paivaysIlmanUCT = paivamaara.getDate() +"."+ paivamaara.getMonth()   +"."+ paivamaara.getFullYear() +" "+ paivamaara.getHours() +"."+ paivamaara.getMinutes() + "." +paivamaara.getSeconds();
var updating = false;

var tilitehty = false;

class Pankki {
    constructor(tilinumero, saldo, historia) {
        this.tilinumero = String(tilinumero);
        this.saldo = Number(saldo);
        this.historia = historia;
    }
    update(){
        if(updating == false){
            updating = true
            this.naytaTiedot();
        } else {
            updating = false
        }
    }
    talleta() {
        if(tilitehty == true){
            var ennenTallete = this.saldo;
            var tallete = Number(document.getElementsByClassName("talletus")[0].value);
            if(tallete == 0){
                document.getElementById("talleteIlmoite").innerHTML = "Et voi tallettaa 0€"
            } else{
            this.saldo += tallete;
            // document.getElementById("talleteIlmoite").innerHTML = "Talletit saldoosi " + tallete + "€"
            this.historia.push(paivaysIlmanUCT + ": Talletit " + tallete + "€" + ". Saldo ennen talletusta: "+ ennenTallete +"€. Saldo talletuksen jälkeen: " + this.saldo +"€"+"<br>")
            document.getElementById("formTallete").value = "";
            if(updating == true){
                this.naytaTiedot();
            }
            }
        } else {
            alert("Syötä tilinumero")
            document.getElementById("formTallete").value = "";
        }
    }
    nosta() {
    if(tilitehty == true){
            var nosto = Number(document.getElementsByClassName("nosto")[0].value)
            if(this.saldo == 0){
                document.getElementById("nostoIlmoite").innerHTML = "Virhe: Saldosi on tyhjä"
            } else {
                var ennenNosto = this.saldo;
                if(this.saldo - nosto <= -1){
                    document.getElementById("nostoIlmoite").innerHTML = "Virhe: Yritit nostaa enemmän rahaa kuin sinulla"
                } else {
                    if(nosto == 0){
                        document.getElementById("nostoIlmoite").innerHTML = "Et voi nostaa 0€";
                    } else {
                        this.saldo -= nosto;
                        // document.getElementById("nostoIlmoite").innerHTML = "Nostit saldostasi " + nosto + "€"
                        this.historia.push(paivaysIlmanUCT + ": Nostit " + nosto + "€" + ". Saldo ennen nostoa: "+ ennenNosto  + "€. Saldo noston jälkeen: " + this.saldo+"€" + "<br>")
                        if(updating == true){
                            this.naytaTiedot();
                        }
                    }
                }
            }
            document.getElementById("formNosto").value = "";
        } else {
            alert("Syötä tilinumero")
            document.getElementById("formTallete").value = "";
        }
    }
    naytaTiedot() {
        if(tilitehty == true){
            document.getElementById("tilitiedot").innerHTML = "Tilinumero: " + this.tilinumero + "<br>" + "Saldo: " + this.saldo +"€"+ "<br>" + "Tilihistoria: " + this.historia 
            console.table(this.historia);
        } else {
            alert("Syötä tilinumerosi")
        }
        
    }
    
    // naytaHistoria() {
        
    // }
}

var pankkiTili = new Pankki(undefined, 0, []);

function kysy () {
    var tilinNumero = document.getElementById("tilinumero").value;
    if(tilinNumero == " " || tilinNumero == ""){
        document.getElementById("tiliIlmoite").innerHTML = "Syötä tilinumerosi";
        alert("Syötä tilinumerosi");
    }else {
        document.getElementById("tiliIlmoite").innerHTML = "Tilinumero lisätty";
        // this.historia.push(paivaysIlmanUCT + " Kirjauduit tilillesi")
        pankkiTili = new Pankki(tilinNumero, 0, ["<br>"]);
        tilitehty = true;
    }
    
    if(tilitehty == true){
        var nappi1 = document.getElementById("btn1").classList;
        nappi1.add("show");
    }
}







// Array historian sisälle:

// Päivämäärä (Date-olio)
// Tapahtuma (string, esim. "Nosto" tai "Talletus")
// Summa (number)
// Saldo ennen tapahtumaa (number)