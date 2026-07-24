import { create } from "zustand";
import { AddonId, MaterialId, SizeId, SpaceId, StructureId } from "./content";
import { BirthInfo, getMissingOhaeng } from "./ohaengMock";

export type Step = "landing" | "info" | "story" | "climax" | "options";

interface ProductOptionsState {
  size: SizeId;
  material: MaterialId;
  addons: AddonId[];
  space: SpaceId | null;
  structure: StructureId | null;
  popupOpen: boolean;
  popupSeen: boolean;
}

interface ExperienceState {
  step: Step;
  goTo: (step: Step) => void;

  birthInfo: BirthInfo;
  setBirthInfo: (patch: Partial<BirthInfo>) => void;

  gender: "f" | "m" | null;
  setGender: (gender: "f" | "m") => void;

  tasteAnswers: string[];
  tasteRoundIndex: number;
  answerTaste: (optionId: string) => void;
  previousTaste: () => void;

  resultRevealed: boolean;
  revealResult: () => void;

  product: ProductOptionsState;
  setSize: (size: SizeId) => void;
  setMaterial: (material: MaterialId) => void;
  toggleAddon: (addon: AddonId) => void;
  setSpace: (space: SpaceId) => void;
  setStructure: (structure: StructureId) => void;
  closePopup: () => void;
  applyRecommendedSize: (size: SizeId) => void;

  missingOhaeng: () => ReturnType<typeof getMissingOhaeng>;
}

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  step: "landing",
  goTo: (step) => set({ step }),

  birthInfo: { year: 1996, month: 6, day: 15, hour: 12 },
  setBirthInfo: (patch) =>
    set((state) => ({ birthInfo: { ...state.birthInfo, ...patch } })),

  gender: null,
  setGender: (gender) => set({ gender }),

  tasteAnswers: [],
  tasteRoundIndex: 0,
  answerTaste: (optionId) =>
    set((state) => ({
      tasteAnswers: [...state.tasteAnswers, optionId],
      tasteRoundIndex: state.tasteRoundIndex + 1,
    })),
  previousTaste: () =>
    set((state) => ({
      tasteAnswers: state.tasteAnswers.slice(0, -1),
      tasteRoundIndex: Math.max(0, state.tasteRoundIndex - 1),
    })),

  resultRevealed: false,
  revealResult: () => set({ resultRevealed: true }),

  product: {
    size: "a3",
    material: "canvas",
    addons: [],
    space: null,
    structure: null,
    popupOpen: false,
    popupSeen: false,
  },
  setSize: (size) => set((state) => ({ product: { ...state.product, size } })),
  setMaterial: (material) =>
    set((state) => ({ product: { ...state.product, material } })),
  toggleAddon: (addon) =>
    set((state) => {
      const has = state.product.addons.includes(addon);
      return {
        product: {
          ...state.product,
          addons: has
            ? state.product.addons.filter((a) => a !== addon)
            : [...state.product.addons, addon],
        },
      };
    }),
  setSpace: (space) =>
    set((state) => {
      const next = { ...state.product, space };
      const bothPicked = Boolean(next.space && next.structure);
      return {
        product: {
          ...next,
          popupOpen: bothPicked && !state.product.popupSeen,
        },
      };
    }),
  setStructure: (structure) =>
    set((state) => {
      const next = { ...state.product, structure };
      const bothPicked = Boolean(next.space && next.structure);
      return {
        product: {
          ...next,
          popupOpen: bothPicked && !state.product.popupSeen,
        },
      };
    }),
  closePopup: () =>
    set((state) => ({
      product: { ...state.product, popupOpen: false, popupSeen: true },
    })),
  applyRecommendedSize: (size) =>
    set((state) => ({
      product: {
        ...state.product,
        size,
        popupOpen: false,
        popupSeen: true,
      },
    })),

  missingOhaeng: () => getMissingOhaeng(get().birthInfo),
}));
