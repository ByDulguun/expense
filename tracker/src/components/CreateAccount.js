const CreateAccount = () => {
  const [accounts, setAccounts] = useState([]);

  const newAccount = {
    title,
  };
  const createAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/accounts",
        newAccount
      );
      setAccounts([...accounts, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts");

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
