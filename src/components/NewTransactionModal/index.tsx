import * as  Dialog  from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./style";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from 'use-context-selector';
const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})


type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal(){
  const createdTransaction = useContextSelector(TransactionsContext, (context) =>{
      return context.createdTransaction;
  });
  const { 
          control,
          register, 
          handleSubmit,
          formState:{isSubmitting},
          reset,
        } = useForm<NewTransactionsFormInputs>({
            resolver: zodResolver(newTransactionFormSchema),
            defaultValues:{
              type: 'income'
            }
          })

    async function handleCreateNewTransaction(data: NewTransactionsFormInputs){
      const {description, category, price, type } = data;
        await createdTransaction({
          description,
          category,
          price,
          type,
        })
       
        reset();
    }      
    return(
      <Dialog.Portal>
          <Overlay/>
          <Content>
          <CloseButton><X size={24} /></CloseButton>
            <Dialog.Title>Nova transação</Dialog.Title>
            <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
              <input 
                type="text" 
                placeholder="Descrição" 
                required
                {...register('description')}
              />
              <input 
                type="Number" 
                placeholder="Preço" 
                required
                {...register('price', {valueAsNumber: true})}
              />
              <input 
                type="text" 
                placeholder="Categoria" 
                required
                {...register('category')}
              />
              
              <Controller
                control={control}
                name="type"
                render={({field}) => {
                  return(
                    <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp/>
                      Entrada
                    </TransactionTypeButton>
    
                    <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown/>
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                  )
                }}
              />

              <button type="submit" disabled={isSubmitting}>
                Cadastrar
              </button>
            </form>
          </Content>
        </Dialog.Portal>
    )
}