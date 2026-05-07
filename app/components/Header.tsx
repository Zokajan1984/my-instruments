"use client";

import { useState } from "react";

type Props = {
  addAction: (formData: FormData) => Promise<void>;
};

export default function Header({ addAction }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Лого */}
            <div className="flex items-center gap-3">
              <img
                src="/logoipsum-366.png"
                alt="Logo"
                className="w-12 h-12 rounded-xl"
              />
              <div>
                <div className="font-bold text-xl text-gray-900 leading-tight">
                  ToolShop
                </div>
                <div className="text-xs text-gray-500 -mt-1">
                  Электроинструменты
                </div>
              </div>
            </div>

            {/* Заголовок по центру - скрыт на мобиле */}
            <h1 className="hidden md:block text-2xl font-semibold text-gray-800">
              Каталог инструментов
            </h1>

            {/* Кнопка */}
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden sm:inline">Добавить</span>
            </button>
          </div>
        </div>
      </header>

      {/* Модалка */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              ✕
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Новый инструмент
              </h2>

              <form
                action={addAction}
                onSubmit={() => setOpen(false)}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Название
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Например, Перфоратор Makita"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Фото (URL)
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    placeholder="https://..."
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Цена
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder="1 800 000 сум"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow transition-all mt-2"
                >
                  Сохранить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
