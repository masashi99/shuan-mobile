import { SubjectRepository } from "../repositories";
import { getDatabase } from "@/db/db";
import { useQuery } from "@tanstack/react-query";

const db = getDatabase();

export const useGetSubjects = () => {
  const subjectRepository = new SubjectRepository(db);

  const query = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      try {
        const response = await subjectRepository.findMany();
        return response;
      } catch (error) {
        throw new Error("Failed to fetch subjects");
      }
    }
  });

  return query;
};
