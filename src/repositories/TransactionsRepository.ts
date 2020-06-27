import Transaction from '../models/Transaction';

type CreateTransactionDTO = Omit<Transaction, 'id'>;

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface AllDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllDTO {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {
    return this.transactions.reduce<Balance>(
      (sum, item) => {
        if (item.type === 'income') {
          sum.income += item.value;
        } else {
          sum.outcome += item.value;
        }
        sum.total = sum.income - sum.outcome;
        return sum;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
