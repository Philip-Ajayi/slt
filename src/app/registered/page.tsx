"use client";

import dynamic from "next/dynamic";

const UserTable = dynamic(() => import("@/components/UserTable"), {
  ssr: false,
});

export default function RegisteredPage() {
  return (
    <main className="max-w-6xl mx-auto pt-24 px-4">
      <UserTable title="All Registered Attendees" accommodationOnly={false} />
    </main>
  );
}
