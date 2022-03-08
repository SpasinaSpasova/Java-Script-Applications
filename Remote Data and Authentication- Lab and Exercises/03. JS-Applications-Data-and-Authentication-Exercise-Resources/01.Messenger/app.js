const url=`http://localhost:3030/jsonstore/messenger`;
const messages=document.getElementById('messages');

function attachEvents(){
    document.getElementById('submit').addEventListener('click',SendMessage);
    document.getElementById('refresh').addEventListener('click',ShowMessages);
}
async function ShowMessages(event){
    messages.value='';
    const response=await fetch(url);
    const data=await response.json();

   let dataAsObj=Object.values(data);
  for (const elem of dataAsObj) {
      messages.value+=`${elem.author}: ${elem.content}\n`;
  }
  messages.value.trimEnd();

}

async function SendMessage(event){
    let author=document.getElementsByName('author')[0].value;
    let mess=document.getElementsByName('content')[0].value;

    if (author !== '' || mess !== '') {
        const response=await fetch(url,{
            method: 'post',
            headers: { 
                'Content-type': 'application/json'
             },
            body: JSON.stringify({author, content:mess})
        });
        author.value = '';
        mess.value = '';
    }
    else{
        console.log("Empty or incorrect fields");
    }
}
attachEvents();