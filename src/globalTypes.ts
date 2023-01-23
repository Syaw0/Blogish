declare global {
  interface IconTypes {
    height: string;
    width: string;
    onClick?(e: any): void;
    id?: string;
    "data-testid"?: string;
    className?: string;
  }
  type FetchStateTypes = "error" | "success" | "pending" | "loader";
  type MessageStateType = FetchStateTypes | "warn";
  interface FetchResponse {
    status: boolean;
    msg: string;
    data?: any;
  }

  interface ProfilePropsType {
    profileUrl: string;
    name: string;
  }

  interface Author {
    id: string;
    name: string;
    description: string;
    profileUrl: string;
  }

  interface PostType {
    author: Author;
    postHead: string;
    postSubhead: string;
    postDetail: string;
    publishDate: string;
    tagName: string;
    id: string;
  }

  interface MainPagePropsType {
    isLogin: boolean;
    posts?: PostType[];
    profileData?: ProfilePropsType;
  }
  interface UserPagePropsType extends MainPagePropsType {
    user: User;
  }

  interface PostPagePropsType extends Omit<MainPagePropsType, "posts"> {
    post: PostType;
    similar: PostType[] | [];
  }

  interface WritePagePropsType extends Omit<MainPagePropsType, "posts"> {
    isEdit: boolean;
    postHead: string;
    postSubhead: string;
    postDetail: string;
  }
  interface User {
    name: string;
    description: string;
    profileUrl: string;
    posts?: PostType[];
    id: string;
  }
}
export {};
