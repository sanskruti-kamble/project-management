import { useEffect, useState } from "react";
import AccountList from "../components/accounts/AccountList";
import AddManagerOrDeveloper from "../components/accounts/AddManagerOrDeveloper";
import { generateId } from "../utility/HelperFunction";

export default function Account() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const oldAccounts = getAccountsFromLocalStorage();
    setAccounts(oldAccounts);
  }, []);

  function getAccountsFromLocalStorage() {
    const oldAccounts = JSON.parse(localStorage.getItem("accounts"));
    return oldAccounts ?? [];
  }

 async function addManagerOrDeveloper(
    event,
    name,
    email,
    isManagerOrDeveloper,
    password
  ) {
    event.preventDefault();

    const newAccount = {
      id:generateId(),
      name: name,
      email: email,
      designation: isManagerOrDeveloper,
      password: password,
      createdAt: new Date(),
    };
    console.log(newAccount);

    const oldAccounts = getAccountsFromLocalStorage();

    const newAccounts = [...oldAccounts, newAccount];
    await localStorage.setItem("accounts", JSON.stringify(newAccounts));
    setAccounts(newAccounts);
  }

  return (
    <>
      <section className="">
        <div className="p-4 rounded shadow">
          <AddManagerOrDeveloper addUser={addManagerOrDeveloper} />
        </div>
        <div className="mt-4 p-4 rounded shadow">
          <AccountList data={accounts} />
        </div>
      </section>
    </>
  );
}
