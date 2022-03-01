function attachEvents() {
    const btnLoadPosts = document.querySelector('#btnLoadPosts');
    const btnViewPost = document.querySelector('#btnViewPost');
    
    btnLoadPosts.addEventListener('click', ClickLoadPosts);
    btnViewPost.addEventListener('click', ClickViewPost);

    const urlPosts = `http://localhost:3030/jsonstore/blog/posts`;
    const urlComments = `http://localhost:3030/jsonstore/blog/comments`;

    let dropDownMenu = document.querySelector('#posts');
    let ulComments = document.querySelector('#post-comments');
    let postTitle = document.querySelector('#post-title');
    let postBody = document.querySelector('#post-body');

    async function ClickLoadPosts(event) {
        try {
            const response = await fetch(urlPosts);
            const posts = await response.json();

            for (post of Object.entries(posts)) {
                let option = document.createElement('option');
                option.textContent = post[1].title;
                option.setAttribute('id', post[1].id);
                dropDownMenu.appendChild(option);
            }

        } catch (error) {
            console.log('Error');
        }
    }

    async function ClickViewPost(event) {

        let selectedId = dropDownMenu.options[dropDownMenu.selectedIndex].id;
        ulComments.innerHTML = '';

        try {
            const urlPost = `http://localhost:3030/jsonstore/blog/posts/${selectedId}`;
            const response = await fetch(urlPost);
            const postData = await response.json();
            postTitle.textContent = postData.title;
            postBody.textContent = postData.body;

            try {
                const response = await fetch(urlComments);
                const comments = await response.json();

                for (comment of Object.entries(comments)) {

                    if (comment[1].postId == postData.id) {
                        let li = document.createElement('li');
                        li.textContent = comment[1].text;
                        li.setAttribute('id', comment[1].id);
                        ulComments.appendChild(li);
                    }
                }

            } catch (error) {
                console.log('Error');
            }


        } catch (error) {
            console.log('Error');
        }
    }

}

attachEvents();