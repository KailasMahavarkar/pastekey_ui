import CryptoES from "crypto-es";

export const encryptAES = (obj: any, key: string) => {
	try {
		return CryptoES.AES.encrypt(JSON.stringify(obj), key).toString();
	} catch (error) {
		return "Encryption Error";
	}
};

export const decryptAES = (encrypted: string, key: string) => {
	try {
		const decrypted = CryptoES.AES.decrypt(encrypted, key);
		return JSON.parse(decrypted.toString(CryptoES.enc.Utf8));
	} catch (error) {
		return -1;
	}
};
