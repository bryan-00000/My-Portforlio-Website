import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import projects from '@/routes/admin/projects';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ProjectForm from './project-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Projects', href: projects.index().url },
    { title: 'New', href: projects.create().url },
];

export default function CreateProject() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New project" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title="New project"
                    description="Add a project to showcase on your portfolio."
                />
                <ProjectForm
                    action={projects.store().url}
                    method="post"
                    submitLabel="Create project"
                />
            </div>
        </AppLayout>
    );
}
