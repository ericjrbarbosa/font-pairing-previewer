import { Dispatch, SetStateAction } from "react";
import { Font } from "@/app/types";

export const getFontsList = (setFonts: Dispatch<SetStateAction<Font[]>>) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;
  const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setFonts(data.items);
    });
};
