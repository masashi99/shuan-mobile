import type { Subject } from "../types/subject";

export interface subjectRepositoryInterface {
  findMany: () => Promise<Subject[]>;
}
