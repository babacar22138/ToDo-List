// -------- compte à rebour jusqu'à minuit ---------

const timer = document.getElementById('timer');
console.log(timer);

const minuit = new Date();
minuit.setHours(24,0,0,0);
console.log(minuit);

function mettreAJourTimer(){
    const now = new Date();
    const tempsRestant = minuit - now;
    // console.log(tempsRestant);

    const secondes = Math.floor(tempsRestant / 1000) % 60;
    const minutes = Math.floor(tempsRestant / 1000 / 60) % 60;
    const heures = Math.floor(tempsRestant / 1000 / 60 / 60) % 60;

    // console.log(heures, minutes, secondes);

    const ss = String(secondes).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const hh = String(heures).padStart(2, '0');

    // console.log(hh, mm, ss);

    const affichage = `${hh}:${mm}:${ss}`;
    timer.textContent = affichage;
    timer.setAttribute('datetime', affichage);

    if (tempsRestant <= 0) {
        clearInterval(interval);
        alert('La journée est fini !');
        timer.style.background = '#FF1744';
    }
}

mettreAJourTimer();
const interval = setInterval(mettreAJourTimer, 1000);



// -------- ajout des tasks ---------

const inpTask = document.getElementById('add-task');
const selectPriority = document.getElementById('priority-select');
const btnAddTask = document.getElementById('btn-add');
const listTasks = document.querySelector('.list-tasks');
console.log(inpTask, selectPriority, btnAddTask, listTasks);


btnAddTask.addEventListener('click', () =>{
    if(inpTask.value === ''){
        alert('Enter a task on the input asking.');
        return;
    }
    const taskTitle = inpTask.value;
    const taskPriority =selectPriority.value;

    const li = document.createElement('li');

    li.innerHTML = `
        <span class="colorTask ${taskPriority}"></span>
        <p>${taskTitle}</p>
        <input type="checkbox" name="validationTask" class="validationTask">
        <i class="fa-solid fa-trash"></i>
    `;

    li.setAttribute('draggable', true);
    listTasks.appendChild(li);

    inpTask.value = '';
    console.log(taskTitle, taskPriority);
});

// -------- suppression des tasks ---------

listTasks.addEventListener('click', (event) => {
    console.log(event.target);
    if(event.target.classList.contains('fa-trash')){
        event.target.parentElement.remove();
    }else if(event.target.classList.contains('validationTask')){
        event.target.parentElement.classList.toggle('removeTask');
    }
})


// -------- drag and drop ---------

let liDragged = null;

listTasks.addEventListener('dragstart', (event) => {
    const li = event.target.closest('li');
    if(li){
        liDragged = li;
    }
});

listTasks.addEventListener('dragover', (event) => {
    event.preventDefault();
});

listTasks.addEventListener('drop', (event) => {
    event.preventDefault();
    const li = event.target.closest('li');
    if(li && li !== liDragged){
        listTasks.insertBefore(liDragged, li);
    }
});
