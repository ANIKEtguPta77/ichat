const socket=io('http://localhost:8000');
const join=new Audio('join.mp3');
const send=new Audio('send.mp3');
const receive=new Audio('receive.mp3');
const left=new Audio('left.wav');


const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');


const append=(message,position)=>{
  const mess=document.createElement('div');
  mess.innerHTML=message;
  mess.classList.add('message');
  mess.classList.add(position);
  messagecontainer.append(mess);


}

const append1=(message,position)=>{
    const mess=document.createElement('div');
    mess.innerHTML=message;
    mess.classList.add('message1');
    mess.classList.add(position);
    messagecontainer.append(mess);
  
  
}



const n=prompt("Enter your name to join");
socket.emit('new-User-joined',n);

socket.on('user-joined',name=>{
    join.play();
    append1(`${name} joined the chat`,'center');

})

form.addEventListener('submit',(e)=>{

    e.preventDefault();//to dont reload page
    send.play();
    const message=messageinput.value;
    append(`You :${message}`,'right');
    socket.emit('send',message);
    messageinput.value='';

})


socket.on('recieve',data=>{
    receive.play();
    append(`${data.name} :${data.message}`,'left');
    
 
})


socket.on('left',n=>{
    left.play();
    append1(`${n} has left the chat`,'center');
})


