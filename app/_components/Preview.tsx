import { Font } from "@/app/types";
import TextOnlyInput from "@/app/_components/TextOnlyInput";

const Preview = ({
  primaryFont,
  secondaryFont,
}: {
  primaryFont: Font;
  secondaryFont: Font;
}) => {
  return (
    <div className="p-12 px-14 flex flex-1 flex-col gap-4 text-neutral-100 bg-neutral-600 selection:bg-neutral-800">
      <div
        className="text-4xl"
        style={{ fontFamily: primaryFont.family }}>
        <TextOnlyInput defaultText="Title" />
      </div>
      <div style={{ fontFamily: secondaryFont.family }}>
        <TextOnlyInput
          defaultText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          eveniet laudantium perferendis quaerat quisquam, temporibus ratione
          ipsum sapiente ex quo fuga. Perferendis sed ea quia amet
          exercitationem sequi delectus vel."
        />
      </div>
    </div>
  );
};

export default Preview;
