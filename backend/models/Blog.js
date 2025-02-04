import { Schema, model } from "mongoose";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [10, "Title must be atleast 10 characters long"],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  featuredImage: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const Blog = model("Blog", blogSchema);
export default Blog;




function convertToSlug() {
  this.slug = this.title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove non-alphanumeric characters except hyphens
}
