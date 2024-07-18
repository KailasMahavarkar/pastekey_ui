import React, { useState } from "react";
import { handleNetworkError, useEffectAsync } from "@/helper";
import axios from "@/service/axios.service";

interface singleTransactionType {
	createAt: number;
	updatedAt: number;
	completedAt: number;
	_id: string;
	amount: number;
	mode: string;
	status: string;
	username: string;
	account: string;
	currency: string;
	info: string;
}

function TransactionPage() {
	const [transactions, setTransactions] = useState<singleTransactionType[]>();

	useEffectAsync(async () => {
		try {
			const result = await axios.get("user/withdraw/history");
			const transactions = result.data.data.transactions;
			setTransactions(transactions);
		} catch (error: any) {
			if (handleNetworkError(error)) return;
		}
	}, []);

	return (
		<div className="overflow-x-auto">
			{transactions ? (
				<table className="table table-compact w-full">
					<thead>
						<tr>
							<th>Index</th>
							<th>ID</th>
							<th>Account</th>
							<th>Amount</th>
							<th>Currency</th>
							<th>Mode</th>
							<th>Status</th>
							<th>Info</th>

							{/* timestamps */}
							<th>Created At</th>
							<th>Updated At</th>
							<th>Completed At</th>
						</tr>
					</thead>
					<tbody>
						{transactions?.map(
							(
								transaction: singleTransactionType,
								index: number
							) => {
								return (
									<>
										<>
											<tr>
												<th>{index}</th>
												<td>{transaction._id}</td>
												<td>{transaction.account}</td>
												<td>{transaction.amount}</td>
												<td>{transaction.currency}</td>
												<td>{transaction.mode}</td>
												<td>{transaction.status}</td>
												<td>{transaction.info}</td>

												{/* timestamps */}
												<td>{transaction.createAt}</td>
												<td>{transaction.updatedAt}</td>
												<td>
													{transaction.completedAt}
												</td>
											</tr>
										</>
									</>
								);
							}
						)}
					</tbody>
				</table>
			) : (
				// no transactions
				<div className="text-center">
					<h1 className="text-2xl font-bold">
						No transactions found
					</h1>
				</div>
			)}
		</div>
	);
}

export default TransactionPage;
