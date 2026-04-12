'use client';

import BusinessHeader from '@/components/business-ui/business-header';
import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import H4 from '@/components/typography/H4';
import { ProjectWithLatLng } from '@/lib/types/api';
import { Business } from '@/lib/types/db';
import ProjectsMap from '../projects-map';
import ProjectDetailsImages from './project-details-images';
import IconTitle from '@/components/icon-title';
import { format } from 'date-fns';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { IconCalendar, IconMapPin, IconRulerMeasure } from '@tabler/icons-react';
import IconCard from '@/components/dashboard-ui/icon-card';
import StyledIconTitle from '@/components/styled-icon-title';

type ProjectDetailsPageProps = {
    project: ProjectWithLatLng;
    business: Business;
};

export default function ProjectDetailsPage({ project, business }: ProjectDetailsPageProps) {
    const { images_urls, title, description, address, made_at, size } = project ?? {
        images_urls: [],
        title: '',
        description: '',
        address: '',
    };

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <BusinessHeader name={business.name} logo_url={business.logo_url} type={business.type} description="" />
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
            {(made_at || size) && (
                <DashboardCard title="Details" description="More details about this project">
                    <div className="flex flex-col gap-4">
                        {made_at && (
                            <StyledIconTitle
                                StyledIconProps={{ Icon: IconCalendar }}
                                label="Project Created On"
                                title={format(new Date(made_at), DATE_FORMATS.year)}
                            />
                        )}
                        {size && (
                            <StyledIconTitle StyledIconProps={{ Icon: IconRulerMeasure }} label="Project Size" title={size + ' sqm'} />
                        )}
                    </div>
                </DashboardCard>
            )}
        </div>
    );
}
