//Logout

let logout = document.querySelector('.logoutlink')
logout.addEventListener('click', e=>{
    e.preventDefault()
    fetch('/logout', {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
    })
    .then(response => response.text)
    .then(text =>{ alert('Successfully logged out')
        console.log(text);
        window.location.href = '/'
    })
    .catch(error => console.log('Error', error))
})