// -------- compte à rebour jusqu'à minuit ---------

const timer = document.getElementById('timer');
console.log(timer);

const minuit = new Date();
minuit.setHours(24,0,0,0);
console.log(minuit);

function mettreAJourTimer(){
    const now = new Date();
    const tempsRestant = minuit - now;
    console.log(tempsRestant);

    const secondes = Math.floor(tempsRestant / 1000) % 60;
    const minutes = Math.floor(tempsRestant / 1000 / 60) % 60;
    const heures = Math.floor(tempsRestant / 1000 / 60 / 60) % 60;

    console.log(heures, minutes, secondes);

    const ss = String(secondes).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const hh = String(heures).padStart(2, '0');

    console.log(hh, mm, ss);

    const affichage = `${hh}:${mm}:${ss}`;
    timer.textContent = affichage;
    timer.setAttribute('datetime', affichage);
}

mettreAJourTimer();
const interval = setInterval(mettreAJourTimer, 1000);

if (tempsRestant <= 0) {
    clearInterval(interval);
    alert('La journée est fini !');
}