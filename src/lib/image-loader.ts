export const imageLoader = ({
  src,
  width,
  quality = 75, // Default quality jika tidak diberikan
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality}`;
};