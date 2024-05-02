//login-form

let loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit', e=>{
    e.preventDefault()
    const formdata = new FormData(loginForm)
    data = {
        username : formdata.get('username'), 
        password : formdata.get('password')
    }
    fetch('/login', {
        method: 'POST', 
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
    })
    .then(response =>{
        if(!response.ok){
            console.log('Error')
            alert('Wrong Username or Password')
            throw new Error('login failed')
        }
            return response.json()
    })
    .then(data => {console.log('Data : ', data)
            alert('Logged In!')
        })
    .then(()=>{
        body = document.body
        const h1 = document.querySelector('.h1')
        const newh1 = document.createElement('h1')
        newh1.innerHTML = `Welcome ${data.username}`
        body.replaceChild(newh1, h1)
    })
    .catch(error => console.log('Error', error))
})