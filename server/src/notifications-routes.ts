import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey =
  "BAm72j1kiMQu6aqeDgRG0X9tcxOALGfRQtxSAEhnGksJ-k85ol3JtXSfBZSkc9jUlaJaFh6f19dxvQMwRbDSl2c";
const privateKey = "F2Vy3jwqdMi8KWDAh4FuA2WqlqYplM4xhoj4QRO7-DY";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, response) => {
    console.log("request.body", request.body);

    return response.status(201).send();
  });

  app.post("/push/send", async (request, response) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "Hello from back");
    }, 5000);

    return response.status(201).send();
  });
}
