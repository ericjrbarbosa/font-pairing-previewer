import { Font } from "@/app/types";

const DynamicFontLoader = ({ font }: { font: Font }) => {
  return (
    <style
      jsx
      global>
      {`
        @font-face {
          font-family: "${font.family}";
          src: url("${font.files["regular"]}") format("woff2");
          font-weight: normal;
          font-style: normal;
        }
      `}
    </style>
  );
};

export default DynamicFontLoader;
