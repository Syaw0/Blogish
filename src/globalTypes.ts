declare global {
  interface IconTypes {
    height: string;
    width: string;
    onClick?(e: any): void;
    id?: string;
    "data-testId"?: string;
    className?: string;
  }
  type FetchStateTypes = "error" | "success" | "pending" | "loader";
  type MessageStateType = FetchStateTypes | "warn";
  interface FetchResponse {
    status: boolean;
    msg: string;
    data?: any;
  }
}
export {};
