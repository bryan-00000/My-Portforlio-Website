import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/public-layout';
import { submit } from '@/routes/contact';
import { type Profile } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

interface ContactProps {
    profile: Profile;
}

export default function Contact({ profile }: ContactProps) {
    return (
        <PublicLayout>
            <Head title="Contact" />

            <section className="mx-auto max-w-5xl px-6 py-20">
                <h1 className="text-3xl font-bold tracking-tight">
                    Get in touch
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Have a project in mind? I&apos;d love to hear about it.
                </p>

                <div className="mt-10 grid gap-10 lg:grid-cols-5">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <a
                                href={`mailto:${profile.email}`}
                                className="text-sm hover:underline"
                            >
                                {profile.email}
                            </a>
                        </div>
                        {profile.phone && (
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <a
                                    href={`tel:${profile.phone}`}
                                    className="text-sm hover:underline"
                                >
                                    {profile.phone}
                                </a>
                            </div>
                        )}
                        {profile.location && (
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">
                                    {profile.location}
                                </span>
                            </div>
                        )}
                    </div>

                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Send a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                {...submit.form()}
                                resetOnSuccess
                                className="space-y-4"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <input
                                            type="text"
                                            name="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            className="absolute left-[-9999px]"
                                            aria-hidden
                                        />

                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="subject">
                                                Subject
                                            </Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                required
                                            />
                                            <InputError
                                                message={errors.subject}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="body">
                                                Message
                                            </Label>
                                            <Textarea
                                                id="body"
                                                name="body"
                                                rows={5}
                                                required
                                            />
                                            <InputError message={errors.body} />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            {processing && <Spinner />}
                                            Send message
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </PublicLayout>
    );
}
