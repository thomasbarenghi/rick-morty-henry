import axios from "axios";
import { serverUrl, headersAuth } from "@/data/config";

export const axiosPutter = async (url: string, data: any, cType: any) => {
  const { data: res } = await axios.put(serverUrl + url, data, {
    headers: {
      "Content-Type": cType,
    },
  });

  return res;
};

type axiosPoster = {
  url: any;
  body?: any;
};
export const axiosPoster = async ({ url, body }: axiosPoster) => {
  const { data: res } = await axios.post(serverUrl + url, body || {});

  return res;
};

type axiosGetter = {
  url: any;
  body?: any;
};

export const axiosGetter = async ({ url, body }: axiosGetter) => {
  const { data: res } = await axios.get(serverUrl + url, {
    headers: headersAuth,
    params: body,
  });

  return res;
};

export const axiosDeleter = async (url: string) => {
  const { data: res } = await axios.delete(serverUrl + url, {
    headers: headersAuth,
  });

  return res;
};
