import { Action, action, createStore } from "easy-peasy";
import { toast } from "react-toastify";

const auth = createStore({
  auth: {
    token: "",
    username: "",
    role: "",
  },
  login: action((state, payload) => {
    (state as any).auth = payload;
  }),
  logout: action((state, _) => {
    (state as any).auth = {token: "", username: "",}
    toast.success("Logout realizado com sucesso!")
  }),
});

export interface AuthAction {
  login: Action<{}, any>;
  logout: Action<{}, any>;
}

export default auth;