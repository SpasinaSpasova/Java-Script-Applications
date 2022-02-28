function loadRepos() {

   let divElement = document.getElementById('res');

   //instance of XmlHttpRequest 
   let xhr = new XMLHttpRequest();
   let url = "https://api.github.com/users/testnakov/repos";

   xhr.open("GET", url, true);

   //onreadystatechange event attached
   xhr.onreadystatechange = function () {

      //readyState attribute reaches a value of 4 (it is ready), 
      //replace the text content of a div element with the
      // value of the responseText property of the request
      if (xhr.readyState === 4) {
         divElement.textContent = xhr.responseText;
      }
   }

   xhr.send();
}