import { useHotkeys } from "react-hotkeys-hook";
import Icon from "@/app/_components/Icon";
import Button from "@/app/_components/Button";

const Shortcut = ({ keys, desc }: { keys: string; desc: string }) => (
  <div className="flex gap-2 justify-between">
    <div>{keys}</div>
    <div>{desc}</div>
  </div>
);

const Shortcuts = ({ onClose }: { onClose: () => void }) => {
  useHotkeys("escape", () => onClose());

  return (
    <div className="flex-1 bg-neutral-700 text-neutral-200  flex items-center justify-center">
      <div className="flex flex-col gap-2 min-w-96">
        <div className="flex gap-2 justify-between items-center">
          <div className="font-bold">KEYBOARD SHORTCUTS</div>{" "}
          <Button onClick={onClose}>
            <Icon name="close" />
          </Button>
        </div>
        <Shortcut
          keys="SHIFT + \"
          desc="Keyboard Shortcuts"
        />
        <Shortcut
          keys="SPACE"
          desc="Random Pair"
        />
        <Shortcut
          keys="SHIFT + S"
          desc="Save Pairing"
        />
        <Shortcut
          keys="SHIFT + 1"
          desc="Toggle Primary Font Lock"
        />
        <Shortcut
          keys="SHIFT + 2"
          desc="Toggle Secondary Font Lock"
        />
        <Shortcut
          keys="SHIFT + BACKSPACE"
          desc="Clear Saved Pairings"
        />
        <Shortcut
          keys="ESCAPE"
          desc="Close Shortcuts"
        />
      </div>
    </div>
  );
};

export default Shortcuts;
