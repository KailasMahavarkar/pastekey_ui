import { useState } from "react";
import { copyHandlerRaw } from "@/helper";
import customToast from "@/toast";
import CodeMirrorAPI from "@/components/CodeMirror";

const ToolInfo = () => {
	const sampleJSON = {
		name: "zeno",
		hometown: "Mumbai, IN",
		gender: "male",
	};

	return (
		<div className=" ml-5 max-w-screen-lg">
			<h1 className="text-3xl font-bold">JSON validator</h1>

			<p className="mt-4">
				JSON (JavaScript Object Notation) is an open standard file
				format and data interchange format that uses human-readable text
				to store and transmit data objects consisting of attribute–value
				pairs and arrays (or other serializable values). It is a common
				data format with diverse uses in electronic data interchange,
				including that of web applications with servers.
			</p>

			<p className="mt-4">
				Storing JSON Data As a simple example, information about me
				might be written in JSON as follows:
				<pre>const sample = {JSON.stringify(sampleJSON, null, 2)}</pre>
				This creates an object that we access using the variable jason.
				By enclosing the variable’s value in curly braces, we’re
				indicating that the value is an object. Inside the object,
				<span className="text-green-500 font-bold ">
					{`we can declare any number of properties using a "name":
                        "value" pairing, separated by commas.`}
				</span>
				To access the information stored in json, we can simply refer to
				the name of the property we need. For instance, to access
				information about me, we could use the following snippets:
			</p>

			<pre>console.log(sample.name)</pre>

			<p className="mt-4">
				This tool uses the{" "}
				<a
					href="https://www.npmjs.com/package/jsonlint-mod"
					target="_blank"
					rel="noreferrer"
					className="text-blue-600"
				>
					jsonlint-mod
				</a>{" "}
				package, which internally uses JSV to validate JSON.
			</p>
		</div>
	);
};

const JSONValidate = () => {
	const [text, setText] = useState("");
	const [isJSON, setJSONResult] = useState<"valid" | "invalid" | "maybe">(
		"maybe"
	);
	const [error, setError] = useState("");

	const resolveBorderCSS = () => {
		if (isJSON === "valid") {
			return "border-green-500";
		} else if (isJSON === "invalid") {
			return "border-red-500";
		} else {
			return "border-gray-500";
		}
	};

	return (
		<>
			<div className="flex flex-col md:flex-row md:m-2 child:mt-2 md:child:m-2 ">
				{/* NON-ENCRYPTED ZONE */}
				<div className="flex w-full flex-col ">
					<div className="flex child:mr-2 w-full ">
						<button
							className="btn btn-primary btn-sm rounded-b-none"
							onClick={() => {
								copyHandlerRaw("");
								customToast({
									message: "Copied to clipboard",
									icon: "success",
								});
							}}
						>
							copy
						</button>
						{isJSON !== "maybe" && (
							<button
								className={`btn btn-sm rounded-b-none ${
									isJSON === "valid"
										? "btn-success"
										: "btn-error"
								}`}
							>
								{isJSON} JSON
							</button>
						)}
					</div>

					<div
						className={`border-4 border-solid ${resolveBorderCSS()}`}
					>
						<CodeMirrorAPI
							data={text}
							textChangeHandler={(value) => {
								setText(value);
							}}
							readOnly={false}
						/>
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex child:m-2">
						<button
							className="btn btn-outline mt-2"
							onClick={async () => {
								const jsonLinter = await require("jsonlint-mod");
								try {
									jsonLinter.parse(text);
									setJSONResult("valid");
									setError("");
								} catch (error: any) {
									setJSONResult("invalid");
									setError(error.message);
								}
							}}
						>
							Validate
						</button>
						<button
							className="btn btn-outline mt-2"
							onClick={() => {
								setText("");
								setJSONResult("maybe");
								setError("");
							}}
						>
							Clear
						</button>
					</div>
				</div>
			</div>

			<div className="divider"></div>
			<ToolInfo />

			<div className="divider"></div>
		</>
	);
};

export default JSONValidate;
