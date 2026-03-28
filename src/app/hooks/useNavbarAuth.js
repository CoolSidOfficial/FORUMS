useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const res = await fetch(
        "https://forums-backend-production-b81e.up.railway.app/auth/verify",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);

    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);