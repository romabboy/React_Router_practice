import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  throw new Error('oh dang! ')
  await deleteContact(params.contactId);
  debugger
  return redirect("/");
}