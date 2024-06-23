import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (data) => {
  return api.post("/login", data);
};

export const postKakaoAuth = (data) => {
  return api.post("/users/kakao", data);
};

export const register = (data) => {
  return api.post("/signup", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const logout = () => {
  return api.delete("/logout");
};

export function getCurrentUser() {
  return api.get("/current_user");
}

export function postPrinterEmail(data) {
  return api.post("/current_user/set_printer_email", data);
}

export function sendPrint(data) {
  return api.post("/current_user/print", data);
}

export function createDiary(data) {
  return api.post("/diaries", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getDiaries() {
  return api.get("/diaries");
}

export function getDiary(id) {
  return api.get(`/diaries/${id}`);
}

export function updateDiary(id, data) {
  return api.put(`/diaries/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function deleteDiary(id) {
  return api.delete(`/diaries/${id}`);
}
