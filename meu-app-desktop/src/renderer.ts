/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);

declare global {
interface Window {
    api: {
      buscarStatusBanco: () => Promise<{ status: string; mensagem: string; 
timestamp: string }>;
    };
  }
}
3 
const botao = document.getElementById('btn-verificar') as HTMLButtonElement;
const resultado = document.getElementById('resultado') as 
HTMLParagraphElement;
botao.addEventListener('click', async () => {
  resultado.textContent = 'Consultando banco de dados na nuvem...';
  try {
    // Chama a API exposta de forma assíncrona
    const resposta = await window.api.buscarStatusBanco();
    resultado.innerHTML = `Status: <span style="color: green">$
{resposta.mensagem}</span><br>Hora da consulta: ${resposta.timestamp}`;
  } catch (erro) {
    resultado.textContent = 'Erro ao se comunicar com o processo principal.';
    console.error(erro);
  }