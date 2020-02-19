import { UserStory } from './user-story';

export class Sprint {
    id: number;
    start: Date;
    length: number;
    userStories: UserStory[];
}