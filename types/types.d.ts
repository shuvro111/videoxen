export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    name: string;
    username: string;
    image: string;
  };
  likes: {
    _key: string;
    _ref: string;
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _id: string;
      _ref: string;
    };
  }[];
  userId: string;
}

export interface Like {
  _key: string;
  _ref: string;
}

export interface IUser {
  _id: string;
  _type: string;
  name: string;
  username: string;
  image: string;
}
