import React from "react";

export default function Description({ desc }: { desc: string }) {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{desc}</p>
    </div>
  );
}
