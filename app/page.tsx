"use client";

import { useEffect, useState } from "react";
import { Font } from "@/app/types";
import DynamicFontLoader from "@/app/_components/DynamicFontLoader";
import { getFontsList } from "@/app/_functions/main";
import Button from "@/app/_components/Button";
import { useAppContext } from "@/app/_contexts/AppContext";
import Logo from "@/app/_components/Logo";
import Icon from "@/app/_components/Icon";

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [primaryFont, setPrimaryFont] = useState<Font>();
  const [secondaryFont, setSecondaryFont] = useState<Font>();
  const [lockPrimaryFont, setLockPrimaryFont] = useState(false);
  const [lockSecondaryFont, setLockSecondaryFont] = useState(false);
  const { fontPairs, saveFontPair, removeFontPair, clearFontPairs } =
    useAppContext();

  const handleRandomFont = () => {
    if (fonts.length < 1) return;

    if (!lockPrimaryFont) {
      const indexPrimary = Math.floor(Math.random() * fonts.length);
      setPrimaryFont(fonts[indexPrimary]);
    }

    if (!lockSecondaryFont) {
      const indexSecondary = Math.floor(Math.random() * fonts.length);
      setSecondaryFont(fonts[indexSecondary]);
    }
  };

  useEffect(() => {
    getFontsList(setFonts);
  }, [setFonts]);

  useEffect(() => {
    if (primaryFont) return;
    if (secondaryFont) return;

    handleRandomFont();
  }, [fonts]);

  if (!primaryFont || !secondaryFont)
    return (
      <div className="flex flex-1 items-center justify-center text-4xl">
        <Logo />
      </div>
    );

  return (
    <div className="flex flex-1 flex-row">
      {primaryFont && <DynamicFontLoader font={primaryFont} />}
      {secondaryFont && <DynamicFontLoader font={secondaryFont} />}
      <div className="p-6 w-72 flex flex-col gap-6 bg-neutral-700 text-neutral-200 select-none">
        <div className="text-xl">
          <Logo />
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleRandomFont}>
            <Icon name="shuffle" />
            <span>Random</span>
          </Button>
          <Button
            onClick={() => {
              if (!primaryFont) return;
              if (!secondaryFont) return;

              saveFontPair({
                primary: primaryFont,
                secondary: secondaryFont,
              });
            }}>
            <Icon name="save" />
            <span>Save Pairing</span>
          </Button>
        </div>
        <div>
          <div className="flex justify-between gap-4 items-center">
            <div>Primary</div>
            <Button onClick={() => setLockPrimaryFont(!lockPrimaryFont)}>
              <span
                className={`leading-none ${
                  lockPrimaryFont ? "text-primary-500" : ""
                }`}>
                <Icon name="lock" />
              </span>
            </Button>
          </div>
          <div>{primaryFont?.family}</div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div>Secondary</div>
            <Button onClick={() => setLockSecondaryFont(!lockSecondaryFont)}>
              <span
                className={`leading-none ${
                  lockSecondaryFont ? "text-primary-500" : ""
                }`}>
                <Icon name="lock" />
              </span>
            </Button>
          </div>
          <div>{secondaryFont?.family}</div>
        </div>

        <div>
          <div className="flex gap-4 items-center justify-between">
            <div>Saved Pairings</div>
            <Button
              className={`${fontPairs.length < 1 ? "text-neutral-500" : ""}`}
              onClick={() => clearFontPairs()}>
              <Icon name="delete_sweep" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {fontPairs.map((fontPair, index) => {
              return (
                <div
                  className="group flex gap-4 justify-between items-center"
                  key={index}>
                  <div
                    onClick={() => {
                      setPrimaryFont(fontPair.primary);
                      setSecondaryFont(fontPair.secondary);
                    }}>
                    <div>{fontPair.primary.family}</div>
                    <div>{fontPair.secondary.family}</div>
                  </div>
                  <Button
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => removeFontPair(index)}>
                    <Icon name="close" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div
          className="outline-none"
          contentEditable={true}
          style={{ fontFamily: primaryFont?.family }}>
          Title
        </div>
        <div
          className="outline-none"
          contentEditable={true}
          style={{ fontFamily: secondaryFont?.family }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          veritatis magnam fuga officia velit sapiente! Repellat quae
          consequuntur quasi animi veniam, maxime dicta adipisci, accusantium
          tenetur voluptatem dignissimos earum unde!
        </div>
      </div>
    </div>
  );
}
