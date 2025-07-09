import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { BASE_URL_END_POINT, API_END_POINTS } from "../constants/apiEndPoints";
import { useDispatch } from "react-redux";
import { setTopics } from "../redux/topicSlice";
import { apiRequest } from "../utils/api";
import { useLoading } from "../context/LoadingContext";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const NewTopicAddPopUp = ({ onClose }) => {
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();
  const dispatch = useDispatch();
  const [topicList, setTopicList] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [isTopicsUpdate, setIsTopicsUpdate] = useState(false);

  const addTopicToList = () => {
    let name = topicName.trim();
    if (name.length === 0)
      return showToast("Warning", "Warning", "Topic required.!");
    if (topicList.includes(name))
      return showToast("Warning", "Warning", name + "already selected.!");
    setTopicList([...topicList, topicName]);
    setTopicName("");
  };
  const saveTopics = async () => {
    if (!topicList.length > 0) return showToast("Warning", "Warning", "Atleast one Topic required.!");
    setIsLoading(true);
    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_TOPIC,
      method: "POST",
      data: {
        topics: topicList,
      },
    });
    setIsLoading(false);

    if (success) {
      showToast("Info", "Info", "New topics added successfully.!");
      onClose(false);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  return (
    <div
      id="default-modal"
      tabindex="-1"
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-color-button-3 rounded-lg shadow-sm p-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white px-4 pb-4">
            Add New Topics
          </h3>

          <div className="flex items-center px-4 mb-2 gap-2">
            <input
              type="topic"
              name="topic"
              id="topic"
              className="bg-color-background text-color-text-1 text-sm rounded-lg p-3 flex-2"
              placeholder="enter topic name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              required
            />
            <button
              onClick={() => addTopicToList()}
              data-modal-hide="default-modal"
              type="button"
              className="text-color-text-2 bg-color-button-1 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add
            </button>
          </div>
          <div
            className={`${
              topicList ? "" : "hidden"
            } flex flex-wrap gap-2 p-4 md:p-5 h-fit max-h-48 overflow-y-auto`}
          >
            {topicList.map((ele, index) => (
              <span
                id="badge-dismiss-default"
                class="inline-flex items-center px-2 py-1 me-2 text-md font-medium bg-color-background text-color-text-1 rounded-sm hover:cursor-default"
              >
                {ele}
                <button
                  onClick={() =>
                    setTopicList(topicList.filter((item) => item !== ele))
                  }
                  type="button"
                  class="inline-flex items-center p-1 ms-2 text-sm hover:bg-color-accent-1"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                >
                  <svg
                    class="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Remove badge</span>
                </button>
              </span>
            ))}
          </div>
          
          <div className="disable flex items-center p-4 border-gray-200 rounded-b dark:border-gray-600 gap-2">
            <button
              onClick={() => saveTopics()}
              type="button"
              className="sm:col-span-2 text-color-text-2 bg-color-button-1 hover:bg-color-button-3 hover:text-color-text-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled
              >
              Save
            </button>
            <button
              onClick={() => onClose(false)}
              type="button"
              className="text-color-text-2 bg-color-button-3 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTopicAddPopUp;
