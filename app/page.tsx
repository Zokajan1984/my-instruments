// app/page.tsx
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import InstrumentCard from "./components/InstrumentCard";
import Header from "./components/Header";

export default async function Home() {
  const { data: instruments } = await supabase
    .from("instruments")
    .select("*")
    .order("id", { ascending: false });

  async function addInstrument(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const image_url = formData.get("image_url") as string;
    const price = formData.get("price") as string;
    if (!name) return;
    await supabase
      .from("instruments")
      .insert({ name, image_url: image_url || null, price: price || "0 сум" });
    revalidatePath("/");
  }

  async function updateInstrument(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const image_url = formData.get("image_url") as string;
    const price = formData.get("price") as string;
    if (!id || !name) return;
    await supabase
      .from("instruments")
      .update({ name, image_url: image_url || null, price })
      .eq("id", id);
    revalidatePath("/");
  }

  async function deleteInstrument(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    await supabase.from("instruments").delete().eq("id", id);
    revalidatePath("/");
  }

  return (
    <>
      <Header addAction={addInstrument} />
      <main className="p-6 container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Мои инструменты</h1>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
            {instruments?.map((item) => (
              <InstrumentCard
                key={item.id}
                item={item}
                updateAction={updateInstrument}
                deleteAction={deleteInstrument}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
