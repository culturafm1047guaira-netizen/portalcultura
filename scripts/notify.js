const token = '8248006597:AAF6XGnXWXJAZSPZZYHPUp69ttMpTZAAZbI';
const chat_id = '1390440721';
const text = process.argv[2] || '✅ Tarefa concluída no Portal Rádio Cultura!';

const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`;

fetch(url)
  .then(() => console.log('Notificação enviada!'))
  .catch((err) => console.error('Erro ao enviar notificação:', err));
