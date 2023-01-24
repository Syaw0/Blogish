// TODO write script to generate fake data

const fakeUser = {
  name: "siavash",
  description: "some description",
  profileUrl: "",
  id: 0,
  email: "something1@gmail.com",
  password: "root1",
  posts: [1, 2, 3, 4],
};

const fakeUser2 = {
  name: "reza",
  description: "some description",
  profileUrl: "",
  id: 1,
  email: "something2@gmail.com",
  password: "root2",
};

const fakeUser3 = {
  name: "maryam",
  description: "some description",
  profileUrl: "",
  id: 2,
  email: "something3@gmail.com",
  password: "root3",
};

const fakePost1 = {
  author: {
    id: "1",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "1",
};
const fakePost2 = {
  author: {
    id: "1",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "2",
};
const fakePost3 = {
  author: {
    id: "1",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "3",
};
const fakePost4 = {
  author: {
    id: "2",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "4",
};
const fakePost5 = {
  author: {
    id: "3",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "5",
};
const fakePost6 = {
  author: {
    id: "2",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "6",
};
const fakePost7 = {
  author: {
    id: "3",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "7",
};
const fakePost8 = {
  author: {
    id: "3",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "8",
};
const fakePost9 = {
  author: {
    id: "3",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "9",
};
const fakePost10 = {
  author: {
    id: "2",
  },
  postHead: "",
  postSubhead: "",
  postDetail: "",
  publishDate: new Date(),
  tagName: "tag",
  id: "10",
};

export const users = [fakeUser, fakeUser2, fakeUser3];
export const posts = [
  fakePost1,
  fakePost2,
  fakePost3,
  fakePost4,
  fakePost5,
  fakePost6,
  fakePost7,
  fakePost8,
  fakePost9,
  fakePost10,
];
