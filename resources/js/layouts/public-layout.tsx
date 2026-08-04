import FlashMessage from '@/components/flash-message';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { about, contact, dashboard, home, projects, services } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
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
        <div className="portfolio-page">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=space-grotesk:500,600,700|inter:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="p-bubble p-b1" />
            <div className="p-bubble p-b2" />
            <div className="p-bubble p-b3" />
            <div className="p-bubble p-b4" />
            <div className="p-bubble p-b5" />
            <div className="p-bubble p-b6" />

            <nav className="p-navbar">
                <Link
                    href={home()}
                    className="flex items-center gap-2.5 !text-[#e8eefb]"
                >
                    <span className="p-dot" />
                    <span className="p-brand-name">
                        {profile?.name || 'Portfolio'}
                    </span>
                </Link>

                <div className="hidden items-center gap-9 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`p-nav-link ${isActive(item.href) ? 'active' : ''}`}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {auth.user && (
                        <Link
                            href={dashboard()}
                            className="p-dashboard-btn hidden sm:inline-flex"
                        >
                            Dashboard
                        </Link>
                    )}

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="p-dashboard-btn inline-flex h-10 w-10 items-center justify-center p-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="border-[rgba(125,211,252,0.14)] bg-[#060a14] text-[#e8eefb]"
                        >
                            <SheetHeader>
                                <SheetTitle className="text-[#e8eefb]">
                                    Menu
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 px-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            isActive(item.href)
                                                ? 'bg-[rgba(125,211,252,0.1)] text-[#e8eefb]'
                                                : 'text-[#8ea3c4] hover:text-[#e8eefb]'
                                        }`}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                                {auth.user && (
                                    <Link
                                        href={dashboard()}
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-md px-3 py-2 text-sm font-medium text-[#8ea3c4] hover:text-[#e8eefb]"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            <main className="p-main">
                <FlashMessage className="mb-10" />
                {children}
            </main>

            <footer className="p-footer">
                <span>
                    &copy; {new Date().getFullYear()}{' '}
                    {profile?.name || 'Portfolio'}. All rights reserved.
                </span>
                <div className="flex items-center gap-4">
                    {profile?.github_url && (
                        <a
                            href={profile.github_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    )}
                    {profile?.linkedin_url && (
                        <a
                            href={profile.linkedin_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    )}
                    {profile?.x_url && (
                        <a
                            href={profile.x_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">X</span>
                        </a>
                    )}
                    {profile?.website_url && (
                        <a
                            href={profile.website_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Globe className="h-4 w-4" />
                            <span className="sr-only">Website</span>
                        </a>
                    )}
                </div>
            </footer>
        </div>
    );
}
