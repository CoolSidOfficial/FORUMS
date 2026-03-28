useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/authenticate/login");
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
        router.push("/authenticate/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);

    } catch (err) {
      router.push("/authenticate/login");
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, [router]);