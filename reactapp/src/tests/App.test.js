import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Bank from "../bank/Bank";

describe("Bank", () => {
  it("renders_without_crashing", () => {
    render(<Bank />);
  });
  it("displays_initial_account_balance_as_0.00", () => {
    const { getByText } = render(<Bank />);
    
    // Check if the initial account balance is $0.00
    const accountBalance = getByText("Account Balance: $0.00");
    expect(accountBalance).toBeInTheDocument();
  });
  describe("Banking_Transaction_Tracker", () => {
    it("renders_the_initial_ui", () => {
      const { getByText, getByLabelText } = render(<Bank />);
  
      // Check for the presence of initial UI elements
      const titleElement = getByText("Banking Transaction Tracker");
      const transactionTypeLabel = getByLabelText("Transaction Type:");
      const amountLabel = getByLabelText("Amount:");
      const descriptionLabel = getByLabelText("Description:");
      const addButton = getByText("Add Transaction");
      const historyTitle = getByText("Transaction History");
      const summaryTitle = getByText("Account Summary");
  
      expect(titleElement).toBeInTheDocument();
      expect(transactionTypeLabel).toBeInTheDocument();
      expect(amountLabel).toBeInTheDocument();
      expect(descriptionLabel).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
      expect(historyTitle).toBeInTheDocument();
      expect(summaryTitle).toBeInTheDocument();
    });
    
    
    describe("Deposit_Transactions", () => {
      it("adds_a_deposit_transaction_with_all_non_empty_fields", () => {
        const { getByText, getByLabelText } = render(<Bank />);
        
        // Select Deposit from the transaction type dropdown
        const transactionTypeSelect = getByLabelText("Transaction Type:");
        fireEvent.change(transactionTypeSelect, { target: { value: "Deposit" } });
    
        // Fill in the amount and description fields
        const amountInput = getByLabelText("Amount:");
        fireEvent.change(amountInput, { target: { value: "100" } });
        const descriptionInput = getByLabelText("Description:");
        fireEvent.change(descriptionInput, { target: { value: "Deposit Test" } });
    
        // Click the Add Transaction button
        const addButton = getByText("Add Transaction");
        fireEvent.click(addButton);
    
        // Check if the deposit transaction is added to the history
        const transactionHistory = getByText("Deposit: $100.00");
        expect(transactionHistory).toBeInTheDocument();
    
        // Check if the account balance is updated
        const accountBalance = getByText("Account Balance: $100.00");
        expect(accountBalance).toBeInTheDocument();
      });
    
      it("does_not_add_a_deposit_transaction_if_the_amount_field_is_empty", () => {
        const { getByText, getByLabelText, queryByText } = render(<Bank />);
        
        // Select Deposit from the transaction type dropdown
        const transactionTypeSelect = getByLabelText("Transaction Type:");
        fireEvent.change(transactionTypeSelect, { target: { value: "Deposit" } });
    
        // Leave the amount field empty
        const descriptionInput = getByLabelText("Description:");
        fireEvent.change(descriptionInput, { target: { value: "Deposit Test" } });
    
        // Click the Add Transaction button
        const addButton = getByText("Add Transaction");
        fireEvent.click(addButton);
    
        // Check if the deposit transaction is not added to the history
        const transactionHistory = queryByText("Deposit: $");
        expect(transactionHistory).not.toBeInTheDocument();
    
        // Check if the account balance remains unchanged
        const accountBalance = getByText("Account Balance: $0.00");
        expect(accountBalance).toBeInTheDocument();
      });
    
      it("does_not_add_a_deposit_transaction_if_the_description_field_is_empty", () => {
        const { getByText, getByLabelText, queryByText } = render(<Bank />);
        
        // Select Deposit from the transaction type dropdown
        const transactionTypeSelect = getByLabelText("Transaction Type:");
        fireEvent.change(transactionTypeSelect, { target: { value: "Deposit" } });
    
        // Fill in the amount field
        const amountInput = getByLabelText("Amount:");
        fireEvent.change(amountInput, { target: { value: "100" } });
    
        // Leave the description field empty
        const addButton = getByText("Add Transaction");
        fireEvent.click(addButton);
    
        // Check if the deposit transaction is not added to the history
        const transactionHistory = queryByText("Deposit: $");
        expect(transactionHistory).not.toBeInTheDocument();
    
        // Check if the account balance remains unchanged
        const accountBalance = getByText("Account Balance: $0.00");
        expect(accountBalance).toBeInTheDocument();
      });
    });
    describe("Withdrawal_Transactions", () => {
      it("adds_a_withdrawal_transaction_with_all_non_empty_fields", () => {
        const { getByText, getByLabelText } = render(<Bank />);
        
        // Select Withdrawal from the transaction type dropdown
        const transactionTypeSelect = getByLabelText("Transaction Type:");
        fireEvent.change(transactionTypeSelect, { target: { value: "Withdrawal" } });
    
        // Fill in the amount and description fields
        const amountInput = getByLabelText("Amount:");
        fireEvent.change(amountInput, { target: { value: "50" } });
        const descriptionInput = getByLabelText("Description:");
        fireEvent.change(descriptionInput, { target: { value: "Withdrawal Test" } });
    
        // Click the Add Transaction button
        const addButton = getByText("Add Transaction");
        fireEvent.click(addButton);
    
        // Check if the withdrawal transaction is added to the history
        const transactionHistory = getByText("Withdrawal: $50.00");
        expect(transactionHistory).toBeInTheDocument();
    
        // Check if the account balance is updated
        const accountBalance = getByText("Account Balance: $-50.00");
        expect(accountBalance).toBeInTheDocument();
      });
    
      it("does_not_add_a_withdrawal_transaction_if_the_amount_field_is_empty", () => {
        const { getByText, getByLabelText, queryByText } = render(<Bank />);
        
        // Select Withdrawal from the transaction type dropdown
        const transactionTypeSelect = getByLabelText("Transaction Type:");
        fireEvent.change(transactionTypeSelect, { target: { value: "Withdrawal" } });
    
        // Leave the amount field empty
        const descriptionInput = getByLabelText("Description:");
        fireEvent.change(descriptionInput, { target: { value: "Withdrawal Test" } });
    
        // Click the Add Transaction button
        const addButton = getByText("Add Transaction");
        fireEvent.click(addButton);
    
        // Check if the withdrawal transaction is not added to the history
        const transactionHistory = queryByText("Withdrawal: $");
        expect(transactionHistory).not.toBeInTheDocument();
    
        // Check if the account balance remains unchanged
        const accountBalance = getByText("Account Balance: $0.00");
        expect(accountBalance).toBeInTheDocument();
      });
    
      it("does_not_add_a_withdrawal_transaction_if_the_description_field_is_empty", () => {
        const { getByText, getByLabelText, queryByText } = render(<Bank />);
        
        // Select Withdrawal from the transaction type dropdown
        const transactionTypeSelect = getByLabelText("Transaction Type:");
        fireEvent.change(transactionTypeSelect, { target: { value: "Withdrawal" } });
    
        // Fill in the amount field
        const amountInput = getByLabelText("Amount:");
        fireEvent.change(amountInput, { target: { value: "50" } });
    
        // Leave the description field empty
        const addButton = getByText("Add Transaction");
        fireEvent.click(addButton);
    
        // Check if the withdrawal transaction is not added to the history
        const transactionHistory = queryByText("Withdrawal: $");
        expect(transactionHistory).not.toBeInTheDocument();
    
        // Check if the account balance remains unchanged
        const accountBalance = getByText("Account Balance: $0.00");
        expect(accountBalance).toBeInTheDocument();
      });
    });
        
     });
  it("updates_account_balance_correctly_after_multiple_transactions", () => {
    const { getByText, getByLabelText } = render(<Bank />);
    
    // Add a deposit transaction
    const transactionTypeSelect = getByLabelText("Transaction Type:");
    fireEvent.change(transactionTypeSelect, { target: { value: "Deposit" } });
    const amountInput = getByLabelText("Amount:");
    fireEvent.change(amountInput, { target: { value: "100" } });
    const descriptionInput = getByLabelText("Description:");
    fireEvent.change(descriptionInput, { target: { value: "Deposit Test" } });
    const addButton = getByText("Add Transaction");
    fireEvent.click(addButton);
  
    // Add a withdrawal transaction
    fireEvent.change(transactionTypeSelect, { target: { value: "Withdrawal" } });
    fireEvent.change(amountInput, { target: { value: "50" } });
    fireEvent.change(descriptionInput, { target: { value: "Withdrawal Test" } });
    fireEvent.click(addButton);
  
    // Check if the account balance is updated correctly
    const accountBalance = getByText("Account Balance: $50.00");
    expect(accountBalance).toBeInTheDocument();
  });
});
