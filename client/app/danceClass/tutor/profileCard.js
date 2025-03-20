import excludeImage from "./Exclude.png";

export default function ProfileCard() {
  return (
    <div className="relative max-w-md mx-auto overflow-hidden bg-neutral-800 text-white">
      {/* Image container */}
      <div className="relative">
        <img
          src="https://cdn.midjourney.com/4330b563-6a27-4da4-bd1f-c8d84ce90570/0_2.png"
          alt="Director profile"
          width={600}
          height={800}
          className="w-full h-auto"
        />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 p-6 pb-8">
          <div className="flex flex-col">
            <span className="text-lg font-medium tracking-wide opacity-90">
              Director
            </span>
            <h1 className="text-5xl font-bold tracking-tight leading-none mt-1">
              <span className=" border-white pb-1">Lok Man</span>
              <br />
              <span className="mt-1 inline-block">Chan</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
