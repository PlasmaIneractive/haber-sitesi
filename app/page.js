import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

async function getHaberler() {
  try {
    const q = query(collection(db, "haberler"), orderBy("tarih", "desc"), limit(20));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Haberler çekilemedi:", error);
    return [];
  }
}

export default async function Home() {
  const haberler = await getHaberler();

  return (
    <main className="min-h-screen p-8 bg-[#fdfaf6]">
      <header className="mb-12">
        <h1 className="text-4xl font-serif text-[#5d4037] text-center italic">Hikayesi Olan Dokunuşlar</h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {haberler.length > 0 ? (
          haberler.map((haber) => (
            <article key={haber.id} className="bg-white border border-[#d7ccc8] p-4 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300">
              {haber.gorsel && (
                <img src={haber.gorsel} alt={haber.baslik} className="w-full h-56 object-cover rounded-sm mb-4" />
              )}
              <span className="text-[10px] uppercase text-[#8d6e63] font-bold tracking-widest">{haber.kaynak || "Gündem"}</span>
              <h2 className="text-xl font-medium text-[#3e2723] mt-2 leading-snug">{haber.baslik}</h2>
            </article>
          ))
        ) : (
          <p className="col-span-full text-center text-[#8d6e63]">Henüz yeni bir dokunuş kaydedilmemiş...</p>
        )}
      </div>
    </main>
  );
}