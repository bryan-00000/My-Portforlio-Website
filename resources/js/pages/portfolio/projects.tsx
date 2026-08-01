import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { storageUrl } from '@/lib/utils';
import { type Project } from '@/types';
import { Head } from '@inertiajs/react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <PublicLayout>
            <Head title="Projects" />

            <section className="mx-auto max-w-5xl px-6 py-20">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="mt-2 text-muted-foreground">
                    A selection of things I&apos;ve built.
                </p>

                {projects.length === 0 ? (
                    <p className="mt-12 text-muted-foreground">
                        Projects coming soon.
                    </p>
                ) : (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden">
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
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
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
                                    </div>
                                </CardContent>
                                {(project.project_url || project.repo_url) && (
                                    <CardFooter className="gap-2">
                                        {project.project_url && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                            >
                                                <a
                                                    href={project.project_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                    Live
                                                </a>
                                            </Button>
                                        )}
                                        {project.repo_url && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                            >
                                                <a
                                                    href={project.repo_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <Github className="h-4 w-4" />
                                                    Code
                                                </a>
                                            </Button>
                                        )}
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
