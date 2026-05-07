"use client"; // ← говорим Next.js: этот код работает в браузере

import { useState, useEffect } from "react";

type Props = {
  item: { id: number; name: string; image_url: string | null };
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
};

export default function InstrumentCard({
  item,
  updateAction,
  deleteAction,
}: Props) {
  // храним текущие значения в состоянии браузера
  const [name, setName] = useState(item.name);
  const [imageUrl, setImageUrl] = useState(item.image_url || "");
  const [isEditing, setIsEditing] = useState(false);

  // проверяем, менял ли пользователь что-то
  const isDirty = name !== item.name || imageUrl !== (item.image_url || "");

  useEffect(() => {
    setName(item.name);
    setImageUrl(item.image_url || "");
    setIsEditing(false);
  }, [item.name, item.image_url]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEditing) {
      e.preventDefault();
      setIsEditing(true);
      setName("");
      setImageUrl("");
    }
  };

  return (
    <div className="border-2 border-black rounded-lg bg-white overflow-hidden flex flex-col w-72 shadow-lg shadow-gray-500 hover:shadow-xl">
      {/* фото */}
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-52 mx-auto"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          Нет фото Test
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        {/* форма обновления — теперь клиентская, но action серверный */}
        <form id={`update-${item.id}`} action={updateAction} className="flex-1">
          <input type="hidden" name="id" value={item.id} />

          <input
            name="name"
            value={name} // контролируемый input
            onChange={(e) => setName(e.target.value)} // ловим каждый ввод
            className="w-full font-bold text-lg mb-2 p-1 border-b"
            placeholder={isEditing ? "Введите новое название" : ""}
          />
          <input
            name="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={isEditing ? "Новая ссылка" : ""}
            className="w-full text-sm text-gray-600 p-1 border-b mb-3"
          />
        </form>

        {/* кнопки */}
        <div className="flex justify-between gap-2 mt-auto">
          <button
            type="submit"
            form={`update-${item.id}`}
            onClick={handleButtonClick}
            // меняем текст и цвет в зависимости от isDirty
            className={`px-3 py-1.5 rounded text-sm font-medium text-white ${
              isDirty
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {isDirty ? "Сохранить" : "Изменить"}
          </button>

          <form action={deleteAction}>
            <input type="hidden" name="id" value={item.id} />
            <button
              type="submit"
              className="text-white bg-red-500 rounded py-1.5 px-3 text-sm hover:bg-red-600"
            >
              Удалить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
