//NOde server which willl handle scoket io

const io=require("socket.io")(8000,{
    cors:{
        origin:"*"
    }
});
   



const users={};

io.on('connection',socket=>{
    socket.on('new-User-joined',name=>{//newuser joined is event
        console.log(name);

        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
    });
   

    //for server left the server
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

})