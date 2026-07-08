import type { PaletteColor } from "@/lib/types";

type PaletteSlot = {
  color: PaletteColor;
  share: number;
  label: string;
};

const paletteRoles = [
  { key: "main", label: "メイン", share: 60, matcher: "メイン" },
  { key: "sub", label: "サブ", share: 25, matcher: "サブ" },
  { key: "accent", label: "アクセント", share: 10, matcher: "アクセント" },
  { key: "adjust", label: "調整", share: 5, matcher: "調整" },
];

function getPaletteSlots(colors: PaletteColor[]): PaletteSlot[] {
  const used = new Set<PaletteColor>();
  const slots = paletteRoles.flatMap((role, index) => {
    const color =
      colors.find((candidate) => !used.has(candidate) && candidate.role.includes(role.matcher)) ??
      colors.find((candidate) => !used.has(candidate) && colors.indexOf(candidate) === index);

    if (!color) {
      return [];
    }

    used.add(color);
    return [{ color, share: role.share, label: role.label }];
  });

  const total = slots.reduce((sum, slot) => sum + slot.share, 0);
  if (total === 0) {
    return [];
  }

  return slots.map((slot) => ({
    ...slot,
    share: (slot.share / total) * 100,
  }));
}

export function ColorPalette({ colors }: { colors: PaletteColor[] }) {
  const slots = getPaletteSlots(colors);

  return (
    <div className="soft-card rounded-[8px] p-5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1d3337]">
        Color Palette
      </p>
      <div className="mt-5 overflow-hidden rounded-[8px] border border-[#d7ecee] bg-white">
        <div className="flex h-20">
          {slots.map((slot) => (
            <div
              key={`${slot.label}-${slot.color.name}`}
              className="relative min-w-12 border-r border-white/75 last:border-r-0"
              style={{
                width: `${slot.share}%`,
                backgroundColor: slot.color.value,
              }}
              aria-label={`${slot.color.name} ${slot.label} ${Math.round(slot.share)}%`}
            >
              <span className="absolute inset-x-2 bottom-2 truncate rounded bg-white/78 px-2 py-1 text-center text-[11px] font-black text-[#1d3337] shadow-sm">
                {Math.round(slot.share)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {slots.map((slot) => (
          <div
            key={slot.color.name}
            className="rounded-[8px] border border-[#d7ecee] bg-white p-3"
          >
            <span
              className="block h-3 rounded-full border border-black/5"
              style={{ backgroundColor: slot.color.value }}
            />
            <p className="mt-3 text-sm font-black text-[#1d3337]">{slot.color.name}</p>
            <p className="mt-1 text-xs font-bold text-[#66777b]">
              {slot.label} {Math.round(slot.share)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
