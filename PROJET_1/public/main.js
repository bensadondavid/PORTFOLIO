//Create a new task
const createTask = ()=>{
    const template = document.querySelector('.task-template');
    const newTask = document.importNode(template.content, true);
    
    let input = newTask.querySelector('input')
    if (input) {
        input.value = '';
    } else {
        console.error('Input not found');
    }

    let container = document.querySelector('.container')
    container.appendChild(newTask)
}
createTask()

let addTask = document.querySelector('.addTask')
addTask.addEventListener('click', e=>{
    e.preventDefault()
    createTask()
})


//Delete a task
let container = document.querySelector('.container')
container.addEventListener('click', e=>{
    if(e.target.classList.contains('minus')){
       const task = e.target.closest('.write-task')
       const allTask = container.querySelectorAll('.write-task')
       if(allTask.length > 1){
        task.remove()
       }
       else{
        const input = task.querySelector('input')
        input.value =''
       }
    }

//Adding a task 
    if(e.target.classList.contains('plus')){
        const task = e.target.closest('.write-task')
        const input = task.querySelector('input[type="text"]')
            if(input.value !== ''){

        const newP = document.createElement('p')
        newP.className = 'pTaskReplace'
        newP.textContent = input.value

        task.replaceChild(newP, input)

        let plusButton = task.querySelector('.plus')
        task.removeChild(plusButton)

        let minusButton = task.querySelector('.minus')
        minusButton.style.marginRight = '2%'

        createTask()
            }
            
            else{
                alert('Task empty !')
            }
        }
})

