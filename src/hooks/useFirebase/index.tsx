import { useContext } from "react";
import { FirebaseContext } from "../../providers/firebaseProvider";

export const useFirebase = () => {
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return firebaseContext;
};
