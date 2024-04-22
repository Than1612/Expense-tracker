import React from 'react';
import { useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';
import './TotalBudgetCard.css';

const TotalBudgetCard = () => {
  const { budgets, expenses } = useBudgets();

  return (
    <div className="total-budget-container">
      {budgets.map((budget) => {
        const amount = expenses.reduce((total, expense) => {
          if (expense.budgetId === budget.id) {
            return total + expense.amount;
          }
          return total;
        }, 0);

        if (budget.max === 0) return null;

        return (
          <div key={budget.id} className="budget-card-wrapper">
            <BudgetCard
              amount={amount}
              name={budget.name}
              gray
              max={budget.max}
              hideButtons
            />
          </div>
        );
      })}
    </div>
  );
};

export default TotalBudgetCard;
