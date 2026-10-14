import { toast } from "sonner";

export function notifyComingSoon(feature: string) {
  toast.info(`${feature} will be available once the API is connected.`);
}
