'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import H4 from '@/components/typography/H4';
import { getProjectById } from '@/lib/api-fetcher/user/server/projects';
import { ProjectWithLatLng } from '@/lib/types/api';
import { useQuery } from '@tanstack/react-query';
import ProjectsMap from '../projects-map';
import ProjectDetailsImages from './project-details-images';
import { Business } from '@/lib/types/db';
import BusinessHeader from '@/components/business-ui/business-header';
import { Card, CardContent } from '@/components/ui/card';
import BusinessContact from '@/components/business-ui/business-contact';
import BusinessTags from '@/components/business-ui/business-tags';
import BusinessSocials from '@/components/business-ui/business-socials';

type ProjectDetailsPageProps = {
    project: ProjectWithLatLng;
    business: Business;
};

export default function ProjectDetailsPage({ project, business }: ProjectDetailsPageProps) {
    const { data } = useQuery({
        queryKey: ['project-details'],
        queryFn: async () => await getProjectById(project.id),
        initialData: project,
    });

    const { images_urls, title, description, address } = data ?? { images_urls: [], title: '', description: '', address: '' };

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <Card>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <BusinessHeader
                            name={business.name}
                            logo_url={business.logo_url}
                            type={business.type}
                            description={business.description}
                        />
                        <BusinessTags project_type_tags={business.project_type_tags} service_type_tags={business.service_type_tags} />
                        <BusinessSocials
                            website_url={business.website_url}
                            facebook_url={business.facebook_url}
                            instagram_url={business.instagram_url}
                            x_url={business.x_url}
                        />
                        <BusinessContact phone={business.phone} email={business.email} />
                    </div>
                </CardContent>
            </Card>

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
                    projects={data ? [data] : []}
                />
            </DashboardCard>
        </div>
    );
}
