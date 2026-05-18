import React from "react";
import { getRandomActivity } from "@/lib/bored";

const typeLabels: Record<string, string> = {
  education: "Educação",
  recreational: "Lazer",
  social: "Social",
  diy: "Faça Você Mesmo",
  charity: "Caridade",
  cooking: "Culinária",
  relaxation: "Relaxamento",
  music: "Música",
  busywork: "Produtividade",
};

const BoredSection = async () => {
  const activity = await getRandomActivity();

  if (!activity) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color: "#ec4899" }}>
          💡 Ideia do Dia
        </h2>
        <div className="flex-1 border-b border-border" />
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200 dark:border-pink-800/30 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-[17px] md:text-lg font-medium text-pink-900 dark:text-pink-100 leading-relaxed">
          {activity.activity}
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-200/60 dark:bg-pink-800/40 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full">
            {typeLabels[activity.type] || activity.type}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-200/60 dark:bg-pink-800/40 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full">
            {activity.participants} {activity.participants === 1 ? "pessoa" : "pessoas"}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-200/60 dark:bg-pink-800/40 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full">
            {activity.price === 0 ? "Grátis" : "💰 Pago"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoredSection;
