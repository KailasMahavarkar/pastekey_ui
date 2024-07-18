import payout from "@/components/data/payout";

const PayoutRatePage = () => {
	return (
		<>
			<h1>
				{`Publisher Rates Please note that we may also offer Fixed CPM
				offer's only for YouTuber's and Content Download Sites from $6
				to $10 Depending upon Traffic Quality. (t&c Apply)`}
			</h1>
			<p>
				If you are in matching this requirement please contact our
				support team as soon as possible.
			</p>
			<div className="overflow-x-auto shadow">
				<table className="table w-full">
					<thead>
						<tr>
							<th />
							<th>Country</th>
							<th>Payout rate</th>
						</tr>
					</thead>
					<tbody>
						{payout.map((item, index) => {
							return (
								<tr key={index}>
									<th>{index + 1}</th>
									<td>{item.country}</td>
									<td>${item.rate}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default PayoutRatePage;
