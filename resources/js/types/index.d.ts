import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Profile {
    id: number;
    name: string;
    headline: string;
    bio: string;
    email: string;
    phone: string | null;
    location: string | null;
    avatar_path: string | null;
    resume_path: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    x_url: string | null;
    website_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    level: number;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    image_path: string | null;
    technologies: string[] | null;
    project_url: string | null;
    repo_url: string | null;
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    body: string;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    flash: { success?: string | null; error?: string | null };
    profile: Profile;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
