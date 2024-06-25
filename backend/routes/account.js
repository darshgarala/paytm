const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");
const { Account } = require("../model/accountmodel");
const { authMiddleware } = require("../middleware");

router.get("/balance", authMiddleware, async (req, res) => {
  console.log("req.userId => ", req.userId);
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // // console.log("object");

  // const session = await mongoose.startSession();

  // session.startTransaction();
  // const { amount, to } = req.body;

  // try {
  //   // Fetch the accounts within the transaction
  //   const account = await Account.findOne({ userId: req.userId }).session(
  //     session
  //   );

  //   if (!account || account.balance < amount) {
  //     await session.abortTransaction();
  //     return res.status(400).json({
  //       message: "Insufficient balance",
  //     });
  //   }

  //   const toAccount = await Account.findOne({ userId: to }).session(session);

  //   if (!toAccount) {
  //     await session.abortTransaction();
  //     return res.status(400).json({
  //       message: "Invalid account",
  //     });
  //   }

  //   // Perform the transfer
  //   await Account.updateOne(
  //     { userId: req.userId },
  //     { $dec: { balance: -amount } }
  //   ).session(session);

  //   await Account.updateOne(
  //     { userId: to },
  //     { $inc: { balance: amount } }
  //   ).session(session);

  //   // Commit the transaction
  //   await session.commitTransaction();

  //   res.json({
  //     message: "Transfer successful",
  //   });

  // } catch (error) {
  //   await session.abortTransaction();
  //   console.log("error => ", error);
  //   res.status(500).json({
  //     message: "Server error",
  //   });
  // } finally {
  //   session.endSession();
  // }
  console.log("object = ", req.body);
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId });
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to });

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  const data11 = await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );

  const data1 = await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  );

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
