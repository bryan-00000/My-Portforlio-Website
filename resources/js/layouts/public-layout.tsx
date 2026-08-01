import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import FlashMessage from '@/components/flash-message';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { about, contact, dashboard, home, projects, services } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Github, Globe, Linkedin, Menu, Twitter } from 'lucide-react';
import { type PropsWithChildren, useState } from 'react';

const navItems = [
    { title: 'Home', href: home() },
    { title: 'About', href: about() },
    { title: 'Projects', href: projects() },
    { title: 'Services', href: services() },
    { title: 'Contact', href: contact() },
];

export default function PublicLayout({ children }: PropsWithChildren) {
    const { url, props } = usePage<SharedData>();
    const { auth, profile } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: { url: string }) =>
        href.url === '/' ? url === '/' : url.startsWith(href.url);

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <Link
                        href={home()}
                        className="text-lg font-semibold tracking-tight"
                    >
                        {profile?.name || 'Portfolio'}
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-foreground ${
                                    isActive(item.href)
                                        ? 'text-foreground'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        {auth.user && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={dashboard()}>Dashboard</Link>
                            </Button>
                        )}
                        <AppearanceToggleDropdown />

                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-1 px-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                isActive(item.href)
                                                    ? 'bg-accent text-foreground'
                                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <FlashMessage className="mx-auto max-w-5xl px-6 pt-6" />
                {children}
            </main>

            <footer className="border-t">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
                    <p>
                        &copy; {new Date().getFullYear()}{' '}
                        {profile?.name || 'Portfolio'}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {profile?.github_url && (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        )}
                        {profile?.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        )}
                        {profile?.x_url && (
                            <a
                                href={profile.x_url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">X</span>
                            </a>
                        )}
                        {profile?.website_url && (
                            <a
                                href={profile.website_url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground"
                            >
                                <Globe className="h-5 w-5" />
                                <span className="sr-only">Website</span>
                            </a>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
}
