import { EngineeringTask } from './engineering-task';

export class UserStory {
    id: number;
    name: string;
    engineeringTasks: EngineeringTask[];
}