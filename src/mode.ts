export type Mode = 'design' | 'engineering'

// Each mode carries its own theme: design is light, engineering is dark.
export const THEME_FOR_MODE = { design: 'light', engineering: 'dark' } as const
