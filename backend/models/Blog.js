import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [10, "Title must be atleast 10 characters long"],
    },

    slug: {
      type: String,
      // required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },

    categories: {
      type: [{ type: Schema.Types.ObjectId, ref: "Category" }],
      type: String,
      enum: [
        "Technology",
        "Health & Fitness",
        "Lifestyle",
        "Travel",
        "Food & Drink",
        "Business & Finance",
        "Education",
        "Entertainment",
        "Fashion",
        "Sports",
        "Science",
        "Art & Culture",
        "Personal Development",
        "Parenting",
        "News & Politics",
        "Music",
        "Gaming",
        "Environment",
        "Self-Improvement",
        "Books & Literature",
        "Relationships",
        "History",
        "Photography",
        "Tech Reviews",
        "Productivity",
        "DIY (Do It Yourself)",
        "Social Media",
        "Mental Health",
        "Philosophy",
        "Pets",
      ],
      required: true,
    },

    featuredImage: {
      type: String,
      // required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

blogSchema.pre("save", function (next) {
  this.slug = this.title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove non-alphanumeric characters except hyphens
  next();
});

const Blog = model("Blog", blogSchema);
export default Blog;
