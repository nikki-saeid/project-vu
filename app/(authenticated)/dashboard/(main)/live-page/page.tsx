import BusinessProfile from '@/components/business-ui/business-profile';
import ActionMenu from './_components/action-menu';
import LiveButton from './_components/live-button';

export default function LivePage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-2">
                <LiveButton />
                <ActionMenu />
            </div>
            <div className="border p-4 rounded-lg md:p-6">
                <BusinessProfile />
            </div>
        </div>
    );
}
