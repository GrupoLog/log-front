import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash } from "lucide-react";

interface DotsDropdownProps {
  onEdit: () => void;
  onDelete?: () => void;
}

const DotsDropdown: React.FC<DotsDropdownProps> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full p-2 transition hover:bg-gray-100 focus:outline-none"
      >
        <MoreVertical className="h-5 w-5 text-gray-600" />
      </button>

      {open && (
        <div className="ring-opacity-5 absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black transition-all">
          <div className="py-1">
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
            >
              <Pencil size={16} />
              Editar
            </button>
            <button
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition hover:bg-gray-100"
            >
              <Trash size={16} />
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DotsDropdown;
