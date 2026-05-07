"use client";

import { useState, useEffect } from "react";

type Props = {
  item: {
    id: number;
    name: string;
    image_url: string | null;
    price?: string | null;
  };
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
};

export default function InstrumentCard({
  item,
  updateAction,
  deleteAction,
}: Props) {
  const [name, setName] = useState(item.name);
  const [imageUrl, setImageUrl] = useState(item.image_url || "");
  const [price, setPrice] = useState(item.price || "");
  const [isEditing, setIsEditing] = useState(false);

  const isDirty =
    name !== item.name ||
    imageUrl !== (item.image_url || "") ||
    price !== (item.price || "");

  useEffect(() => {
    setName(item.name);
    setImageUrl(item.image_url || "");
    setPrice(item.price || "");
    setIsEditing(false);
  }, [item.name, item.image_url, item.price]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEditing) {
      e.preventDefault();
      setIsEditing(true);
    }
  };

  return (
    <div className="border-2 border-black rounded-lg bg-white overflow-hidden flex flex-col w-72 shadow-lg shadow-gray-500 hover:shadow-xl">
      {item.image_url ? (
        <img src={item.image_url} alt={item.name} className="w-full h-52" />
      ) : (
        <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">
          Нет фото
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <form id={`update-${item.id}`} action={updateAction} className="flex-1">
          <input type="hidden" name="id" value={item.id} />

          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
            className={`w-full font-bold text-lg p-1 mb-1 ${isEditing ? "border-b border-black" : "border-b border-transparent"}`}
            placeholder={isEditing ? "Название" : ""}
          />

          {/* ССЫЛКА НА ФОТО - ПОКАЗЫВАЕМ ТОЛЬКО ПРИ РЕДАКТИРОВАНИИ */}
          {isEditing && (
            <input
              name="image_url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Ссылка на фото"
              className="w-full text-sm text-gray-600 p-1 mb-2 border-b border-black"
            />
          )}

          {/* ЦЕНА */}
          {isEditing ? (
            <input
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Цена, напр. 1 800 000 сум"
              className="w-full text-sm p-1 mb-3 border-b border-black"
            />
          ) : (
            <div className="w-full text-sm mb-3 px-1 flex justify-between border-b">
              <b>Цена:</b>
              <span className="font-semibold text-blue-700">
                {item.price || "0 сум"}
              </span>
            </div>
          )}
        </form>

        <div className="flex justify-between gap-2 mt-auto">
          <button
            type="submit"
            form={`update-${item.id}`}
            onClick={handleButtonClick}
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
