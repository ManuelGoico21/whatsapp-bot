const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Lista de IDs de grupos permitidos
const allowedGroupIds = [
    'ejemplo@g.us'
];

const client = new Client();

client.on('qr', (qr) => {
    console.log('Escanea este QR con tu teléfono:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('El cliente está listo!');
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();

    // Verificamos si el mensaje viene de un grupo y si el ID del grupo está en la lista permitida
    if (chat.isGroup && allowedGroupIds.includes(chat.id._serialized)) {
        // Aquí tu lógica para los grupos permitidos
        if (msg.body === 'ping') {
            msg.reply('pong');
        }
    }
});

client.initialize();
