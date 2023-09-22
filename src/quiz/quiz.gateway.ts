import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class QuizGateway {
    @WebSocketServer()
    server: Server;
    // listen for send_message events
    @SubscribeMessage('send_message')
    listenForMessages(@MessageBody() message: string) {
      this.server.sockets.emit('receive_message', message);
    }

     @SubscribeMessage('hello')
  handleHelloEvent(client: Socket, payload: string): void {
    console.log(`Received 'hello' event with payload: ${payload}`);

    // You can respond to the event here if needed
    const response = 'Hello from the server!';
    client.emit('helloResponse', response); // Emit a response back to the client
  }
}