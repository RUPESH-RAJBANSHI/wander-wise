import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },
     
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

// Ensure password is hashed on update operations as well
userSchema.pre("findOneAndUpdate", async function () {
  if (this.getUpdate().password) {
    this.getUpdate().password = await hash(this.getUpdate().password, 10);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
