async function loadCommits() {
    let username = document.querySelector('#username').value;
    let repository = document.querySelector('#repo').value;
    let url = `https://api.github.com/repos/${username}/${repository}/commits`;

    let uls = document.querySelector('#commits');

    try {                    
        const response = await fetch(url);        
        let data = await response.json();
        if (response.status !== 200) {
            let liElement=document.createElement('li');
            liElement.textContent='Error 404. Item Not Found';
            uls.appendChild(liElement);
        }else{
            data.forEach(element => {
                let liElement=document.createElement('li');
                liElement.textContent=`${element.commit.author.name}: ${element.commit.message}`;
                uls.appendChild(liElement);
            });
        }
        
    }
    catch (err) {
        console.log(err);
    }
}
