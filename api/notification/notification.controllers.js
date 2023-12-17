const express = require("express");

const { Expo } = require("expo-server-sdk");

const app = express();
const expo = new Expo();

app.post("/send-notification", async (req, res) => {
  try {
    const { token, title, body } = req.body;

    if (!Expo.isExpoPushToken(token)) {
      return res.status(400).json({ error: "Invalid Expo Push Token" });
    }

    const messages = [
      {
        to: token,
        sound: "default",
        title: title || "Notification Title",
        body: body || "Notification Body",
      },
    ];

    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending push notification:", error);
      }
    }

    res.json({ tickets });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
