import mongoose, { Schema } from "mongoose";

export const ROLES = {
  UNIVERSITY_ADMIN: "University Admin",
  COLLEGE_ADMIN: "Collage Admin",
  DEPARTMENT_ADMIN: "Department Admin",
};

const adminSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    avatar: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v); // Valid URL check
        },
        message: (props) => `${props.value} is not a valid avatar URL!`,
      },
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.UNIVERSITY_ADMIN,
    },
    university_id: {
      type: Schema.Types.ObjectId,
      ref: "University",
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

adminSchema.index({ user: 1 }); // Create an index on the `user` field for performance

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
