import Logo from "@/app/_components/Logo";
import Icon from "@/app/_components/Icon";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col flex-1 gap-2 text-neutral-100 items-center justify-center">
      <div className="text-4xl">
        <Logo />
      </div>
      <div>Eric Barbosa Jr.</div>
      <div className="flex items-center">
        ericbarbosajr
        <Icon name="alternate_email" />
        gmail.com
      </div>
      <div>
        <Link
          className="flex items-center"
          href={`/`}>
          <Icon name="arrow_back" /> Back
        </Link>
      </div>
    </div>
  );
};

export default Page;
