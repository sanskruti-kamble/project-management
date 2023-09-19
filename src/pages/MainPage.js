import { useEffect, useState } from "react";


export default function MainPage() {
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    setLoginAccountData();
  }, []);

  function setLoginAccountData() {
    const loginData = JSON.parse(localStorage.getItem("loggedAccount"));
    setAccountData(loginData ?? {});
  }
  return (
    <>
      <section className="">
        <div className="p-4 rounded shadow">hi {accountData?.name}</div>
      </section>
    </>
  );
}
