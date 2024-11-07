
export const ERROR_MESSAGE = "Something went Wrong"



export const backendDomain = "https://mani-draw-backend.onrender.com"

export const getAccessToken = () => {
    return localStorage.getItem("token");
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least 6 characters, 1 letter, 1 number
export const phoneRegex = /^[6-9]\d{9}$/; // 10 digits, starts with 6, 7, 8, or 9