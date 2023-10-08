export * from './classes.service';
import { ClassesService } from './classes.service';
export * from './students.service';
import { StudentsService } from './students.service';
export * from './values.service';
import { ValuesService } from './values.service';
export const APIS = [ClassesService, StudentsService, ValuesService];
