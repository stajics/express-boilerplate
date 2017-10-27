import io from 'socket.io-client';
import * as config from '../../../config';


class SocketClient {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io.connect(`${config.PROTOCOL}://${config.HOST}:${config.PORT}/`, {
      path: '/sockets',
    });
    return this.socket;
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default SocketClient;
