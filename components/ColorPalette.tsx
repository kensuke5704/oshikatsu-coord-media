import type { PaletteColor } from "@/lib/types";

export function ColorPalette({ colors }: { colors: PaletteColor[] }) {
  return (
    <div className="soft-card rounded-[8px] p-5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1d3337]">
        Color Palette
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {colors.map((color) => (
          <div key={color.name} className="text-center">
            <span
              className="mx-auto block size-16 rounded-full border border-[#d7ecee] shadow-inner"
              style={{ backgroundColor: color.value }}
              aria-label={`${color.name} ${color.role}`}
            />
            <p className="mt-3 text-sm font-black text-[#1d3337]">{color.name}</p>
            <p className="mt-1 text-xs font-bold text-[#66777b]">{color.role}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {colors.slice(0, 3).map((color) => (
          <span
            key={color.usage}
            className="rounded-full border border-[#9fd4d8] bg-white px-4 py-2 text-xs font-bold text-[#21737c]"
          >
            {color.usage}
          </span>
        ))}
      </div>
    </div>
  );
}
