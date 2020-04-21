export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}
//When we want to define the structure of an object
//And we want strong typing against the object then
//Interface is the way to go
