"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      Error Bro : {error.message} -{" "}
      {process.env.NEXT_PUBLIC_BASE_URL + "/komik/komik"}
    </div>
  );
}
