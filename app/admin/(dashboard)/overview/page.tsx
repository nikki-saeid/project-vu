import DataCard from '@/components/data-ui/data-card';

export default async function Overview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            <DataCard />
            <DataCard />
            <DataCard />
        </div>
    );
}
