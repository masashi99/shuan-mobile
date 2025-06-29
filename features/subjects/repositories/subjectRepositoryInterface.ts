import { InsertSubject, SelectSubject } from "../../../db/subjects";

export interface subjectRepositoryInterface {
  save: (subject: InsertSubject) => Promise<SelectSubject>;
}
