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

export default function Home({
    profile,
    featuredProjects,
    skills,
}: HomeProps) {
    return (
        <PublicLayout>
            <Head title="Home" />

            <section className="p-hero">
                <h1 className="p-hero-title">{profile.name}</h1>
                <p className="p-hero-sub">{profile.headline}</p>
                <div className="p-hero-actions">
                    <Link href={projectsRoute()} className="p-btn-primary">
                        View my work <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href={contact()} className="p-btn-ghost">
                        Get in touch
                    </Link>
                </div>

                {skills.length > 0 && (
                    <div className="p-chip-row">
                        {skills.slice(0, 8).map((skill) => (
                            <span key={skill.id} className="p-chip">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                )}
            </section>

            {featuredProjects.length > 0 && (
                <section>
                    <div className="mb-6 flex items-end justify-between">
                        <h2 className="p-section-title !mt-0">
                            Featured projects
                        </h2>
                        <Link
                            href={projectsRoute()}
                            className="text-sm font-medium text-[#8ea3c4] hover:text-[#7dd3fc]"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="p-grid-3">
                        {featuredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="p-card p-project-card"
                            >
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
                                <div className="flex flex-wrap gap-2">
                                    {(project.technologies ?? []).map(
                                        (tech) => (
                                            <span
                                                key={tech}
                                                className="p-tag"
                                            >
                                                {tech}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
