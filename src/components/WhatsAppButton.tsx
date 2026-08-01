import { Icon } from "./icons";
import { SITE } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 sm:bottom-6"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  );
}
