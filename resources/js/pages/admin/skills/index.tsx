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
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import skills from '@/routes/admin/skills';
import { type BreadcrumbItem, type Skill } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { type FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Skills', href: skills.index().url },
];

function SkillFormDialog({
    skill,
    open,
    onOpenChange,
}: {
    skill?: Skill;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: skill?.name ?? '',
        category: skill?.category ?? '',
        level: skill?.level ?? 50,
        sort_order: skill?.sort_order ?? 0,
        _method: skill ? 'put' : 'post',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = skill ? skills.update(skill.id).url : skills.store().url;

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
                        {skill ? 'Edit skill' : 'New skill'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={data.category}
                            onChange={(e) =>
                                setData('category', e.target.value)
                            }
                            placeholder="Backend, Frontend, Tools…"
                            required
                        />
                        <InputError message={errors.category} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="level">Level (0-100)</Label>
                            <Input
                                id="level"
                                type="number"
                                min={0}
                                max={100}
                                value={data.level}
                                onChange={(e) =>
                                    setData('level', Number(e.target.value))
                                }
                            />
                            <InputError message={errors.level} />
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
                            {skill ? 'Save changes' : 'Add skill'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function SkillsIndex({
    skills: skillList,
}: {
    skills: Skill[];
}) {
    const [editingSkill, setEditingSkill] = useState<Skill | undefined>();
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skills" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Skills"
                        description="Skills shown on your About page."
                    />
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="h-4 w-4" />
                        New skill
                    </Button>
                </div>

                <SkillFormDialog
                    open={createOpen}
                    onOpenChange={setCreateOpen}
                />
                {editingSkill && (
                    <SkillFormDialog
                        skill={editingSkill}
                        open={!!editingSkill}
                        onOpenChange={(open) =>
                            !open && setEditingSkill(undefined)
                        }
                    />
                )}

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {skillList.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        No skills yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {skillList.map((skill) => (
                                <TableRow key={skill.id}>
                                    <TableCell className="font-medium">
                                        {skill.name}
                                    </TableCell>
                                    <TableCell>{skill.category}</TableCell>
                                    <TableCell>{skill.level}%</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setEditingSkill(skill)
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </Button>
                                        <DeleteConfirmDialog
                                            title="Delete skill"
                                            description={`This will permanently delete "${skill.name}".`}
                                            action={skills.destroy.form(
                                                skill.id,
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
