import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSession";
import Content from "./content";

export default function Logout() {
  return <Content />;
}
