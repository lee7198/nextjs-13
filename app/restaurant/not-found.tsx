"use client";
import React from "react";
import ErrorImage from "../../public/icon/error.png";
import Image from "next/image";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image
        className="w-56 mb-8"
        alt="error"
        src={ErrorImage}
        width="300"
        height="300"
      />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
        <p className="text-regray font-bold">
          We couldn&apos;t find that restaurant
        </p>
        <p className="mt-6 text-sm font-light">Error Code: 400</p>
      </div>
    </div>
  );
}
