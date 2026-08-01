import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import messages from '@/routes/admin/messages';
import profile from '@/routes/admin/profile';
import projects from '@/routes/admin/projects';
import services from '@/routes/admin/services';
import skills from '@/routes/admin/skills';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    Folder,
    Globe,
    LayoutGrid,
    Mail,
    Sparkles,
    UserRound,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Projects',
        href: projects.index(),
        icon: Briefcase,
    },
    {
        title: 'Skills',
        href: skills.index(),
        icon: Sparkles,
    },
    {
        title: 'Services',
        href: services.index(),
        icon: BookOpen,
    },
    {
        title: 'Messages',
        href: messages.index(),
        icon: Mail,
    },
    {
        title: 'Profile',
        href: profile.edit(),
        icon: UserRound,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'View site',
        href: home(),
        icon: Globe,
    },
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {auth.user.is_admin && (
                    <NavMain items={adminNavItems} label="Manage portfolio" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
