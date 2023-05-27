const express = require("express");
const UserModel = require("./models").User;
const TodoModel = require("./models").Todo;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

app = express();
const port = 3030;

const auth = async (req, res, next) => {
  try {
    const tokenFromUser = req.header("authorization");
    const decode = jwt.verify(tokenFromUser, process.env.secretKey);
    // console.log(decode);
    if (decode.role != "admin") {
      res.status(401);
      res.send({
        message: "Anda tidak berhak mengakses token ini",
      });

      return;
    }
  } catch (error) {
    res.status(401);
    res.send({
      message: "token tidak valid",
    });

    return;
  }

  next();
};

app.use(express.json());

app.get("/users", auth, async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || `internal server error`,
    });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    if (users == null) {
      res.status(204).json({
        message: "User not found!",
      });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || `internal server error`,
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUserData = {
      name: name,
      email: email,
      password: password,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser = await UserModel.create(newUserData);

    res.status(201).json({
      message: "New user created",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || `internal server error`,
    });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedUserData = {
      name: name,
      email: email,
      password: password,
      updatedAt: new Date(),
    };

    const updateUser = await UserModel.update(updatedUserData, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Success update",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await UserModel.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Delete user success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message || `internal server error`,
    });
  }
});

app.get("/todos/users", async (req, res) => {
  try {
    const todos = await TodoModel.findAll({
      include: {
        model: UserModel,
        as: "user",
      },
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message || `internal server error`,
    });
  }
});

app.get("/todos/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const todos = await TodoModel.findAll({
      where: {
        user_id: user_id,
      },
    });
    if (todos == null) {
      res.status(204).json({
        message: "User not found!",
      });
    } else {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || `internal server error`,
    });
  }
});

app.post("/todos/:user_id", async (req, res) => {
  try {
    const { todo } = req.body;
    const { user_id } = req.params;

    const users = await UserModel.findOne({
      where: {
        id: user_id,
      },
    });
    if (users == null) {
      res.status(204).json({
        message: "User not found!",
      });
    } else {
      const newTodoData = {
        todo: todo,
        isdone: false,
        user_id: user_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newTodo = await TodoModel.create(newTodoData);

      res.status(201).json({
        message: "New todo created",
        todo: newTodo,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || `internal server error`,
    });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo, isdone } = req.body;

    const updatedTodoData = {
      todo: todo,
      isdone: isdone,
      updatedAt: new Date(),
    };

    const updateTodo = await TodoModel.update(updatedTodoData, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Success update",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await TodoModel.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Delete todo success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

app.delete("/todos/all/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    await TodoModel.destroy({
      where: {
        user_id: user_id,
      },
    });

    res.status(200).json({
      message: "Delete todo success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userFound = await UserModel.findOne({
    where: {
      email: email,
      password: password,
    },
  });

  if (!userFound) {
    res.status(404).json({
      message: "Invalid username or password",
    });

    return;
  }

  const token = jwt.sign(
    {
      sub: userFound.id,
      iss: "skilvul",
      aud: "Tim-front-end",
      exp: parseInt(new Date().getTime() / 1000 + 12 * 60 * 60),
      role: userFound.role,
    },
    process.env.secretKey
  );
  res.send({
    token: token,
  });
});
app.listen(process.env.PORT);
