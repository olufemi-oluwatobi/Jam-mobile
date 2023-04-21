import React, { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "../notificationProvider";
import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { useAuth } from "../../hooks/useAuth";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import "firebase/auth";

type ListenerActions = {
  title: string;
  callback: (data: any) => void;
};

type FirebaseContextType = {
  app: FirebaseApp;
  registerAction: (d: ListenerActions) => void;
};

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

type FirebaseProviderProps = {
  firebaseConfig: Object;
  children: React.ReactNode;
};

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  firebaseConfig,
  children,
}) => {
  const [app, setApp] = useState<FirebaseApp>();
  const { user } = useAuth();
  const { pushToken } = useNotification();
  const [listenerActions, setListenerActions] = useState<
    ListenerActions[] | []
  >([]);

  const registerAction = (listenerAction: ListenerActions) => {
    if (!app) return;
    setListenerActions((listenerActions) => [
      ...listenerActions,
      listenerAction,
    ]);
    console.log("Action Saved");
  };

  useEffect(() => {
    const apps = getApps();
    const app = initializeApp(firebaseConfig);
    setApp(app);
    // console.log("apps", apps);
    // if (!apps.length && process.env.NODE_ENV !== "development") {
    //   console.log("pushToken", pushToken);

    // }
  }, [firebaseConfig]);

  useEffect(() => {
    if (!app) return;
    if (user) {
      listenForAction(`/users/${user.id}/action`);
    }
  }, [user, app]);

  const listenForAction = (
    path: string
    // eventType: string,
    // callback: (data: any) => void
  ) => {
    try {
      if (!app) return;

      const databaseRef = ref(getDatabase(app), path);
      // get(ref(getDatabase(app), path)).then((snapshot) => {
      //   console.log("snapshot", snapshot);
      // });

      // Listen for changes in the data
      onValue(databaseRef, (snapshot) => {
        if (!snapshot) return;
        try {
          const val = snapshot.val();
          if (!val) console.log("not function");

          const parsedValue = JSON.parse(val);
          const actionIndex = listenerActions.findIndex((action) =>
            parsedValue.title.includes(action?.title)
          );
          const action = listenerActions[actionIndex];
          if (action) {
            console.log("in action if");
            action.callback(parsedValue);
            setListenerActions((acc) => {
              acc.splice(actionIndex, 1);
              return [...acc];
            });
          }
        } catch (error) {
          console.log("in here", error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const firebaseContextValue = app
    ? { app, listenForAction, registerAction }
    : null;

  return (
    <FirebaseContext.Provider value={firebaseContextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
