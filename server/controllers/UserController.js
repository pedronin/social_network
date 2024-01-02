import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        error: "Неверный логин или пороль",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Неверный логин или пороль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const toggleOnline = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    await UserModel.updateOne(
      { _id: req.params.userId },
      {
        status: req.body.status,
      }
    );

    res.json("okey");
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Нет доступа",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const findUser = async (req, res) => {
  try {
    const searchedName = req.params.fullName.toLowerCase();
    console.log(searchedName);

    let users = await UserModel.find();
    if (!users) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    users = users.filter((user) =>
      user.fullName
        .toLowerCase()
        .split(" ")
        .some((el) => el.startsWith(searchedName))
    );

    const data = users.map(({ _doc: { passwordHash, ...rest } }) => rest);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const createChat = async (req, res) => {
  try {
    const chatId = req.body.chatId;
    const userId = req.body.userId;
    const user2Id = req.body.user2Id;
    const {
      _doc: { passwordHash, ...user },
    } = await UserModel.findById(userId);
    const {
      _doc: { passwordHash: _, ...user2 },
    } = await UserModel.findById(user2Id);

    if (!user || !user2) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const userChatsList = [...user.chatsList, { chatId: chatId, user2: user2 }];
    const user2ChatsList = [
      ...user2.chatsList,
      { chatId: chatId, user2: user },
    ];

    await UserModel.updateOne(
      { _id: userId },
      {
        chatsList: userChatsList,
      }
    );

    await UserModel.updateOne(
      { _id: user2Id },
      {
        chatsList: user2ChatsList,
      }
    );

    res.json({ chatId: chatId, user2: user2 }.populate("user").exec());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const getChatByUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);

    if (!user) {
      return res.status(400).json({
        message: "Пользователь не найден (неправильное id)",
      });
    }

    res.json(user.chatsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
