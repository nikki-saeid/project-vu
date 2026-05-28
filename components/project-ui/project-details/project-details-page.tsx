'use client';

import BusinessHeader from '@/components/business-ui/business-header';
import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import StyledIconTitle from '@/components/styled-icon-title';
import H4 from '@/components/typography/H4';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { ProjectWithLatLng } from '@/lib/types/api';
import { Business } from '@/lib/types/db';
import { IconCalendar, IconCurrencyDollarAustralian, IconRulerMeasure } from '@tabler/icons-react';
import { format } from 'date-fns';
import ProjectsMap from '../projects-map';
import ProjectDetailsImages from './project-details-images';
import { getProjectCostLabel } from '@/lib/helpers/other';
import StyledIconTitleSameText from '@/components/styled-icon-title-same-text';

type ProjectDetailsPageProps = {
    project: ProjectWithLatLng;
    business: Business;
};

export default function ProjectDetailsPage({ project, business }: ProjectDetailsPageProps) {
    const { images_urls, title, description, address, made_at, size, cost } = project ?? {
        images_urls: [],
        title: '',
        description: '',
        address: '',
        made_at: undefined,
        size: undefined,
        cost: undefined,
    };

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <BusinessHeader
                url={'/page/' + business.slug}
                name={business.name}
                logo_url={business.logo_url}
                types={business.types}
                description=""
            />
            <DashboardCard title={<H4 className="font-medium tracking-normal text-2xl">{title}</H4>} description={description}>
                {(made_at || size || cost) && (
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-6">
                        {made_at && (
                            <StyledIconTitleSameText
                                StyledIconProps={{ Icon: IconCalendar }}
                                label="Project Created On"
                                title={format(new Date(made_at), DATE_FORMATS.year)}
                            />
                        )}
                        {size && (
                            <StyledIconTitleSameText
                                StyledIconProps={{ Icon: IconRulerMeasure }}
                                label="Project Size"
                                title={size + ' sqm'}
                            />
                        )}
                        {cost && (
                            <StyledIconTitleSameText
                                StyledIconProps={{ Icon: IconCurrencyDollarAustralian }}
                                label="Project Cost"
                                title={getProjectCostLabel(cost)}
                            />
                        )}
                    </div>
                )}
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
