import Server from 'socket.io';

const port = 8006;
export default function startServer() {
  const io = new Server().attach(port);
  console.log("Server listening on port " + port);
}