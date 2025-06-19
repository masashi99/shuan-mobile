import { createContext } from "react";

type RepositoryContextType = {
  repository: any;
};

const RepositoryContext = createContext<RepositoryContextType>({ repository: null });

type Props = {
  children: React.ReactNode;
};

export function RepositoryProvider({ children }: Props) {
  return <RepositoryContext.Provider value={{ repository: null }}>{children}</RepositoryContext.Provider>;
}
