import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery, ParsedUrlQueryInput } from "querystring";

const instance = axios.create({
  baseURL: "http://localhost:80",
});

interface Token {
  token: string | null | false;
}

export const serverSideConfig = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): AxiosRequestConfig => {
  const token = context.req.cookies["token"];
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export default instance;
