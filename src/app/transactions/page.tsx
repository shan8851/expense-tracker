import { Transactions } from "@/components/listTransactions";
import { db } from "@/lib/db";

export default async function TransactionsPage() {
  const res = await db.transaction.findMany();
  return (
    <Transactions transactions={res} />
  )
}
