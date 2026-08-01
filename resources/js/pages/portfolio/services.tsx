import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { serviceIcon } from '@/lib/service-icons';
import { contact } from '@/routes';
import { type Service } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface ServicesProps {
    services: Service[];
}

export default function Services({ services }: ServicesProps) {
    return (
        <PublicLayout>
            <Head title="Services" />

            <section className="mx-auto max-w-5xl px-6 py-20">
                <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                <p className="mt-2 text-muted-foreground">
                    Ways I can help bring your project to life.
                </p>

                {services.length === 0 ? (
                    <p className="mt-12 text-muted-foreground">
                        Services coming soon.
                    </p>
                ) : (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {services.map((service) => {
                            const Icon = serviceIcon(service.icon);

                            return (
                                <Card key={service.id}>
                                    <CardHeader>
                                        <Icon className="h-6 w-6 text-primary" />
                                        <CardTitle className="mt-2">
                                            {service.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Button size="lg" asChild>
                        <Link href={contact()}>Get started</Link>
                    </Button>
                </div>
            </section>
        </PublicLayout>
    );
}
