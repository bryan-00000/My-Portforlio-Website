import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { storageUrl } from '@/lib/utils';
import { contact, projects as projectsRoute } from '@/routes';
import { type Profile, type Project, type Skill } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
    profile: Profile;
    featuredProjects: Project[];
    skills: Skill[];
}

export default function Home({ profile, featuredProjects, skills }: HomeProps) {
    return (
        <PublicLayout>
            <Head title="Home" />

            <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
                <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                    {profile.name}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                    {profile.headline}
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href={projectsRoute()}>
                            View my work
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href={contact()}>Get in touch</Link>
                    </Button>
                </div>

                {skills.length > 0 && (
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                        {skills.slice(0, 8).map((skill) => (
                            <Badge key={skill.id} variant="secondary">
                                {skill.name}
                            </Badge>
                        ))}
                    </div>
                )}
            </section>

            {featuredProjects.length > 0 && (
                <section className="border-t bg-muted/30">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <div className="mb-10 flex items-end justify-between">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Featured projects
                            </h2>
                            <Link
                                href={projectsRoute()}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                                View all
                            </Link>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProjects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="overflow-hidden"
                                >
                                    {project.image_path && (
                                        <img
                                            src={storageUrl(project.image_path)}
                                            alt={project.title}
                                            className="aspect-video w-full object-cover"
                                        />
                                    )}
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                        <CardDescription>
                                            {project.summary}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap gap-2">
                                        {(project.technologies ?? []).map(
                                            (tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="outline"
                                                >
                                                    {tech}
                                                </Badge>
                                            ),
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
