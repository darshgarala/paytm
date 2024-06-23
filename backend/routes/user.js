const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../model/usermodel.js");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware.js");
const { Account } = require("../model/accountmodel.js");
const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  console.log("success ", success);
  if (!success) {
    return res.status(411).json({
      messsage: "Email already taken / Incorrect inputs",
    });
  }

  try {
    const existuser = await User.find({ username: req.body.username });

    // console.log(existuser);
    if (!existuser) {
      return res.status(411).json({
        messsage: "Email already taken / Incorrect inputs",
      });
    }

    const dbUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    const userId = dbUser._id;

    // ------create----new ----- account ---
    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      JWT_SECRET
    );

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.json({
      message: "Internal Server Error",
    });
  }
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

// update user info.
const updateSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  const updateUser = await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

// get users
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
