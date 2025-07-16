import { SubjectRepository } from "../repositories";
import { Subject } from "../types/subject";
import { getDatabase } from "@/db/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const db = getDatabase();

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, Subject>({
    mutationFn: async (subject) => {
      const subjectRepository = new SubjectRepository(db);
      await subjectRepository.create(subject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: () => {
      throw new Error("Failed to create subject");
    }
  });

  return mutation;
};
