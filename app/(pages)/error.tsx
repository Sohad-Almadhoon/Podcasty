"use client";
import { NextPage } from "next";

type ErrorProps = {
  statusCode: number;
};

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">{statusCode}</h1>
        <p className="mt-4 text-xl">Oops, something went wrong!</p>
        {statusCode === 404 && (
          <p className="mt-2">The page you are looking for was not found.</p>
        )}
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default ErrorPage;
