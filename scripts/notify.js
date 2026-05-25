const token = process.env.TELEGRAM_BOT_TOKEN;
const chat_id = process.env.TELEGRAM_CHAT_ID;
if (!token || !chat_id) {
  console.error('Variáveis TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID não configuradas');
  process.exit(1);
}
const textBase = process.argv[2] || '✅ Tarefa concluída no Portal Rádio Cultura!';
const portalUrl = 'https://portalcultura.vercel.app/';
const text = `${textBase}\n\n🔗 Confira em: ${portalUrl}`;

const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`;

fetch(url)
  .then(() => console.log('Notificação enviada!'))
  .catch((err) => console.error('Erro ao enviar notificação:', err));
