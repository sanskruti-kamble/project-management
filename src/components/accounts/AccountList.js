import AccountBox from "./AccountBox";

export default function AccountList(props) {
  return (
    <>
      <section className="p-2">
        <h3 className="mb-3 fw-bold">Account List</h3>
        <div className="my-grid-4">
          {props.data?.map((account) => (
            <AccountBox key={"a" + account.id} data={account} />
          ))}
        </div>
        {props.data?.length===0 && <p className="mb-0 fst-italic">No data in account list!!</p>}
      </section>
    </>
  );
}
