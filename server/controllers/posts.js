import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await PostMessage.countDocuments({});

    // .sort is to get newest posts first
    // .limit will show a limited number of posts at a time
    // .skip
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res
      .status(200)
      .json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i'); // TEST = test = Test
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body; // for post request
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body; // recieve post from req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No Post with that id');
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  ); // new : true to recieve updated post
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that id');
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'Post Deleted Successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: 'Not Authenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that id');
  }

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // unlike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
