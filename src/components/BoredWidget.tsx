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

const BoredWidget = async () => {
  const activity = await getRandomActivity();

  if (!activity) return null;

  return (
    <div className="flex flex-col">
      <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-text mb-3 border-b-2 border-pink-500 pb-1 inline-block w-fit">
        Ideia do Dia 💡
      </h3>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border border-pink-200 dark:border-pink-800/30 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <p className="text-[13px] font-medium text-pink-900 dark:text-pink-100 leading-relaxed">
          {activity.activity}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-pink-200/60 dark:bg-pink-800/40 text-pink-800 dark:text-pink-200 px-2 py-0.5 rounded-full">
            {typeLabels[activity.type] || activity.type}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-pink-200/60 dark:bg-pink-800/40 text-pink-800 dark:text-pink-200 px-2 py-0.5 rounded-full">
            {activity.participants}{" "}
            {activity.participants === 1 ? "pessoa" : "pessoas"}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-pink-200/60 dark:bg-pink-800/40 text-pink-800 dark:text-pink-200 px-2 py-0.5 rounded-full">
            {activity.price === 0 ? "Grátis" : "💰 Pago"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoredWidget;
