import { ShoppingItem } from "@prisma/client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}

const ItemModal: FC<Props> = ({ setModalOpen, setItems }) => {
  const [input, setInput] = useState("");
  const { mutate: addItem } = trpc.items.addItem.useMutation({
    onSuccess(shoppingItem) {
      setItems((prev) => [...prev, shoppingItem]);
    },
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-3">
        <h3 className="text-xl font-semibold">Name of Item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-100"
        />
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              addItem({ name: input });
              setModalOpen(false);
            }}
            className="rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
