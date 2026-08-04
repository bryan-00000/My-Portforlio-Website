import PublicLayout from '@/layouts/public-layout';
import { type Profile, type Skill } from '@/types';
import { Head } from '@inertiajs/react';

interface AboutProps {
    profile: Profile;
    skills: Record<string, Skill[]>;
}

export default function About({ profile, skills }: AboutProps) {
    return (
        <PublicLayout>
            <Head title="About" />

            <h1 className="p-page-title">About me</h1>
            <p className="p-page-sub">{profile.headline}</p>

            <div className="p-about-copy">
                {profile.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {Object.keys(skills).length > 0 && (
                <>
                    <h2 className="p-section-title">Skills</h2>
                    <div className="p-grid-2">
                        {Object.entries(skills).map(
                            ([category, categorySkills]) => (
                                <div key={category} className="p-card">
                                    <div className="p-card-heading">
                                        {category}
                                    </div>
                                    <div className="p-skills-list">
                                        {categorySkills.map((skill) => (
                                            <div
                                                key={skill.id}
                                                className="p-skill-row"
                                            >
                                                <div className="p-skill-row-top">
                                                    <span className="p-skill-name">
                                                        {skill.name}
                                                    </span>
                                                    <span className="p-skill-level">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="p-skill-track">
                                                    <div
                                                        className="p-skill-fill"
                                                        style={{
                                                            width: `${skill.level}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </>
            )}
        </PublicLayout>
    );
}
