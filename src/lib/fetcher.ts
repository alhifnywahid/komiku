export default async function fetcher<T>(endpoint: string = ""): Promise<T> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    console.log(baseURL + endpoint);
    const response = await fetch(baseURL + endpoint, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Bisa di-handle oleh pemanggil fungsi
  }
}
