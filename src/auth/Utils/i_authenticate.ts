import { User } from "src/modules/users/entities";

export interface IAuthenticate  {
    readonly user: User;
    readonly token: string;
}