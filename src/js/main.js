import './../sass/app.scss';

window.addEventListener('load',function(e){
    AOS.init({
        disable: 'mobile',
    });
    
    // Scroll down button action
    document.getElementById('scroll-down').addEventListener('click',e => {
        window.scroll({ top: document.getElementById('abaout').offsetTop + 50, left: 0, behavior: 'smooth' });
    });

    // Generate reCaptcha Token
    grecaptcha.ready(function() {
        grecaptcha.execute('6Lfsc5AUAAAAAECXlGE6YiH2YrJ9cwLNIaFe0iqg', {action: 'homepage'}).then(function(token) {
           document.getElementById('captchav3').value = token;
        });
    });

    document.getElementById('sendEmail').addEventListener('click', e =>{
        e.preventDefault();
        fetch('/mail.php',{
            method: 'POST',
            body: new FormData(document.getElementById('form-email')),
        }).then(res => {
            if(!res.ok){ throw res; }
            return res.json();
        }).then(e =>{
            Swal.fire({
                type: 'success',
                title: e.data.message,
                confirmButtonText: 'Aceptar'
            });
        }).catch(error => {
            error.json().then(e => {
                Swal.fire({
                    type: 'error',
                    title: e.error.message,
                    confirmButtonText: 'Aceptar'
                });
            });
        });
    });
})

