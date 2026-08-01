import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import messages from '@/routes/admin/messages';
import profile from '@/routes/admin/profile';
import projects from '@/routes/admin/projects';
import services from '@/routes/admin/services';
import skills from '@/routes/admin/skills';
import { type BreadcrumbItem, type ContactMessage } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Briefcase, Mail, Sparkles, UserRound } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

interface DashboardProps {
    stats: {
        projects: number;
        skills: number;
        services: number;
        unreadMessages: number;
    };
    recentMessages: ContactMessage[];
}

export default function Dashboard({ stats, recentMessages }: DashboardProps) {
    const cards = [
        {
            title: 'Projects',
            value: stats.projects,
            icon: Briefcase,
            href: projects.index(),
        },
        {
            title: 'Skills',
            value: stats.skills,
            icon: Sparkles,
            href: skills.index(),
        },
        {
            title: 'Services',
            value: stats.services,
            icon: BookOpen,
            href: services.index(),
        },
        {
            title: 'Unread messages',
            value: stats.unreadMessages,
            icon: Mail,
            href: messages.index(),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Dashboard"
                    description="An overview of your portfolio content."
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <Link key={card.title} href={card.href}>
                            <Card className="transition-colors hover:bg-muted/50">
                                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </CardTitle>
                                    <card.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {card.value}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent messages</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            {recentMessages.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No messages yet.
                                </p>
                            ) : (
                                recentMessages.map((message) => (
                                    <Link
                                        key={message.id}
                                        href={messages.show(message.id)}
                                        className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                                    >
                                        <span className="flex items-center gap-2">
                                            {!message.read_at && (
                                                <span className="h-2 w-2 rounded-full bg-primary" />
                                            )}
                                            <span className="font-medium">
                                                {message.name}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {message.subject}
                                            </span>
                                        </span>
                                        {!message.read_at && (
                                            <Badge variant="secondary">
                                                New
                                            </Badge>
                                        )}
                                    </Link>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick links</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Button variant="outline" asChild>
                                <Link href={projects.create()}>
                                    <Briefcase className="h-4 w-4" />
                                    Add a project
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={profile.edit()}>
                                    <UserRound className="h-4 w-4" />
                                    Edit profile
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
