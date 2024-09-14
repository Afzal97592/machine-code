interface ButtonProps {
  handleToastArray: () => void;
  text: string;
  style: string;
}

const ButtonComp = ({ handleToastArray, text, style }: ButtonProps) => {
  return (
    <button
      className={`${style} px-4 py-2  text-zinc-100 mx-3 rounded-full`}
      onClick={handleToastArray}
    >
      {text}
    </button>
  );
};

export default ButtonComp;
