import Server from 'socket.io';
import express from 'express';
import path from 'path';
import textingServer from 'textingServer';
import bodyParser from 'body-parser';

export default function startServer(store) {
	const socketPort = 8006;
  const expressPort = 8007;

// Socket setup: ---------------------------------------------------------------
  const io = new Server().attach(socketPort);
  console.log("Socket server listening on port " + socketPort);


  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

// Express setup ---------------------------------------------------------------
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  textingServer(server);

  server.get('/', (req, res) => {
    res.redirect('/index.html')
  });
  server.use('/', express.static(path.join(__dirname, '../dashboard-dist/')));

  server.listen(expressPort, () => {
    console.log("Http server is listening on port " + expressPort);
  });
}