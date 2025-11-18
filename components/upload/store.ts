import { create } from "zustand";
import { SupportedRatioType } from "../shared";

export type FileEditState = {
  ratio: SupportedRatioType;
  scale: number;
  position: { x: number; y: number };
};

export type FileUploadState = {
  status: string;
  url: string | null;
};

export type FileItem = {
  id: string;
  file: File;
  objectURL: string;
  edit: FileEditState;
  upload: FileUploadState;
};

const DEFAULT_UPLOAD_STATE = {
  status: "idle",
  url: null,
} as FileUploadState;

const DEFAULT_EDIT_STATE = {
  ratio: "16:9",
  scale: 1,
  position: { x: 0, y: 0 },
} as FileEditState;

type FileStore = {
  order: string[];
  files: Record<string, FileItem>;
  selectedId: string | null;
  addFiles: (files: File[]) => void;
  reset: () => void;
  setSelected: (id: string) => void;
  removeFile: (id: string) => void;
  // setUpload: (id: string, upload: Partial<FileUploadState>) => void;
  updateEdit: (id: string, partial: Partial<FileEditState>) => void;
  resetEdit: (id: string) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  files: {},
  order: [],
  selectedId: null,

  resetEdit: (id: string) =>
    set((state) => ({
      files: {
        ...state.files,
        [id]: {
          ...state.files[id],
          edit: DEFAULT_EDIT_STATE,
        },
      },
    })),

  removeFile: (id: string) =>
    set((state) => {
      const files = { ...state.files };
      delete files[id];

      const newOrder = state.order.filter((x) => x !== id);

      let newSelectedId = state.selectedId;
      if (state.selectedId === id) {
        newSelectedId = newOrder[0] ?? null;
      }

      return {
        files,
        order: newOrder,
        selectedId: newSelectedId,
      };
    }),

  addFiles: (files: File[]) =>
    set((state) => {
      const updates: Record<string, FileItem> = {};
      const newOrders = [...state.order];
      let selectedId = state.selectedId;

      files.forEach((file, i) => {
        const id = crypto.randomUUID();

        if (i === 0) {
          selectedId = id;
        }

        updates[id] = {
          id: id,
          file: file,
          edit: DEFAULT_EDIT_STATE,
          upload: DEFAULT_UPLOAD_STATE,
          objectURL: URL.createObjectURL(file),
        };

        newOrders.push(id);
      });

      return {
        files: { ...state.files, ...updates },
        selectedId: selectedId,
        order: newOrders,
      };
    }),

  reset: () => set((state) => ({ ...state, files: {} })),

  setSelected: (id: string) => set(() => ({ selectedId: id })),
  // setUpload: (id: string, upload: Partial<FileUploadState>) => {},
  // updateEdit: (id: string, partial: Partial<FileEditState>) => {},
  updateEdit: (id: string, partial: Partial<FileEditState>) =>
    set((state) => {
      const file = state.files[id];
      if (!file) return state;

      return {
        files: {
          ...state.files,
          [id]: {
            ...file,
            edit: {
              ...file.edit,
              ...partial,
            },
          },
        },
      };
    }),
}));
