"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  return <div>Error Bro : {error.message}</div>;
}
