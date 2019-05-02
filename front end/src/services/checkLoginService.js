function checkLogin(printMessageFlag){
    let signedInEmail = localStorage.getItem('email');
    if(signedInEmail === 'null'){
        if(printMessageFlag){
            alert('You must login first');    
        }
        window.location.href = '/login';
        return true;
    }
    return false;
}

export default checkLogin;