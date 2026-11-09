export const DEFAULT_MESSAGE = "Uma flor para alegrar o seu dia";

export const RomanticMessage = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="fade-up message font-allura text-4xl sm:text-7xl leading-tight px-2 pb-2">
        {DEFAULT_MESSAGE}
      </h1>
      <div className="fade-in ornament" aria-hidden="true">
        ✦
      </div>
    </div>
  );
};
