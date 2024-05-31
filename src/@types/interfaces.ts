export interface Activity {
    id: number;
    profile: number;
    name: string;
    activity_group: number;
    recurrence: string;
    until: string;
    created_at: string;
    updated_at: string;
}

export interface ActivityGroup {
    id: number;
    name: string;
    profile: string;
    description: string;
}