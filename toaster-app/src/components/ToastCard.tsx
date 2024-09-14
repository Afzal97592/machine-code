interface Props {
  text: string;
  onClose: () => void;
  timer: number;
}

const ToastCard = ({ text, onClose, timer }: Props) => {
  return (
    <div className="flex justify-between flex-col items-center bg-gray-300  rounded-md">
      <div className="flex justify-between items-center w-80 py-3 px-6">
        <p className="text-1xl from-neutral-100">
          {text} {timer}
        </p>
        <p
          className="bg-red-600 px-2 py-1 rounded-md cursor-pointer"
          onClick={onClose}
        >
          X
        </p>
      </div>
      <div
        className=" h-1 bg-red-600 rounded-md transition-width duration-1000 ease-linear"
        style={{
          width: "100%",
          transformOrigin: "left",
          transform: `scaleX(${(timer / 5) * 100}%)`,
        }}
      ></div>
    </div>
  );
};

export default ToastCard;
