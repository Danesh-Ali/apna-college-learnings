const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Connection Error:", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/user");
}

// User Schema
const userSchema = new Schema({
  username: String,
  email: String
});

const postSchema = new Schema({
  content: String,
  like: Number,
  user: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});



const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const findUser = async () => {
  const result = await User.find({}).populate("post")
  console.log("User REsult", result)
}

// findUser()

// 🚀 Insert Data
const addData = async () => {
  // const user1 = new User({
  //   username: "Babar",
  //   email: "babar@example.com"
  // });

  // const post1 = new Post({
  //   content: "This is Babar's first post",
  //   like: 10
  // });

  const user = await User.find({username: "Babar"}).populate(username: "Babar")
  // const user = await User.find({username: "Babar"})
  console.log(user)
  const post2 = new Post({
    content: "This is Babar's first post",
    like: 10
  });

  // post2.user = user1
  post2.user = user

  // await user1.save()
  // await post2.save()

  console.log("✅ User and posts added");
};

addData();









// 🗑️ Delete User and Cascade Posts
const deleteUser = async () => {
  await User.findOneAndDelete({ username: "Babar" });
  console.log("✅ User deleted");
};

// Uncomment one at a time to test

// deleteUser();
