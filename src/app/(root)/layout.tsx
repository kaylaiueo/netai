import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LeftSideBar from "@/components/layouts/LeftSideBar";
import RightSideBar from "@/components/layouts/RightSideBar";
import useCookies from "@/hooks/useCookies";
import GlobalContextProvider from "@/context";
import { getCurrentUser } from "@/utils/getData";
import BottomBar from "@/components/layouts/BottomBar";
import { Toaster } from "react-hot-toast";
import Provider from "@/utils/Provider";
import "linkify-plugin-mention";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Netai",
  description:
    "Netai is a social media platform for sharing photos, your feelings, connecting with friends, and discovering new content.",
  colorScheme: "dark light",
  openGraph: {
    images: {
      url: "/logo.png",
    },
    url: "https://netai.vercel.app",
    type: "website",
    title: "Netai",
    description:
      "Netai is a social media platform for sharing photos, your feelings, connecting with friends, and discovering new content.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useCookies();
  const { currentUser } = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${poppins.className} md:flex justify-center`}>
        {userId && <LeftSideBar user={currentUser} />}
        <main className="space-y-3 relative w-full md:max-w-xl px-3 md:px-4">
          <Provider>
            <GlobalContextProvider>
              {children}
              {userId && <BottomBar user={currentUser} />}
            </GlobalContextProvider>
          </Provider>
          <Toaster position="bottom-center" />
        </main>
        {userId && <RightSideBar />}
      </body>
    </html>
  );
}
