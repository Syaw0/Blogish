declare global {
  interface IconTypes {
    height: string;
    width: string;
    onClick?(e: any): void;
    id?: string;
    "data-testId"?: string;
    className?: string;
  }
}
export {};
