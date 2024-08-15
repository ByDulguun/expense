const CreateAccount = () => {
  const token = localStorage.getItem("token");
  const [accounts, setAccounts] = useState([]);

  const newAccount = {
    title,
  };
  const createAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/accounts",
        newAccount,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setAccounts([...accounts, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/accounts", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);
  return <div></div>;
};

export default CreateAccount;
