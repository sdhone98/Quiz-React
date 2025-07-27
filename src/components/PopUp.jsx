import CustomBtn from "./CustomBtn";

const PopUp = ({
  mainMsg,
  subMsg,
  onConfirm,
  onCancel,
  btn1Msg,
  btn2Msg,
  showCancel = false,
}) => {
  return (
    <div className="h-full w-full fixed flex justify-center items-center z-50 pb-60 backdrop-blur-md">
      <div className="p-4 w-full max-w-lg">
        <div className="p-6 bg-color-bg rounded-lg shadow">
          <div className="mb-4 text-sm font-light text-color-text">
            <h3 className="mb-3 text-2xl font-semibold">{mainMsg}</h3>
            <p className="text-sm text-color-text-sub">{subMsg}</p>
          </div>
          <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
            {showCancel && (
              <CustomBtn label={btn1Msg || "Cancel"} onBtnClick={onCancel} />
            )}

            <CustomBtn label={btn2Msg || "Confirm"} onBtnClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
