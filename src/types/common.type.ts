export type TListBarHeader = {
  title: string;
  path: string;
};

export type TColumn = {
  title?: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: number;
};
