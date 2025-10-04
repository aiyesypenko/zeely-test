// Mocked API for backgrounds
export async function fetchRandomBackgroundUrl(index: number): Promise<string> {
  // Simulate a 3-second delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return `https://picsum.photos/200/300?random=${index}`;
}


