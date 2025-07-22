"use client";

import { Global } from "@emotion/react";
import { globalStyles } from "@/styles/globalStyles";

export default function GlobalStyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Global styles={globalStyles} />
      {children}
    </>
  );
}
