import Loader from '@/components/loader-ui/loader';

export default function AbsoluteLoader() {
    return (
        <div className="absolute inset-0 z-1000 bg-background">
            <Loader />
        </div>
    );
}
