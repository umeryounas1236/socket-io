const io = require('socket.io')(5000,{
    cors:{
        origin : ['http://localhost:3000']
    }
});

var connections = 0;
const sportIds = [1,16];
var timer = null;

const currntSockets = [];

const checkForHandler = (sportId) => {
    let handler = currntSockets.find(s => s.room === sportId);
    if(!handler) return false;
    return true;
}

io.on('connection',(socket => {
    console.log(`connected with socket id : ${socket.id}`);
    connections = connections + 1;

    if(connections === 1){
        
    }
    
    socket.on("join-group", (sportId,cb) => {
        socket.join(`sport_group_${sportId}`);

        if(currntSockets && !checkForHandler(sportId)){
            console.log('tests')
            //socket.join(self);
            timer = setInterval(()=>{
                //to(`sport_group_${sportId}`)
                socket.emit('updated-data',{test: "dummy-data",room : sportId});
                socket.to(`sport_group_${sportId}`).emit('updated-data',{test: "dummy-data",room : sportId});
                console.log(`sending data from socket : ${socket.id}`)
            },5000);
            currntSockets.push({id:socket.id,room : sportId});
        }

        console.log(socket.rooms);
        cb(`join room : ${sportId}`);
    });

    
    io.on("disconnect", () => {
        connections = connections - 1;
        console.log(connections);
    });

    console.log(connections);
}));







