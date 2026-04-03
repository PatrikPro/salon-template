import type { ServicesData } from "./types";
import servicesJson from "@/content/services.json";

export interface ServicesProvider {
  getServices(): Promise<ServicesData>;
}

class JsonServicesProvider implements ServicesProvider {
  async getServices(): Promise<ServicesData> {
    const raw = servicesJson as ServicesData;
    return {
      categories: Array.isArray(raw.categories) ? raw.categories : [],
      items: Array.isArray(raw.items) ? raw.items : [],
    };
  }
}

const provider: ServicesProvider = new JsonServicesProvider();

export async function loadServices(): Promise<ServicesData> {
  return provider.getServices();
}
