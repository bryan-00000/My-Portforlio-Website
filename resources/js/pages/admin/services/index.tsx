import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { serviceIcon, serviceIcons } from '@/lib/service-icons';
import { dashboard } from '@/routes';
import services from '@/routes/admin/services';
import { type BreadcrumbItem, type Service } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { type FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Services', href: services.index().url },
];

function ServiceFormDialog({
    service,
    open,
    onOpenChange,
}: {
    service?: Service;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: service?.title ?? '',
        description: service?.description ?? '',
        icon: service?.icon ?? '',
        sort_order: service?.sort_order ?? 0,
        _method: service ? 'put' : 'post',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = service
            ? services.update(service.id).url
            : services.store().url;

        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {service ? 'Edit service' : 'New service'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={3}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.description} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="icon">Icon</Label>
                            <Select
                                value={data.icon}
                                onValueChange={(value) =>
                                    setData('icon', value)
                                }
                            >
                                <SelectTrigger id="icon">
                                    <SelectValue placeholder="Choose an icon" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(serviceIcons).map((name) => (
                                        <SelectItem key={name} value={name}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.icon} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sort_order">Sort order</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                min={0}
                                value={data.sort_order}
                                onChange={(e) =>
                                    setData(
                                        'sort_order',
                                        Number(e.target.value),
                                    )
                                }
                            />
                            <InputError message={errors.sort_order} />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}
                            {service ? 'Save changes' : 'Add service'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function ServicesIndex({
    services: serviceList,
}: {
    services: Service[];
}) {
    const [editingService, setEditingService] = useState<Service | undefined>();
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Services"
                        description="Services listed on your Services page."
                    />
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="h-4 w-4" />
                        New service
                    </Button>
                </div>

                <ServiceFormDialog
                    open={createOpen}
                    onOpenChange={setCreateOpen}
                />
                {editingService && (
                    <ServiceFormDialog
                        service={editingService}
                        open={!!editingService}
                        onOpenChange={(open) =>
                            !open && setEditingService(undefined)
                        }
                    />
                )}

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceList.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-center text-muted-foreground"
                                    >
                                        No services yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {serviceList.map((service) => {
                                const Icon = serviceIcon(service.icon);

                                return (
                                    <TableRow key={service.id}>
                                        <TableCell className="font-medium">
                                            <span className="flex items-center gap-2">
                                                <Icon className="h-4 w-4 text-muted-foreground" />
                                                {service.title}
                                            </span>
                                        </TableCell>
                                        <TableCell className="max-w-md truncate text-muted-foreground">
                                            {service.description}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setEditingService(service)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Button>
                                            <DeleteConfirmDialog
                                                title="Delete service"
                                                description={`This will permanently delete "${service.title}".`}
                                                action={services.destroy.form(
                                                    service.id,
                                                )}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
