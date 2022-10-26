const titleInput = document.querySelector('#title');
const titleB = document.querySelector('#titleB');
const scopeInput = document.querySelector('#scope');
const scopeB = document.querySelector('#scopeB');
const startInput = document.querySelector('#startDate');
const endInput = document.querySelector('#endDate');
const addTask = document.querySelector('#addTask');
const statusHold = document.querySelector('.status-hold');
const cancelTaskAdd = document.querySelector('#cancel');
const showTask = document.querySelector('.showTask');
const startDateInput = document.querySelector('#startDate');
const endDateInput = document.querySelector('#endDate');
const today = document.querySelector('#today');
const buttons = document.querySelectorAll('.buttons');

const titleError = document.querySelector('#titleError');
const scopeError = document.querySelector('#scopeError');
const startError = document.querySelector('#startError');
const endError = document.querySelector('#endError');
const precedeEnd = document.querySelector('#precedeEnd');
const precedeStart = document.querySelector('#precedeStart');

const viewStart = document.querySelector('#viewStart')
const viewEnd = document.querySelector('#viewEnd')

let title;
let scope;
let startDate;
let endDate;
let currentDate;
let statas;

//CREATING AN ARRAY FOR ALL THE TASKS
const TASKS = [];

//CREATING AN OBJECT FOR THE TASK

class Task{
    constructor(title, scope, startDate, endDate, currentDate, statas){
        this.title = title;
        this.scope = scope;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentDate = currentDate;
        this.statas = statas;
    }
    //CREATING THE FUNCTION THAT WILL SHOW THE TASK WHEN THE VIEW BUTTON IS CLICKED
    view(){
        statusHold.innerHTML = '';
        titleB.value = this.title;
        scopeB.value = this.scope;
        viewStart.textContent = new Date(this.startDate);
        viewEnd.textContent = new Date(this.endDate);
        today.textContent = new Date(this.currentDate);

        const statusDisplay = document.createElement('p');
        statusDisplay.setAttribute('class', 'status');
        statusDisplay.textContent = this.statas;
        statusHold.appendChild(statusDisplay);

        let updateStatus = setInterval(() => {
            let update = new Date().getTime();
            if(update >= this.startDate){
                this.statas = 'Started';
                statusDisplay.textContent = this.statas;

                clearInterval(updateStatus);

                const onGoing = document.createElement('button');
                onGoing.textContent = 'Start'
                buttons[1].appendChild(onGoing);

                const toOnGoing = ()=>{
                    if(update >= this.startDate && update <= this.endDate){
                        this.statas = 'Ongoing';
                        statusDisplay.textContent = this.statas;
                    }
                }

                onGoing.addEventListener('click', ()=>{toOnGoing()});
            }
        }, 1000);
    }
}

//CANCEL BUTTON
cancelTaskAdd.addEventListener('click', ()=>{
    titleInput.value = '';
    scopeInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
})

//ALL THE ERRORS WILL BE IN THIS ARRAY
const errors = [];
addTask.addEventListener('click', ()=>{

    //EMPTYING THE ARRAY FIRST AT EVERY CLICK
    for(i=0; i<errors.length; i++){
        errors.pop();
    }

    //GETTING THE START AND END DATE OF THE TASK FROM THE INPUT
    let a = startDateInput.value;
    let b = endDateInput.value;

    //TURNING THE DATE AND TIME FROM THE INPUT INTO MILISECONDS
    a = new Date(a).getTime()
    b = new Date(b).getTime()

    //GETTING THE TIME THE TASK WAS CREATED
    currentDate = new Date().getTime();

    //ADDING TO THE ERROR ARRAY IF THERES AN ERROR AND POPPING IT IF THERE'S NONE
    if(titleInput.value.length == 0 || isNaN(titleInput.value.length)){
        errors.push('Title Error');
        titleError.style.display = 'block';
    }else{
        titleError.style.display = 'none';
        errors.pop();
        console.log(titleInput.value.length);
    }

    if(scopeInput.value == ''){
        errors.push('Scope Error');
        scopeError.style.display = 'block';
    }else{
        scopeError.style.display = 'none';
        errors.pop();
    }
    
    if(isNaN(a)){
        errors.push('Start date error');
        startError.style.display = 'block';
    }else{
        startError.style.display = 'none';
        errors.pop();
    }
    
    if(isNaN(b)){
        errors.push('End date error');
        endError.style.display = 'block';
    }else{
        endError.style.display = 'none';
        errors.pop();
    }

    if(b<a || b<currentDate || b == a){
        errors.push('End date precede error');
        precedeEnd.style.display = 'block';
    }else{
        precedeEnd.style.display = 'none';
        errors.pop();
    }

    if(a<currentDate){
        errors.push('Start date precede error');
        precedeStart.style.display = 'block';
    }else{
        precedeStart.style.display = 'none';
        errors.pop;
    }

    if(errors.length > 0){
        console.log(errors);
        return;
    }

    //GETTING THE SCOPE AND TITLE FROM THE INPUT
    title = titleInput.value;
    scope = scopeInput.value;
    startDate = a;
    endDate = b;
    statas = 'pending';
    
    //CREATING A NEW TASK
    const newTask = new Task(title, scope, startDate, endDate, currentDate, statas)

    //CREATING A DIV FOR THE TASK
    const taskHolder = document.createElement('div');
    taskHolder.setAttribute('class', 'task');
    showTask.appendChild(taskHolder);

    //CREATING A HEADER FOR THE TASK TITLE AND APPENDING IT
    const titleHead = document.createElement('h3');
    titleHead.textContent = newTask.title;
    taskHolder.appendChild(titleHead);

    //CREATING A PARAGRAPH FOR THE TASK DATES AND APPENDING IT
    const timeDisplay = document.createElement('p');
    timeDisplay.setAttribute('class', 'dateDisplays');
    taskHolder.appendChild(timeDisplay);

    //CREATING A SPAN FOR THE TASK START DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
    const showStart = document.createElement('span');
    let rawA = new Date(newTask.startDate);
    let rawA1 = rawA.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
    let rawA2 = rawA.toLocaleTimeString('en-US');
    showStart.textContent = `${rawA1} ${rawA2}`;

    //CREATING A SPAN FOR THE TASK END DATE AND APPENDING IT I'M ALSO CONVERTING IT TO NORMAL SHORT TIME
    const showEnd = document.createElement('span');
    let rawB = new Date(newTask.endDate);
    let rawB1 = rawB.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day:'2-digit'});
    let rawB2 = rawB.toLocaleTimeString('en-US');
    showEnd.textContent = `${rawB1} ${rawB2}`;

    timeDisplay.appendChild(showStart);
    timeDisplay.appendChild(showEnd);

    //ADDING EVENT LISTERNER TO THE BUTTON THAT WILL BE CREATED DYNAMICALLY
    const viewTask = document.createElement('button');
    viewTask.textContent = 'View';
    taskHolder.appendChild(viewTask);
    viewTask.addEventListener('click', ()=>{newTask.view()})

    TASKS.push(newTask);

})
