import Head from "next/head";
import type { NextPage } from "next";
import { env } from "@/env";

const description = `${env.APP_WITH_DOMAIN} is improved pastebin with security of protectedtext, you can create and share paste to earn side income from ${env.APP}`;

const Meta: NextPage<any> = () => {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta charSet="utf-8" />
				<meta
					name="title"
					content={`${env.APP_WITH_DOMAIN} - Share pastes and earn `}
				/>
				<meta name="description" content={description} />
				<meta
					name="keywords"
					content={`${env.APP_WITH_DOMAIN}, ${env.APP}, pastebin, shortener, file-sharing, protectedtext.com`}
				/>
				<meta name="robots" content="index, follow" />
				<meta
					httpEquiv="Content-Type"
					content="text/html; charset=utf-8"
				/>
				<meta name="language" content="English" />
				<meta name="revisit-after" content="1 days" />

				<link rel="icon" href="/favicon.ico" />
				<title>{env.APP_WITH_DOMAIN} - Text Sharing </title>
			</Head>
		</>
	);
};

export default Meta;
