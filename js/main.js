
window.addEventListener('load',function(e){
    AOS.init({
        disable: 'mobile',
    });
    
    document.getElementById('scroll-down').addEventListener('click',e => {
        window.scroll({ top: document.getElementById('abaout').offsetTop + 50, left: 0, behavior: 'smooth' });
    });
})

