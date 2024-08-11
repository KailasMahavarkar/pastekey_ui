import { useState, SyntheticEvent } from "react";
import crypto from "crypto-es";

import { copyHandlerRaw } from "@/helper";
import customToast from "@/toast";
import Button from "@/components/Button";
const ToolInfo = () => {
	return (
		<div className=" ml-5 max-w-screen-lg">
			<h1 className="text-3xl font-bold">AES ECB</h1>

			<p className="mt-4">
				AES ECB is a block cipher encryption algorithm. It is a
				symmetric encryption algorithm, which means that the same key is
				used to encrypt and decrypt the data. The key can be 128, 192,
				or 256 bits long.
			</p>

			<p className="mt-4">
				One of the best implementation we recommended using is{" "}
				<a
					href="https://www.aescrypt.com/"
					target="_blank"
					rel="noreferrer"
					className="text-blue-600"
				>
					AESCrypt
				</a>{" "}
				which is a free, open-source, cross-platform utility for
				supporting encryption and decryption of files using the Advanced
				Encryption Standard (AES) algorithm.
			</p>

			<p className="mt-4">
				This tool uses the{" "}
				<a
					href="https://www.npmjs.com/package/crypto-es"
					target="_blank"
					rel="noreferrer"
					className="text-blue-600"
				>
					crypto-es
				</a>{" "}
				package.
			</p>

			<p>
				Learn More about AES ECB{" "}
				<a
					href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
					target="_blank"
					rel="noreferrer"
					className="text-blue-600"
				>
					here
				</a>
			</p>
		</div>
	);
};

const AesECB = () => {
	const [text, setText] = useState("");
	const [encyptedText, setEncryptedText] = useState("");
	const [size, setSize] = useState(0);
	const [encryptedSize, setEncryptedSize] = useState(0);

	const [options, setOptions] = useState({
		mode: "aes-256",
		type: "ecb",
		iv: "",
		secretKey: "",
	});

	const encryptAES = (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		setText(value);
		const encRes = crypto.AES.encrypt(value, options.secretKey, {
			mode: options.type === "ecb" ? crypto.mode.ECB : crypto.mode.CBC,
			padding: crypto.pad.Pkcs7, 
		}).toString();

		setEncryptedText(encRes);
		const encyptedSizeInKB = encRes.length / 1024;
		setEncryptedSize(Number(encyptedSizeInKB.toFixed(4)));

		const sizeInKB = value.length / 1024;
		setSize(Number(sizeInKB.toFixed(4)));
	};

	return (
		<>
			<div className="flex flex-col md:flex-row md:m-2 child:mt-2 md:child:m-2 ">
				{/* NON-ENCRYPTED ZONE */}
				<div className="flex w-full flex-col ">
					<div className="flex justify-between w-full ">
						<Button
							className="btn btn-primary btn-sm rounded-b-none"
							onClick={() => {
								copyHandlerRaw(encyptedText);
								customToast({
									message: "Copied to clipboard",
									icon: "success",
								});
							}}
                            accessibleName="copy"
						>
							{size} kb
						</Button>
						<Button
							className="btn btn-primary btn-sm rounded-b-none"
							onClick={() => {
								copyHandlerRaw(encyptedText);
								customToast({
									message: "Copied to clipboard",
									icon: "success",
								});
							}}
                            accessibleName="copy"
						>
							copy
						</Button>
					</div>
					<textarea
						onChange={encryptAES}
						value={text}
						placeholder="Enter text here"
					/>
				</div>

				{/* ENCRYPTED ZONE */}
				<div className="flex w-full flex-col ">
					<div className="flex justify-between w-full ">
						<Button
							className="btn btn-primary btn-sm rounded-b-none"
							onClick={() => {
								copyHandlerRaw(encyptedText);
								customToast({
									message: "Copied to clipboard",
									icon: "success",
								});
							}}
                            accessibleName="copy"
						>
							{size !== 0 ? `${encryptedSize} kb` : "0 kb"}
						</Button>
						<Button
							className="btn btn-primary btn-sm rounded-b-none"
							onClick={() => {
								copyHandlerRaw(encyptedText);
								customToast({
									message: "Copied to clipboard",
									icon: "success",
								});
							}}
                            accessibleName="copy"
						>
							copy
						</Button>
					</div>
					<textarea
						value={size !== 0 ? encyptedText : "View Results"}
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row md:m-2 child:mt-2 md:child:m-2">
				{/* CONTROL ZONE */}
				<div className="flex flex-col md:flex-row child:m-2 w-full">
					<div className="flex flex-col child:m-2">
						<div className="form-control">
							<div className="label">
								<span className="label-text">
									Enter Passphrase
								</span>
							</div>
							<input
								onChange={(e) => {
									setOptions({
										...options,
										secretKey: e.target.value,
									});
									encryptAES(e);
								}}
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div className="form-control">
							<div className="label">
								<span className="label-text">
									Select Encryption Mode
								</span>
							</div>
							<select
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									setOptions({
										...options,
										mode: e.target.value,
									});
								}}
							>
								<option value="AES-128">AES-128</option>
								<option value="AES-192">AES-192</option>
								<option value="AES-256">
									AES-256 (Recommended)
								</option>
							</select>
						</div>
					</div>

					<div className="flex flex-col child:m-2">
						<div className="form-control">
							<div className="label">
								<span className="label-text">
									Enter IV (optional)
								</span>
							</div>
							<input
								type="text"
								onChange={(e) => {
									setOptions({
										...options,
										secretKey: e.target.value,
									});
									encryptAES(e);
								}}
								placeholder="Enter Initialization Vector"
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div className="form-control">
							<div className="label">
								<span className="label-text">
									Ecrypt / Decrypt
								</span>
							</div>
							<select
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									setOptions({
										...options,
										mode: e.target.value,
									});
								}}
							>
								<option value="encrypt">encrypt</option>
								<option value="decrypt">decrypt</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className="ml-5 md:ml-10 max-w-none">
				Note: This online client side AES encryption tool is a free
				service and it automatically updates results as you type.
			</div>

			<div className="divider"></div>

			<ToolInfo />

			<div className="divider"></div>
		</>
	);
};

export default AesECB;
