import Header from "./components/Header";
import InstrumentCard from "./components/InstrumentCard";
import { supabase } from "@/lib/supabase";

async function getInstruments() {
  const { data } = await supabase
    .from("instruments")
    .select("*")
    .order("id", { ascending: false });
  return data || [];
}

export default async function Home() {
  const instruments = await getInstruments();

  async function addInstrument(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const image_url = formData.get("image_url") as string;
    const price = formData.get("price") as string;
    await supabase.from("instruments").insert([{ name, image_url, price }]);
  }

  async function updateInstrument(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
    const image_url = formData.get("image_url") as string;
    const price = formData.get("price") as string;
    await supabase
      .from("instruments")
      .update({ name, image_url, price })
      .eq("id", id);
  }

  async function deleteInstrument(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    await supabase.from("instruments").delete().eq("id", id);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header addAction={addInstrument} />

      {/* БАННЕР */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581147036322-56ca6fe103f0?q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              В наличии {instruments.length} инструментов
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Профессиональные
              <span className="block text-blue-200">электроинструменты</span>
            </h1>

            <p className="text-lg text-blue-100 mb-8 max-w-lg">
              Makita, Bosch, DeWalt и другие бренды. Доставка по Узбекистану.
              Гарантия качества.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Смотреть каталог
              </a>
              <button className="bg-white/10 backdrop-blur border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                +998 90 123-45-67
              </button>
            </div>
          </div>
        </div>

        {/* Волна внизу */}
        <svg
          className="absolute bottom-0 w-full h-12 text-gray-50"
          fill="currentColor"
          viewBox="0 0 1440 48"
        >
          <path d="M0 48h1440V0c-240 32-480 48-720 48S240 32 0 0v48z" />
        </svg>
      </section>

      {/* КАТАЛОГ */}
      <main id="catalog" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Каталог</h2>
          <div className="text-sm text-gray-500">
            {instruments.length} товаров
          </div>
        </div>

        {instruments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🛠️</div>
            <p className="text-gray-500">
              Пока нет инструментов. Добавь первый!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
            {instruments.map((item) => (
              <InstrumentCard
                key={item.id}
                item={item}
                updateAction={updateInstrument}
                deleteAction={deleteInstrument}
              />
            ))}
          </div>
        )}
      </main>

      {/* ФУТЕР */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          © 2026 ToolShop Bukhara. Все инструменты в наличии.
        </div>
      </footer>
    </div>
  );
}
