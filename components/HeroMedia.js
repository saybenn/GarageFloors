import Image from "next/image";

/**
 * Full-bleed background media for hero sections.
 * Parent <section> must be `relative`.
 */
export default function HeroMedia({
  type = "image", // "image" | "video"
  src = "/images/hero.webp",
  alt = "Garage floor coating in progress",
  poster, // for video
  priority = true,
}) {
  return (
    <div className="absolute inset-0 z-10 ">
      {type === "video" ? (
        <>
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
