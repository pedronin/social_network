import ChatMessagesModel from "../models/ChatMessages.js";

export const createChat = async (req, res) => {
  try {
    const doc = new ChatMessagesModel({
      chatId: req.body.chatId,
      messages: [],
    });

    const chat = await doc.save();

    res.json(chat);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Ошибка при создании чата",
    });
  }
};

export const addMessage = async (req, res) => {
  try {
    const chat = await ChatMessagesModel.findOne({ chatId: req.body.chatId });

    console.log(req.body.chatId);

    await ChatMessagesModel.updateOne(
      { chatId: req.body.chatId },
      { messages: [...chat.messages, req.body.message] }
    );

    res.json("okey");
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Ошибка при создании сообщения",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const chat = await ChatMessagesModel.findOne({ chatId: req.params.chatId });

    res.json(chat);
  } catch (error) {
    res.json({
      chatId: req.params.chatId,
      messages: [],
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const chat = await ChatMessagesModel.findOne({ chatId: req.params.chatId });

    const newMessages = chat.messages.filter(
      (message) => message.updatedAt !== req.body.updatedAt
    );

    await ChatMessagesModel.updateOne(
      { _id: req.params.chatId },
      {
        chatId: chat.chatId,
        messages: newMessages,
      }
    );

    res.json("okey");
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Ошибка при удаления сообщений",
    });
  }
};
