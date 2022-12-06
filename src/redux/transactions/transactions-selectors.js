export const selectTransactions = state => state.transactions.transactions;
export const selectCategories = state => state.transactions.categories;
export const selectError = state => state.transactions.error;
export const selectModalStatus = state =>
  state.transactions.isTransactionModalOpen;
