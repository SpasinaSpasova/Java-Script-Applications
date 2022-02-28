function loadRepos() {

	let usernameElementValue = document.getElementById('username').value;
	let listRepoElement = document.getElementById('repos');

	//Clear the contents of the list before any new content is appended
	listRepoElement.innerHTML = '';

	let url = `https://api.github.com/users/${usernameElementValue}/repos`;

	let errorHandle = '';

	fetch(url)

		.then((response) => response.json())
		.then(data => {
			errorHandle = `Status code: ${data.status} ${data.statusText}`;
			data.forEach(d => {
				let fullName = d.full_name;
				let url = d.html_url;

				//create li element
				const liElement = document.createElement('li');
				listRepoElement.appendChild(liElement);

				//every li elemnet has a element
				const aHyperLinkRepo = document.createElement('a');
				aHyperLinkRepo.href = `${url}`;
				aHyperLinkRepo.textContent = `${fullName}`;

				liElement.appendChild(aHyperLinkRepo);
			});
		})
		.catch((error) => {
			console.log('err');
			const liElement = document.createElement('li');
			listRepoElement.appendChild(liElement);
			liElement.textContent = errorHandle;
		})
}


