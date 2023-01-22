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
    profileAlt: string;
  }
  interface PostType {
    profile: ProfilePropsType;
    author: string;
    postHead: string;
    postSubhead: string;
    publishDate: Date | string;
    tagName: string;
    id: string;
  }

  interface MainPagePropsType {
    isLogin: boolean;
    posts?: PostType[];
    profileData?: ProfilePropsType;
  }
  interface UserPagePropsType {
    posts: PostType[];
    user: {
      name: string;
      description?: string;
      profile: ProfilePropsType;
    };
    isLogin: boolean;
    profileData?: ProfilePropsType;
  }
}
export {};
