import { EngineeringTask } from '../../engineering-task/model/engineering-task';

export class UserStory {
    id: number;
    name: string;
    sprintId: number;
    engineeringTasks: EngineeringTask[];
    donePercent: number;
    hoursRemaining: number;
}