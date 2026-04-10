'use client';
import { Icon } from '@tabler/icons-react';

type IconTitleProps = {
    title: string;
    Icon: Icon;
};

export default function IconTitle({ Icon, title }: IconTitleProps) {
    return (
        <div className="flex items-center gap-1 text-xs">
            <div>
                <Icon className="text-secondary w-3.5" />
            </div>
            <div className="text-muted-foreground">{title}</div>
        </div>
    );
}
