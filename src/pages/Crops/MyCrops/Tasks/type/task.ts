export interface Task {
    id: number;
    title: string;
    description: string;
    associatedTo: string;
    dueDate: string;
    priority: string;
    status: string;
    assignee: string;
    avatar: string;
}

export interface NewTask {
    title: string;
    description: string;
    status: string;
    assignedTo: string;
    additionalCollaborators: string[];
    priority: string;
    dueDate: string;
    repeats: string;
    hoursSpent: string;
    associatedTo: string;
    taskColor: string;
}

export interface GroupedTasks {
    'To Do': Task[];
    'In Progress': Task[];
    'Done': Task[];
}
