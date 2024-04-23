export type Font = {
  family: string;
  files: {
    [key: string]: string;
  };
};

export type FontPair = {
  primary: Font;
  secondary: Font;
};
