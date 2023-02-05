import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase";

interface IAuth {
  user: User | null;
  userData: DocumentData | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changeUserPlan: (newPlan: string) => Promise<void>;
  addUserMovie: (id: string, media: string, action: string) => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  userData: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  changeUserPlan: async () => {},
  addUserMovie: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const unblockPage = ["id-en", "signup"];

export const AuthPorvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Logged in...
          await getUserData(user)
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          if (unblockPage.some((str) => router.pathname.includes(str))) {
            setUser(null);
            setLoading(true);
          } else {
            setUser(null);
            setLoading(true);
            router.push("/id-en");
          }
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const getUserData = async (user: User) => {
    await getDoc(doc(db, "user-data", user.uid))
      .then((data) => {
        setUserData(data.data()!);
        if (data.data()!.subscription === null) {
          router.push("/signup/planform");
        }
      })
      .catch((error) => alert(error.message));
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));

    await setDoc(doc(db, "user-data", auth.currentUser!.uid), {
      email: email,
      personalShows: [],
      subscription: null,
    });

    router.push("/signup");
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const changeUserPlan = async (newPlan: string) => {
    await updateDoc(doc(db, "user-data", auth.currentUser!.uid), {
      subscription: newPlan,
    });
  };

  const addUserMovie = async (id: string, media: string, action: string) => {
    if (action === "add") {
      await updateDoc(doc(db, "user-data", auth.currentUser!.uid), {
        personalShows: arrayUnion({id, media}),
      }).catch((error) => {
        return error;
      });
    } else if (action === "remove") {
      await updateDoc(doc(db, "user-data", auth.currentUser!.uid), {
        personalShows: arrayRemove({id, media}),
      }).catch((error) => {
        return error;
      });
    }
    await getUserData(user!)
  };

  const memoedValue = useMemo(
    () => ({
      user,
      userData,
      signUp,
      signIn,
      error,
      loading,
      logout,
      changeUserPlan,
      addUserMovie,
    }),
    [user, loading, error, userData]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
