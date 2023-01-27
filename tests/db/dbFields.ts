const userFields = {
  name: {
    Field: "name",
    Type: "varchar(30)",
    Null: "NO",
    Key: "",
    Default: "unnamed",
    Extra: "",
  },
  email: {
    Field: "email",
    Type: "varchar(120)",
    Null: "NO",
    Key: "UNI",
    Default: null,
    Extra: "",
  },
  password: {
    Field: "password",
    Type: "char(64)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  description: {
    Field: "description",
    Type: "varchar(50)",
    Null: "NO",
    Key: "",
    Default: "",
    Extra: "",
  },
  profileUrl: {
    Field: "profileUrl",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: "/prof/default.png",
    Extra: "",
  },
  userId: {
    Field: "userId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
};

const postFields = {
  postId: {
    Field: "postId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
  postHead: {
    Field: "postHead",
    Type: "varchar(30)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  postSubhead: {
    Field: "postSubhead",
    Type: "varchar(50)",
    Null: "NO",
    Key: "",
    Default: "",
    Extra: "",
  },
  tagName: {
    Field: "tagName",
    Type: "varchar(30)",
    Null: "YES",
    Key: "",
    Default: null,
    Extra: "",
  },
  publishDate: {
    Field: "publishDate",
    Type: "date",
    Null: "YES",
    Key: "",
    Default: null,
    Extra: "",
  },
  author: {
    Field: "author",
    Type: "int(11)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
};

export { postFields, userFields };
