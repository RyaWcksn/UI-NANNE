import axios from "axios";

const InitConfig = () => {
	const basePath = import.meta.env.VITE_BASE_PATH;
	axios.defaults.baseURL = basePath;
}

export default InitConfig;
