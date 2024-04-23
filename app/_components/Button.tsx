import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  const { children } = props;

  return (
    <button
      className="flex items-center gap-2 leading-none"
      type="button"
      {...props}>
      {children}
    </button>
  );
};

export default Button;
