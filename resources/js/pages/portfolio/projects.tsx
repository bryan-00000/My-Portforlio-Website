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

            <h1 className="p-page-title">Projects</h1>
            <p className="p-page-sub">A selection of things I&apos;ve built.</p>

            {projects.length === 0 ? (
                <p className="p-desc">Projects coming soon.</p>
            ) : (
                <div className="p-grid-3">
                    {projects.map((project) => (
                        <div key={project.id} className="p-card p-project-card">
                            {project.image_path && (
                                <img
                                    src={storageUrl(project.image_path)}
                                    alt={project.title}
                                    className="-mx-[26px] -mt-[26px] mb-1 aspect-video w-[calc(100%+52px)] rounded-t-[20px] object-cover"
                                />
                            )}
                            <div className="p-card-heading !mb-0">
                                {project.title}
                            </div>
                            <p className="p-desc">{project.summary}</p>
                            <p className="p-long">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {(project.technologies ?? []).map((tech) => (
                                    <span key={tech} className="p-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.project_url && (
                                    <a
                                        href={project.project_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-code-pill"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        Live
                                    </a>
                                )}
                                {project.repo_url && (
                                    <a
                                        href={project.repo_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-code-pill"
                                    >
                                        <Github className="h-3.5 w-3.5" />
                                        Code
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </PublicLayout>
    );
}
