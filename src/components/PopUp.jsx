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
        <div className="p-6 bg-color-navbar rounded-lg shadow">
          <div className="mb-4 text-sm font-light text-color-text-1">
            <h3 className="mb-3 text-2xl font-bold">{mainMsg}</h3>
            <p>{subMsg}</p>
          </div>
          <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
            {showCancel && (
              <button
                type="button"
                className="py-2 px-4 w-fit text-sm font-medium bg-color-button-1 text-color-text-2 rounded-lg hover:cursor-pointer"
                onClick={onCancel}
              >
                {btn1Msg || "Cancel"}
              </button>
            )}

            <button
              type="button"
              className="py-2 px-4 w-fit text-sm font-medium bg-color-button-1 text-color-text-2 rounded-lg hover:cursor-pointer"
                onClick={onConfirm}
            >
              {btn2Msg || "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
