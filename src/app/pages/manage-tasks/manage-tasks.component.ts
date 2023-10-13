import {Component} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from "@angular/forms";
import {TaskService} from "../../service/task.service";
@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag, MatButtonModule,FormsModule,CommonModule],
})

export class ManageTasksComponent {
  task: any = {
    title:'',
    description:'',
    deadline:'',
    status:'',
    assignedUsers: [],
  };
  users: any[] = [];
  statusOptions: { value: string, label: string }[] = [
    { value: 'todo', label: 'To do' },
    { value: 'pending', label: 'Pending' },
    { value: 'done', label: 'Done' }
  ];
  showForm: boolean = false;
  todo: any[] = [];
  pending: any[] = [];
  done: any[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
    this.taskList()
  }
  updateTaskStatus(taskId:number,status: string): void {
    this.taskService.updateTaskStatus(taskId, status).subscribe(
      response => {
        console.log('Task status updated successfully', response);
      },
      error => {
        console.error('Error updating task status', error);
      }
    );

  }


  drop(event: CdkDragDrop<string[]>) {
    const taskId = event.item.data.id;
    const status = event.container.id;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  taskList(){
    this.taskService.getTaskLists().subscribe(
      (taskLists) => {
        this.todo = taskLists.filter((task:any) => task.status === 'todo');
        this.pending = taskLists.filter((task:any) => task.status === 'pending');
        this.done = taskLists.filter((task:any) => task.status === 'done');
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  openDialog(){
    this.showForm = true;

  }
  createTask(): void {
    this.taskService.createTask(this.task).subscribe(
      (newTask) => {
        this.taskList()
        this.showForm = false;
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }

}
