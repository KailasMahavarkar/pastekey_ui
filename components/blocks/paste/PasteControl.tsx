import { NextPage } from "next";
import { useRouter } from "next/router";
import { copyHandlerRaw, useEffectAsync } from "@/helper";
import customToast from "@/toast";
import { currentPasteType, pasteDataType } from "@/types/index";

const PasteControl: NextPage<{
	current: currentPasteType;
	data: pasteDataType;
	tag: string;
}> = ({ current, data, tag }) => {
	const router = useRouter();

	useEffectAsync(() => {
		if (!router.isReady) return;
	}, [router.isReady]);

	return (
		<div className="flex justify-end  ">
			<div className="flex child:m-1 flex-wrap">
				<>
					<button className="btn btn-xs btn-primary">report</button>
					{current.privacy === "public" && (
						<>
							<button
								className="btn btn-xs btn-primary"
								onClick={() => {
									if (data.size > 0) {
										localStorage.setItem(
											"rawTab",
											data?.pasteMap[data?.active]
										);
										router.push(`/api/raw?tag=${tag}`);
									}
								}}
							>
								raw tab
							</button>
							<button
								className="btn btn-xs btn-primary"
								onClick={() => {
									if (data.size > 0) {
										localStorage.setItem(
											"rawPaste",
											JSON.stringify(data?.pasteMap)
										);
										router.push(`/raw/r/${tag}`);
									}
								}}
							>
								raw paste
							</button>
						</>
					)}

					<button
						className="btn btn-xs btn-primary"
						onClick={() => {
							copyHandlerRaw(data?.pasteMap[data?.active]);
							customToast({
								message: "paste tab copied to clipboard",
								icon: "success",
								timer: 1500,
							});
						}}
					>
						copy tab
					</button>
					<button
						className="btn btn-xs btn-primary"
						onClick={() => {
							copyHandlerRaw(JSON.stringify(data?.pasteMap));
							customToast({
								message: "paste copied to clipboard",
								icon: "success",
								timer: 1500,
							});
						}}
					>
						copy paste
					</button>
				</>
			</div>
		</div>
	);
};

export default PasteControl;
