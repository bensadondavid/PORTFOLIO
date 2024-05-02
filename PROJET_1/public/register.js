//Register-form

let registerForm = document.querySelector('.register-form')
registerForm.addEventListener('submit', e=>{
    e.preventDefault()
    const formdata = new FormData(registerForm)
    data = {
        username : formdata.get('username'),
        password : formdata.get('password'),
        email : formdata.get('email')
    }
    fetch('/register', {
        method : 'POST', 
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    })

    .then(response => {
        if(!response.ok){
            console.log('Error in the response')
        }
        else{
            return response
        }
    })
    .then(data =>{
        console.log(data)
        alert('User created successfully')
    })
    .catch(error =>{
        console.log('Error', error)
    })
})




