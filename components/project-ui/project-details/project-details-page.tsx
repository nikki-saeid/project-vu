'use client';

import BusinessIdentity from '@/components/business-ui/business-identity';
import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import H4 from '@/components/typography/H4';
import { Separator } from '@/components/ui/separator';
import { ProjectWithLatLng } from '@/lib/types/api';
import { Business } from '@/lib/types/db';
import ProjectsMap from '../projects-map';
import ProjectDetailsImages from './project-details-images';

type ProjectDetailsPageProps = {
    project: ProjectWithLatLng;
    business: Business;
};

export default function ProjectDetailsPage({ project, business }: ProjectDetailsPageProps) {
    const { images_urls, title, description, address } = project ?? { images_urls: [], title: '', description: '', address: '' };

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <BusinessIdentity business={business} />

            <Separator />

            <DashboardCard title={<H4 className="font-medium tracking-normal text-2xl">{title}</H4>} description={description}>
                <ProjectDetailsImages images_urls={images_urls} title={title} />
            </DashboardCard>
            <DashboardCard title="Location" description={address}>
                <ProjectsMap
                    slug={business?.slug ?? ''}
                    disablePopup
                    className="h-100"
                    isPublic={false}
                    embed={false}
                    projects={[project]}
                />
            </DashboardCard>
        </div>
    );
}
