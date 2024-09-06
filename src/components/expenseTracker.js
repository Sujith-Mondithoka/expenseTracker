import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Card from "./Card/Card.js";
import Modal from "./Modal/Modal.js";
import PieChart from "./Chart/PieChart.js";
import BarChart from "./Chart/BarChart.js";
import AddBalanceForm from "./Forms/AddBalanceForm/AddBalanceForm.js";
import ExpenseForm from "./Forms/ExpenseForm/ExpenseForm.js";
import TransactionList from "./TransactionList/TransactionList.js";

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  //Show hide Modals
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);

  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  useEffect(() => {
    const localBalance = localStorage.getItem("balance");
    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));

    setExpenseList(items || []);
    setIsMounted(true);
  },[]);
  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    }else{
      setExpense(0);
    }

    let foodSpends=0,entertainmentSpends=0,travelSpends=0;
    let foodCount=0,entertainmentCount=0,travelCount=0
    expenseList.forEach((item) => {
      if(item.category === "food"){
        foodSpends += Number(item.price);
        foodCount++;
      }else if (item.category === "entertainment"){
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      }else if(item.category === "travel"){
        travelSpends += Number(item.price);
        travelCount++;
      }
    });
    setCategorySpends({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    })

    setCategoryCount({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    })
  },[expenseList]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <div>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.forms}>
        <Card
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={() => {
            setIsOpenBalance(true);
          }}
        />
        <Card
          title="Expenses"
          money={expense}
          buttonText="+ Add Expense"
          buttonType="failure"
          success={false}
          handleClick={() => {
            setIsOpenExpense(true);
          }}
          />
        <PieChart data={[

          { name: "Food", value: categorySpends.food},
          { name: "Travel", value: categorySpends.travel},
          { name: "Entertainment", value: categorySpends.entertainment},
          
        ]}
        />
      </div>
        <div className={styles.transactionWrapper}>
          <TransactionList transactions={expenseList} editTransactions={setExpenseList} title="Recent Transactions" balance={balance} setBalance={setBalance}/>
          <BarChart data={[
          { name: "Entertainment", value: categorySpends.entertainment},
          { name: "Food", value:categorySpends.food},
          { name: "Travel", value: categorySpends.travel},
         ]}
         />
        </div>
        <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
          <ExpenseForm setIsOpen={setIsOpenExpense} expenseList={expenseList} setExpenseList={setExpenseList} setBalance={setBalance} balance={balance}/>
        </Modal>
        <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
          <AddBalanceForm setIsOpen={setIsOpenBalance} setBalance={setBalance} balance={balance}/>
        </Modal>
    </div>
  );
};
export default ExpenseTracker;
