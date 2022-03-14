
export function initialize(links){

    const main = document.querySelector('main');
    document.querySelector('nav').addEventListener('click', onNavigate);
    

    const context = {
        showSection,
        goto,
        updateNav
    };

    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }
    
    function onNavigate(event) {
        const target = event.target;
        if (target.tagName == 'IMG') {
            target = target.parentElement();
        }
        if (event.target.tagName == 'A') {
            event.preventDefault();
            const url = new URL(event.target.href);
            goto(url.pathname);
        }
    }
    
    
    function goto(name,...params) {
        const handler = links[name];
    
        if (typeof handler == 'function') {
            handler(context,...params);
        }
    }
    function updateNav(){
        const user=localStorage.getItem('user');
        if (user) {
            nav.querySelectorAll('.user').forEach(e => {
                e.style.display='block'
            });
            nav.querySelectorAll('.guets').forEach(e => {
                e.style.display='none'
            });
        }else{
            nav.querySelectorAll('.user').forEach(e => {
                e.style.display='none'
            });
            nav.querySelectorAll('.guets').forEach(e => {
                e.style.display='block'
            });
        }
    }
}

