import { SupportedRatioType } from "@/components/shared";
import { create } from "zustand";

export type FileEditState = {
  ratio: SupportedRatioType;
  scale: number;
  position: { x: number; y: number };
  crop: { x: number; y: number; width?: number; height?: number };
  rotation: number;
  flip: {
    horizontal: boolean;
    vertical: boolean;
  };
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
  ratio: "1:1",
  scale: 1,
  position: { x: 0, y: 0 },
  crop: { x: 0, y: 0, width: 0.8, height: 0.8 },
  flip: { horizontal: false, vertical: false },
  rotation: 0,
} as FileEditState;

type FileStore = {
  order: string[];
  files: Record<string, FileItem>;
  selectedId: string | null;
  addFiles: (files: File[]) => void;
  reset: () => void;
  setSelected: (id: string) => void;
  removeFile: (id: string) => void;
  setEdit: (id: string, partial: Partial<FileEditState>) => void;
  resetEdit: (id: string) => void;
  setOrderByIndex: (from: number, to: number) => void;
  // setUpload: (id: string, upload: Partial<FileUploadState>) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  files: {},
  order: [],
  selectedId: null,

  setOrderByIndex: (from: number, to: number) =>
    set((state) => {
      const arr = [...state.order];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return { order: arr };
    }),
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
  setEdit: (id: string, partial: Partial<FileEditState>) =>
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
