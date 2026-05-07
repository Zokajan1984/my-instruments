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
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col w-full max-w- group">
      {/* Фото с бейджем цены */}
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Нет фото
          </div>
        )}

        {/* Бейдж цены */}
        {!isEditing && (
          <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {item.price || "0 сум"}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <form id={`update-${item.id}`} action={updateAction} className="flex-1">
          <input type="hidden" name="id" value={item.id} />

          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
            className={`w-full font-semibold text-lg mb-2 p-1 bg-transparent outline-none ${
              isEditing ? "border-b border-gray-300 focus:border-blue-500" : ""
            }`}
            placeholder={isEditing ? "Название" : ""}
          />

          {isEditing && (
            <>
              <input
                name="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Ссылка на фото"
                className="w-full text-sm text-gray-600 p-1 mb-2 border-b border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Цена, напр. 1 800 000 сум"
                className="w-full text-sm p-1 mb-3 border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            </>
          )}
        </form>

        <div className="flex gap-2 mt-auto pt-2">
          <button
            type="submit"
            form={`update-${item.id}`}
            onClick={handleButtonClick}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDirty
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {isDirty ? "Сохранить" : "Изменить"}
          </button>

          <form action={deleteAction}>
            <input type="hidden" name="id" value={item.id} />
            <button
              type="submit"
              className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
            >
              Удалить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
