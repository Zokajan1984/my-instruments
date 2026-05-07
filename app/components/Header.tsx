"use client";

import { useState } from "react";

type Props = {
  addAction: (formData: FormData) => Promise<void>;
};

export default function Header({ addAction }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b-2 border-black bg-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">
          <img
            src="/logoipsum-366.png"
            alt="Logotip"
            className="w-20 h-20"
          />
        </div>

        <h1 className="text-4xl font-bold">Электроинструменты для строительства</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Добавить инструмент
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg border-2 border-black w-full max-w-md relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-xl"
            >
              x
            </button>

            <h2 className="font-semibold mb-4 text-center">
            Добавление новых инструментов
            </h2>

            <form
              action={addAction}
              onSubmit={() => setOpen(false)}
              className="space-y-2"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Название"
                className="border p-2 rounded w-full mb-2"
              />

              <input
                type="text"
                name="image_url"
                placeholder="https://..."
                required
                className="border p-2 rounded w-full mb-2"
              />

              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
