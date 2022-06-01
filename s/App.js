import {io} from 'socket.io-client';

const socket = io('http://localhost:5000');

//console.log(window.location)
socket.on('connect',(() => {
  console.log(`connected with socket id : ${socket.id}`);
}));


socket.on('updated-data',updatedData => {
  console.log(updatedData);
});

socket.on(`${socket.id}_sport_365`,data => {
  console.log(data);
})
function App() {
  const JoinRoom1 = () => {
    socket.emit('join-group','1',message => {
      console.log(message);
    });
  }

  const JoinRoom2 = () => {
    socket.emit('join-group','16',message => {
      console.log(message);
    });
  }
  return (
    <div className="App">
     <div>Socket io tutorial</div>
     <div>
       <button onClick={() => JoinRoom1()}>Join Room 1</button>
       <button onClick={() => JoinRoom2()}>Join Room 16</button>
     </div>
    </div>
  );
}

export default App;
