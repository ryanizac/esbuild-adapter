export const stages = ["start", "build", "rebuild", "watch"] as const;

export type MappedStages = (typeof stages)[number];
