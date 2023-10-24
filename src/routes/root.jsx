import { Link, NavLink, Outlet, useLoaderData, Form, redirect, useNavigation, useNavigate, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect, useState } from "react";

// export async function loader({params}){
//   const contacts = await getContacts()
//   return {contacts};
// }



export async function actoin({request,params}){
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`);

}
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  return { contacts, q };
}



export default function Root() {
  const { contacts, q } = useLoaderData();
  const [query, setQuery] = useState(q);
  const navigate = useNavigation();
  const submit = useSubmit()

  useEffect(() => {
    setQuery(q);
  }, [q]);

  const searching =
    navigate.location &&
    new URLSearchParams(navigate.location.search).has(
      "q"
    );

    return(
        <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              value={query}
              className={searching ? "loading" : ""}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }} />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`/contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`/contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" 
          className={
            navigate.state === 'loading' ? 'loading' : ''
          }>
        <Outlet/>
      </div>
    </>
    )
}

