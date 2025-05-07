import express from "express";
import mongoose from "mongoose";
import Item from "./itemModel.js";

const app = express();

// bodyparser middleware
app.use(express.json());

const PORT = process.env.PORT || 8000;

const MONGODB_URL =
  "mongodb+srv://fasogba:Ayfash@cluster0.h36vivy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URL).then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
  });
});

// Add new item to the database
app.post("/add-item", async (req, res) => {
  const { itemName, description, locationFound, dateFound, claimed } = req.body;

  if (!itemName || !locationFound || !dateFound) {
    return res.status(400).json({ message: "Please input all fields" });
  }

  const newItem = new Item({
    itemName,
    description,
    locationFound,
    dateFound,
    claimed,
  });

  await newItem.save();

  res.status(201).json({
    message: "Success",
    newItem,
  });
});

// Request to get all items in the database
app.get("/all-items", async (req, res) => {
  const allItems = await Item.find();
  res.status(200).json({
    message: "Success",
    allItems,
  });
});

// Request to get one item in the database using the items id
app.get("/one-item/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json({
    message: "Success",
    item,
  });
});

// Updates one item in the database using the id of the item
app.put("/update-item", async (req, res) => {
  const { id, description, claimed } = req.body;

  const updatedItem = await Item.findByIdAndUpdate(
    id,
    { description, claimed },
    { new: true }
  );

  res.status(201).json({
    message: "Success",
    updatedItem,
  });
});

// Delete item from the database using the id of the item
app.delete("/delete-item/:id", async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);

  res.status(200).json({ message: "Successfull" });
});
