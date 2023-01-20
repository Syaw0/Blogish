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
  interface PostType {
    profile: { profileUrl: string; profileAlt: string };
    author: string;
    postHead: string;
    postSubhead: string;
    publishDate: Date | string;
    tagName: string;
  }
}
export {};
