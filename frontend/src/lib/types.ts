export interface ClassData {
    id: string;
    course: string;
    year: string;
    students: number;
    timeRange: string;
    name: string
    time: string
    color: string
    fullTime?: string
    shift?: string
    hoursLoad?: string
  }

  export interface Notification {
    id: number
    title: string
    message: string
    time: string
    read: boolean
    type: 'deadline' | 'meeting' | 'form' | 'reminder' | 'system'
}

 