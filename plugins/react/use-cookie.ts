import { CookieOptions } from "@u-tools/core/modules/cookies/cookie-types";
import { createClientCookieFactory } from "@u-tools/core/modules/cookies/create-client-side-cookie-factory";
import { useEffect, useState } from "react";

export function useCookie<T = string>(cookieKey: string, options?: CookieOptions) {
  const cookie = createClientCookieFactory(cookieKey);

  const [cookieData, setCookieData] = useState<{ value: T | null }>(() => {
    return {
      value: cookie.getParsedCookie(),
    };
  });

  const getCookie = (name: string = cookieKey) => {
    return cookie.getRawCookie(name);
  };

  useEffect(() => {
    setCookieData({
      value: cookie.getParsedCookie(),
    });
  }, []);

  const updateCookie = (
    value: T,
    updateOptions: CookieOptions & {
      cookieKey?: string; // optionally override cookie  key
    } = options || {}
  ) => {
    const stringifiedValue = stringifyCookieData(value);
    cookie.setCookie(cookieKey, stringifiedValue, updateOptions);
    setCookieData({ value: value });
  };

  const removeCookie = (name: string = cookieKey) => {
    cookie.deleteCookie(name);
    setCookieData({ value: null });
  };

  const stringifyCookieData = (data: T): string => {
    if (typeof data === "string") {
      return data;
    } else {
      return JSON.stringify(data);
    }
  };

  const checkCookie = (name: string = cookieKey) => {
    return cookie.checkCookie(name);
  };

  return {
    cookie: cookieData.value,
    updateCookie,
    removeCookie,
    checkCookie,
    getCookie,
  };
}

export default useCookie;
