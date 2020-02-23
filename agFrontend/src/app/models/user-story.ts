import { EngineeringTask } from './engineering-task';

export class UserStory {
    id: number;
    name: string;
    sprintId: number;
    expanded: boolean = false;
    engineeringTasks: EngineeringTask[];
}