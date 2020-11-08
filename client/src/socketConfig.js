import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("https://react-sockets-pokemon.herokuapp.com/");

export default socket;
