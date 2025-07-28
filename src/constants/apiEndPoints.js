const apiUrl = process.env.REACT_APP_API_URL;

export const API_END_POINTS = {
    GET_TOPIC: "/topic",
    GET_TOPIC_DIFFICULTY: "/topic/difficulty",
    GET_TOPIC_DIFFICULTY_WITH_SET: "/topic/difficulty/set",
    LOGIN: "/users/login",
    GET_REFRESH_TOKEN: "/users/token/refresh/",
    ADD_TOPIC: "/topic",
    ADD_QUESTIONS: "/question",
    GET_QUESTIONS: "/question",
    GET_QUIZSETS: "/quiz-set",
    ADD_QUIZSETS: "/quiz-set",
    START_QUIZ: "/exam/attempt/",
    ADD_QUIZ_RESPONSE: "/exam/attempt/submit",
    GET_RESULT: "/exam/result",
    GET_QUIZ_RESULT_REPORT: "/exam/attempt/result",
    GET_TEACHERS_DASHBOARD: "/quiz-set-details",
}
export const BASE_URL_END_POINT = {
    BASE_URL: apiUrl
}