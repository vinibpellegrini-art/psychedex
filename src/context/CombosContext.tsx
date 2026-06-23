import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// A substance selected for interaction checking. Only the fields the sidebar
// and interaction engine need are stored.
export type ComboItem = {
  id: number;
  name: string;
  category: string;
};

type CombosContextValue = {
  items: ComboItem[];
  has: (id: number) => boolean;
  toggle: (item: ComboItem) => void;
  remove: (id: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CombosContext = createContext<CombosContextValue | null>(null);

const STORAGE_KEY = "psychedex.combos";

// Provides the selected-substances state to the whole app and persists it to
// localStorage so the selection survives page navigation and reloads.
export function CombosProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ComboItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ComboItem[]) : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const has = (id: number) => items.some((i) => i.id === id);

  const toggle = (item: ComboItem) =>
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );

  const remove = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clear = () => setItems([]);

  return (
    <CombosContext.Provider
      value={{ items, has, toggle, remove, clear, open, setOpen }}
    >
      {children}
    </CombosContext.Provider>
  );
}

// Hook to access the combos store. Throws if used outside the provider.
export function useCombos() {
  const ctx = useContext(CombosContext);
  if (!ctx) throw new Error("useCombos must be used within a CombosProvider");
  return ctx;
}
