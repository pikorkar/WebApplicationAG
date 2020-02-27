import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models/project';
import { UserStory } from 'src/app/user-story/model/user-story';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoryService } from 'src/app/user-story/service/user-story.service';
import { ProjectService } from '../service/project.service';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss']
})
export class ProjectBacklogComponent implements OnInit, OnDestroy {
  // Loading
  loading: boolean = false;

  // Project
  private routeSub: Subscription;
  projectId: number;
  project: Project;

  // User Stories
  userStories: UserStory[];

  constructor(private route: ActivatedRoute,
    private userStoryService: UserStoryService,
    private projectService: ProjectService, 
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    // start loading
    this.loading = true;

    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    // Get Project - by ID from route
    this.projectService.getById(this.projectId).pipe(first()).subscribe(project => {
      this.project = project;


      // Get all User Stories by Project
      this.userStoryService.getAllByProject(this.projectId).pipe(first()).subscribe(userStories => {
        this.userStories = userStories;
        this.loading = false;
      }, error => {
        alert(error.message);
      })

    }, error => {
      alert(error.message);
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
