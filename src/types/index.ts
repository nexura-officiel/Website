export interface Project {
    id: string; // UUID from DB
    slug: string;
    name: string;
    description: string;
    longDescription: string;
    image: string;
    images: string[];
    video?: string;
    demoLink?: string;
    githubLink?: string;
    tags: string[];
}

export interface Service {
    id: string; // UUID
    slug: string;
    title: string;
    description: string;
    tags: string[];
    icon_name?: string;
    system_load: number;
    projects?: Project[];
}
