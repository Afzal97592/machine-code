import React, { useEffect, useState } from "react";
import ToastCard from "../components/ToastCard";
import ButtonComp from "../components/buttonComp";

interface Toast {
  id: number;
  text: string;
  timer: number;
}

const Toaster: React.FC = () => {
  const [toastArray, setToastArray] = useState<Toast[]>([]);

  const handleToastArray = (text: string) => {
    setToastArray((prev) => [
      ...prev,
      { id: Date.now(), text: text, timer: 5 },
    ]);
  };

  const handleClose = (id: number) => {
    const updatedArray = toastArray.filter((item) => item.id !== id);
    setToastArray(updatedArray);
  };
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setToastArray(
        toastArray
          .map((item) =>
            item.timer > 0 ? { ...item, timer: item.timer - 1 } : item
          )
          .filter((item) => item?.timer > 0)
      );
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [toastArray]);

  return (
    <div>
      <h1 className="text-3xl font-semibold">
        Toaster App for Success, Error, Warning
      </h1>
      <div className="flex items-center justify-center h-screen">
        <ButtonComp
          handleToastArray={() => handleToastArray("This is Success Toast")}
          text={"Success"}
          style="bg-green-700  hover:bg-green-900"
        />
        <ButtonComp
          handleToastArray={() => handleToastArray("This is Error Toast")}
          text={"Error toast"}
          style="bg-red-600  hover:bg-red-900"
        />
      </div>
      <div className="absolute top-3 right-4 space-y-2">
        {toastArray.map((toast) => (
          <>
            {toast.timer && (
              <ToastCard
                key={toast?.id}
                text={toast.text}
                onClose={() => handleClose(toast.id)}
                timer={toast.timer}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Toaster;
