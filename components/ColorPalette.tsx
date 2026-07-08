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
    <div className="soft-card p-5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1d3337]">
        Color Palette
      </p>
      <div className="mt-4 overflow-hidden border border-[#d7ecee] bg-white">
        <div className="flex h-10">
          {slots.map((slot) => (
            <div
              key={`${slot.label}-${slot.color.name}`}
              className="min-w-12 border-r border-white/75 last:border-r-0"
              style={{
                width: `${slot.share}%`,
                backgroundColor: slot.color.value,
              }}
              aria-label={`${slot.color.name} ${slot.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
