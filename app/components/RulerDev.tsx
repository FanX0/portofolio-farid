const RulerDev = () => {
  // semua tick tiap 10px sampai 10000px
  const allTicks = Array.from({ length: 2000 }, (_, i) => (i + 1) * 10);

  return (
    <div className="pointer-events-none relative inset-y-0 left-[90%] w-16 z-50 mix-blend-difference">
      {/* garis utama (ruler) di tengah */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{
          backgroundColor: "#ffffff",
        }}
      />

      {/* garis kecil tiap 10px (opsional, pakai dashed effect) */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to bottom,
              #ffffff 0,
              #ffffff 1px,
              transparent 1px,
              transparent 10px
            )
          `,
        }}
      />

      {allTicks.map((value) => {
        const isHundred = value % 100 === 0;
        const isFifty = !isHundred && value % 50 === 0;
        const showNumeric = value === 10 || isFifty || isHundred;
        const tickWidth = isHundred ? "w-6" : isFifty ? "w-4" : "w-2";
        const labelClass = isHundred
          ? "text-[10px]"
          : isFifty || value === 10
          ? "text-[9px]"
          : "text-[8px]";

        return (
          <div
            key={`tick-${value}`}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ top: `${value}px` }}
          >
            <div className={`h-px ${tickWidth} bg-white`} />
            <span className={`ml-1 ${labelClass} text-white`}>
              {showNumeric ? `${value} px` : "-"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RulerDev;
