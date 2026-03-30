import { Business } from '@/lib/types/db';
import { Badge } from '../ui/badge';

type BusinessTagsProps = Pick<Business, 'project_type_tags' | 'service_type_tags'>;

export default function BusinessTags({ project_type_tags, service_type_tags }: BusinessTagsProps) {
    const tags = (Boolean(project_type_tags) && project_type_tags?.length) || (Boolean(service_type_tags) && service_type_tags?.length);

    if (!tags) return null;
    return (
        <section className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1 items-center">
                <span className="text-muted-foreground text-xs">Project Types :</span>
                {project_type_tags &&
                    project_type_tags.map((tag) => (
                        <Badge className="text-xs font-normal text-foreground bg-muted" key={tag}>
                            {tag}
                        </Badge>
                    ))}
            </div>
            <div className="flex flex-wrap gap-1 items-center">
                <span className="text-muted-foreground text-xs">Service Types :</span>
                {service_type_tags &&
                    service_type_tags.map((tag) => (
                        <Badge className="text-xs font-normal text-foreground bg-muted" key={tag}>
                            {tag}
                        </Badge>
                    ))}
            </div>
        </section>
    );
}
