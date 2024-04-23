"use server";

export async function getFontsList() {
  const apiKey = process.env.GOOGLE_FONTS_API_KEY;
  const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

  return fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.items;
    });
}
