"use client";

import { useEffect, useState } from "react";
import { Font } from "@/app/types";
import DynamicFontLoader from "@/app/_components/DynamicFontLoader";
import { getFontsList } from "@/app/_functions/main";
import Button from "@/app/_components/Button";
import { useAppContext } from "@/app/_contexts/AppContext";
import Logo from "@/app/_components/Logo";
import Icon from "@/app/_components/Icon";
import { useHotkeys } from "react-hotkeys-hook";
import Shortcuts from "@/app/_components/Shortcuts";
import Link from "next/link";
import Preview from "@/app/_components/Preview";
import { debounce } from "lodash";

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [primaryFont, setPrimaryFont] = useState<Font>();
  const [secondaryFont, setSecondaryFont] = useState<Font>();
  const [lockPrimaryFont, setLockPrimaryFont] = useState(false);
  const [lockSecondaryFont, setLockSecondaryFont] = useState(false);
  const { fontPairs, saveFontPair, removeFontPair, clearFontPairs } =
    useAppContext();
  const [showShortcuts, setShowShortcuts] = useState(false);

  useHotkeys(
    "space",
    debounce(() => handleRandomFont(), 300)
  );
  useHotkeys("shift+1", () => handleTogglePrimaryLock());
  useHotkeys("shift+2", () => handleToggleSecondaryLock());
  useHotkeys("shift+backspace", () => handleClearFontPairs());
  useHotkeys("shift+s", () => handleSaveFontPair());
  useHotkeys("shift+|", () => setShowShortcuts(true));

  const handleTogglePrimaryLock = () => setLockPrimaryFont(!lockPrimaryFont);
  const handleToggleSecondaryLock = () =>
    setLockSecondaryFont(!lockSecondaryFont);
  const handleClearFontPairs = () => clearFontPairs();
  const handleSaveFontPair = () => {
    if (!primaryFont) return;
    if (!secondaryFont) return;

    saveFontPair({
      primary: primaryFont,
      secondary: secondaryFont,
    });
  };

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
      <div className="flex flex-1 items-center text-neutral-100 justify-center text-6xl">
        <Logo />
      </div>
    );

  if (showShortcuts)
    return <Shortcuts onClose={() => setShowShortcuts(false)} />;

  return (
    <div className="flex flex-1 flex-row overflow-hidden">
      {primaryFont && <DynamicFontLoader font={primaryFont} />}
      {secondaryFont && <DynamicFontLoader font={secondaryFont} />}
      <div className="shrink-0 p-6 w-72 flex flex-col overflow-hidden gap-6 bg-neutral-700 text-neutral-200 select-none">
        <div className="text-xl flex justify-between">
          <Link href={"/about"}>
            <Logo />
          </Link>
          <Button onClick={() => setShowShortcuts(true)}>
            <Icon name="keyboard" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleRandomFont}>
            <Icon name="shuffle" />
            <span>Random</span>
          </Button>
          <Button onClick={handleSaveFontPair}>
            <Icon name="save" />
            <span>Save Pairing</span>
          </Button>
        </div>
        <div>
          <div className="flex justify-between gap-4 items-center">
            <div>Primary</div>
            <Button onClick={handleTogglePrimaryLock}>
              <span
                className={`leading-none ${
                  lockPrimaryFont ? "text-primary-500" : ""
                }`}>
                {lockPrimaryFont ? (
                  <Icon name="lock" />
                ) : (
                  <Icon name="lock_open" />
                )}
              </span>
            </Button>
          </div>
          <div className="text-sm text-neutral-300 font-light">
            {primaryFont.family}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div>Secondary</div>
            <Button onClick={handleToggleSecondaryLock}>
              <span
                className={`leading-none ${
                  lockSecondaryFont ? "text-primary-500" : ""
                }`}>
                {lockSecondaryFont ? (
                  <Icon name="lock" />
                ) : (
                  <Icon name="lock_open" />
                )}
              </span>
            </Button>
          </div>
          <div className="text-sm text-neutral-300 font-light">
            {secondaryFont.family}
          </div>
        </div>
        <div className="flex-1 gap-2 overflow-hidden flex flex-col">
          <div className="flex gap-4 items-center justify-between">
            <div>Saved Pairings</div>
            <Button
              className={`${fontPairs.length < 1 ? "text-neutral-500" : ""}`}
              onClick={handleClearFontPairs}>
              <Icon name="delete_sweep" />
            </Button>
          </div>
          <div className="flex flex-1  no-scrollbar  overflow-y-auto flex-col gap-2">
            {fontPairs.map((fontPair, index) => {
              return (
                <div
                  className="group cursor-pointer flex gap-4 justify-between items-center"
                  key={index}>
                  <div
                    className="text-sm text-neutral-300 font-light group-hover:text-neutral-100"
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
      <div className="flex-1 flex flex-col">
        <Preview
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
      </div>
    </div>
  );
}
