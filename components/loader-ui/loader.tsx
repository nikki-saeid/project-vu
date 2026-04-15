import { IconCircleFilled } from '@tabler/icons-react';

export default function Loader() {
    return (
        <div className="flex items-center justify-center gap-0.5 h-full">
            <IconCircleFilled className="size-5 animate-[bounce_0.7s_infinite_0ms]" />
            <IconCircleFilled className="size-5 animate-[bounce_0.7s_infinite_100ms]" />
            <IconCircleFilled className="size-5 animate-[bounce_0.7s_infinite_200ms]" />
        </div>
    );
}
