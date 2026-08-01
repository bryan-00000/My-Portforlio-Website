import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import projects from '@/routes/admin/projects';
import { type BreadcrumbItem, type Project } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Projects', href: projects.index().url },
];

export default function ProjectsIndex({
    projects: projectList,
}: {
    projects: Project[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Projects"
                        description="Manage the projects shown on your public portfolio."
                    />
                    <Button asChild>
                        <Link href={projects.create()}>
                            <Plus className="h-4 w-4" />
                            New project
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projectList.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        No projects yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {projectList.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        {project.image_path ? (
                                            <img
                                                src={storageUrl(
                                                    project.image_path,
                                                )}
                                                alt={project.title}
                                                className="h-10 w-16 rounded object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-16 rounded bg-muted" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {project.title}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {project.summary}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {project.featured && (
                                            <Badge>Featured</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={projects.edit(project.id)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Link>
                                        </Button>
                                        <DeleteConfirmDialog
                                            title="Delete project"
                                            description={`This will permanently delete "${project.title}". This action cannot be undone.`}
                                            action={projects.destroy.form(
                                                project.id,
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
