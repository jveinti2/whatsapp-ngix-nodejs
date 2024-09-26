import {
  createBot,
  createFlow,
  createProvider,
  MemoryDB,
  addKeyword,
} from "@bot-whatsapp/bot";

import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const flowBienvenida = addKeyword("hola").addAnswer(
  "Hola, ¿en qué puedo ayudarte?"
);

const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(3002);

  provider.http.server.get("/say-hi", (req, res) => {
    res.end("Hola 23");
  });

  provider.http.server.post(
    "/send-message",
    handleCtx(async (bot, req, res) => {
      const { phone, message } = req.body;

      try {
        await bot.sendMessage(`57${phone}`, `🤖 ${message}`, []);
        res.end("Hola");
      } catch (error) {
        throw new error(`Error al enviar mensaje ${error}`);
      }
    })
  );

  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider,
  });
};
main();
