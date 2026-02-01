export interface Service {
    id: string;
    slug: string;
    title: string;
    description: string;
    tags: string[];
    icon_name?: string; // To map to Lucide icons dynamically if needed
    system_load: number;
}
