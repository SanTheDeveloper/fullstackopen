import { create } from "zustand";

const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),
}));

export default useBlogStore;
