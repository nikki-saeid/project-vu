'use client';

import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';
import AddProjectDialog from '@/components/project-ui/add-project-dialog';
import MaxProjectsDialogRedirect from '@/components/project-ui/max-projects-dialog-redirect';
import NoProjectsUi from '@/components/project-ui/no-projects-ui';
import ProjectsList from '@/components/project-ui/projects-list';
import P from '@/components/typography/P';
import { MAX_PROJECTS_FREE_PLAN } from '@/lib/constants/pricing-plans';
import { useDashboard } from '@/lib/contexts/dashboard-context';

export default function Projects() {
    const { projects, business, subscription } = useDashboard();

    return (
        <div>
            <DashboardSubNavbar>
                {!subscription && projects.length >= MAX_PROJECTS_FREE_PLAN ? <MaxProjectsDialogRedirect /> : <AddProjectDialog />}
            </DashboardSubNavbar>

            <div className="flex flex-col md:gap-6 gap-4 p-4 md:p-6">
                {projects.length > 0 ? (
                    <>
                        <P className="text-muted-foreground">Manage your projects details and settings.</P>
                        <ProjectsList projects={projects} isPublic={false} slug={business?.slug ?? ''} />
                    </>
                ) : (
                    <NoProjectsUi isAction={false} />
                )}
            </div>
        </div>
    );
}
