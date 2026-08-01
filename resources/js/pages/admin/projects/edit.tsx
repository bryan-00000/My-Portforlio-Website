import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import projects from '@/routes/admin/projects';
import { type BreadcrumbItem, type Project } from '@/types';
import { Head } from '@inertiajs/react';
import ProjectForm from './project-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Projects', href: projects.index().url },
    { title: 'Edit', href: '#' },
];

export default function EditProject({ project }: { project: Project }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${project.title}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Edit project"
                    description="Update this project's details."
                />
                <ProjectForm
                    project={project}
                    action={projects.update(project.id).url}
                    method="put"
                    submitLabel="Save changes"
                />
            </div>
        </AppLayout>
    );
}
