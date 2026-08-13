import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!currentUser) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        console.log("Logged in UID:", currentUser.uid);

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.log("User document not found");
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const userData = userSnap.data();

        console.log("Firestore user:", userData);
        console.log("Role:", userData.role);

        setIsAdmin(userData.role === "admin");
      } catch (error) {
        console.error("Admin Check Error:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" />
        <h4 className="mt-3">
          Checking Admin Access...
        </h4>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default AdminRoute;