import InputError from '@/components/input-error';
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

            <h1 className="p-page-title">Get in touch</h1>
            <p className="p-page-sub">
                Have a project in mind? I&apos;d love to hear about it.
            </p>

            <div className="p-contact-grid">
                <div className="p-contact-info">
                    <a
                        href={`mailto:${profile.email}`}
                        className="p-contact-row !text-[#cfe0f6] hover:!text-[#7dd3fc]"
                    >
                        <Mail className="h-4 w-4 shrink-0" />
                        {profile.email}
                    </a>
                    {profile.phone && (
                        <a
                            href={`tel:${profile.phone}`}
                            className="p-contact-row !text-[#cfe0f6] hover:!text-[#7dd3fc]"
                        >
                            <Phone className="h-4 w-4 shrink-0" />
                            {profile.phone}
                        </a>
                    )}
                    {profile.location && (
                        <div className="p-contact-row">
                            <MapPin className="h-4 w-4 shrink-0" />
                            {profile.location}
                        </div>
                    )}
                </div>

                <div className="p-card">
                    <div className="p-card-heading mb-5">
                        Send a message
                    </div>
                    <Form
                        {...submit.form()}
                        resetOnSuccess
                        className="p-contact-form"
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

                                <label>
                                    Name
                                    <input name="name" required />
                                    <InputError message={errors.name} />
                                </label>

                                <label>
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </label>

                                <label>
                                    Subject
                                    <input name="subject" required />
                                    <InputError message={errors.subject} />
                                </label>

                                <label>
                                    Message
                                    <textarea
                                        rows={4}
                                        name="body"
                                        required
                                    />
                                    <InputError message={errors.body} />
                                </label>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="p-btn-primary justify-center"
                                >
                                    {processing
                                        ? 'Sending…'
                                        : 'Send message'}
                                </button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </PublicLayout>
    );
}
