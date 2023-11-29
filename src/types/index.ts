export type UserData = {
  _id: string;
  posts: PostData[];
  name?: string;
  username: string;
  followers: string[] & UserData[];
  following: UserData[];
  verify: boolean;
  createdAt: number;
  picture?: string;
  bio?: string;
  link?: string;
  activities?: ActivityData[];
};

export type ReplyData = {
  _id: string;
  owner: string & UserData;
  ref: string;
  text: string;
  createdAt: number;
  optimistic?: boolean;
};

export type CommentData = {
  _id: string;
  ref: string | PostData;
  owner: string & UserData;
  createdAt: number;
  replies: ReplyData[];
  text: string;
  optimistic?: boolean;
};

export type PostData = {
  _id: string;
  comments: string[] & CommentData[];
  likes: string[] & UserData[];
  owner: string & UserData;
  createdAt: number;
  caption?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
};

export type ActivityData = {
  owner: string[] | UserData[];
  createdAt: number;
  refModel?: "posts" | "comments";
  contentModel?: "comments" | "replies" | "posts";
  type: "forYou" | "mentions";
  author: UserData;
  message: string;
  content: CommentData & ReplyData & PostData;
  ref: PostData & CommentData;
};

export type ResponseApi<T> = {
  success: boolean;
  message: string;
  data: T;
};
