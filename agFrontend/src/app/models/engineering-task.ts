import { Status } from './status';

export class EngineeringTask {
    id: number;
    name: string;
    userStoryId: number;
    status: Status;
    estimatedHours: number;
    priority: number;  
    userId: number;
    doneHours: number;
}