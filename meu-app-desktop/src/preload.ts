import { contextBridge, ipcRenderer } from 'electron';
// Expõe APIs seguras no escopo global 'window.api' da tela
contextBridge.exposeInMainWorld('api', {
  // Envia uma requisição ao processo principal e aguarda o retorno (Promise)
  buscarStatusBanco: () => ipcRenderer.invoke('canal-banco-status'),
});

