import Cookie from "js-cookie";

const setCookie = (name, value) => {
    Cookie.set(name, value);
};

const getCookie = (name) => {
    const value = Cookie.get(name);
    return value;
};

const removeCookie = (name) => {
    Cookie.remove(name);
};

export { setCookie, getCookie, removeCookie };
