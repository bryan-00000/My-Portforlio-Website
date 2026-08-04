import PublicLayout from '@/layouts/public-layout';
import { serviceIcon } from '@/lib/service-icons';
import { type Service } from '@/types';
import { Head } from '@inertiajs/react';

interface ServicesProps {
    services: Service[];
}

export default function Services({ services }: ServicesProps) {
    return (
        <PublicLayout>
            <Head title="Services" />

            <h1 className="p-page-title">Services</h1>
            <p className="p-page-sub">
                Ways I can help bring your project to life.
            </p>

            {services.length === 0 ? (
                <p className="p-desc">Services coming soon.</p>
            ) : (
                <div className="p-grid-2">
                    {services.map((service) => {
                        const Icon = serviceIcon(service.icon);

                        return (
                            <div key={service.id} className="p-card">
                                <div className="p-icon-box">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="p-card-heading">
                                    {service.title}
                                </div>
                                <p className="p-desc">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </PublicLayout>
    );
}
