import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = {
  title: "Painel — Rádio Cultura FM 104.7",
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-light-bg">
      <header className="bg-dark-bg text-white">
        <div className="container flex items-center justify-between py-3">
          <Link href="/admin" className="font-montserrat font-bold tracking-wide">
            Painel Rádio Cultura
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-300">
              {profile?.full_name ?? user.email}
              {profile?.role && (
                <span className="ml-2 uppercase text-[11px] bg-primary px-2 py-0.5 rounded">
                  {profile.role}
                </span>
              )}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container py-8">{children}</main>
    </div>
  );
}
