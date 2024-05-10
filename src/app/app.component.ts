import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  hubConnection: HubConnection;
  title = 'app_angular';
  mensagem: string[] = [];
  novaMensagem: string = '';

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:7213/chat')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('signalr connected'))
      .catch((err) => console.error('erro ao conectar', err));

    this.hubConnection.on('receber mensagem', (mensagem: string) => {
      console.log(`mensagem recebida:${mensagem}`);
      this.mensagem.push(mensagem);
    });
  }
  enviarMensagem() {
    this.hubConnection
      .invoke('EnviarMensagem', this.novaMensagem)
      .catch((err) => console.error(err));
    this.novaMensagem = '';
  }
}
