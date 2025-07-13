import { InsertSubject, SelectSubject } from "../../../db/subjects";
import type { Subject } from "../types/subject";

export interface subjectRepositoryInterface {
  save: (subject: InsertSubject) => Promise<SelectSubject>;
  findMany: () => Promise<Subject[]>;
}
