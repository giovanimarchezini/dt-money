import { HeaderContatiner, HeaderContent, NewTransactionButton } from "./styles";
import Logo from '../../assets/logo.svg'
import * as  Dialog  from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
  return(
  <HeaderContatiner>
    <HeaderContent>
      <img src={Logo} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <NewTransactionButton>Nova Transação</NewTransactionButton>
        </Dialog.Trigger>
        <NewTransactionModal/>
      </Dialog.Root>
    </HeaderContent>
  </HeaderContatiner>
  )
}